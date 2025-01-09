/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./calendar.module.css";
import { useState } from "react";

const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Calendar({ date, setDate, tasks }) {
  const [active, setActive] = useState(date.getDate());
  const formatDate = (date, index) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = index;
    return `${day}${month}${year}`;
  };
  function handleDateChange(e) {
    const newDate = new Date(date);
    newDate.setDate(Number(e.target.textContent));
    setDate(newDate);

    setActive(newDate.getDate());
  }
  function display_dates() {
    let today = new Date(date);
    let month = today.getMonth();
    let year = today.getFullYear();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);

    const prevDate = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const firstDayWeekday = firstDay.getDay();
    const prevMonthDaysToShow = firstDayWeekday === 0 ? 6 : firstDayWeekday - 1;

    let daysArray = [];

    for (let i = prevDate - prevMonthDaysToShow; i <= prevDate; i++) {
      daysArray.push(
        <div
          className={`${styles.day} ${styles["next-date"]}`}
          key={"prev-" + i}
        >
          {i}
        </div>
      );
    }

    const presentDate = new Date();
    for (let i = 1; i <= lastDate; i++) {
      if (
        i === presentDate.getDate() &&
        month === presentDate.getMonth() &&
        year === presentDate.getFullYear()
      ) {
        daysArray.push(
          <div
            className={`${styles.day} ${styles.today} ${
              active == i ? styles.active : ""
            } ${tasks[formatDate(date, i)]?.length > 0 ? styles.event : null}`}
            key={i}
            value={i}
            onClick={(e) => handleDateChange(e)}
          >
            {i}
          </div>
        );
      } else {
        daysArray.push(
          <div
            className={`${styles.day} ${active == i ? styles.active : ""} ${
              tasks[formatDate(date, i)]?.length > 0 ? styles.event : null
            }`}
            key={i}
            value={i}
            onClick={(e) => handleDateChange(e)}
          >
            {i}
          </div>
        );
      }
    }
    const nextDays = 7 - ((firstDayWeekday + lastDate) % 7);

    for (let i = 1; i <= nextDays; i++) {
      daysArray.push(
        <div
          className={`${styles.day} ${styles["prev-date"]}`}
          key={"next-" + i}
        >
          {i}
        </div>
      );
    }

    return daysArray;
  }

  function moveNextMonth() {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);

    setDate(newDate);
  }

  function movePrevMonth() {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - 1);

    setDate(newDate);
  }

  function todayDate() {
    const today = new Date();
    setDate(today);
    setActive(today.getDate());
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.month}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          className={styles.prev}
          onClick={() => movePrevMonth()}
        />
        <div className={styles.date}>{`${
          monthName[date.getMonth()]
        } ${date.getFullYear()}`}</div>
        <FontAwesomeIcon
          icon={faArrowRight}
          className={styles.next}
          onClick={() => moveNextMonth()}
        />
      </div>
      <div className={styles.weekdays}>
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className={styles.days}>{display_dates()}</div>
      <div className={styles["goto-today"]}>
        <button onClick={() => todayDate()}>Today</button>
      </div>
    </div>
  );
}
