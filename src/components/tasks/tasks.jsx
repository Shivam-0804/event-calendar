/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "./tasks.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCalendarXmark } from "@fortawesome/free-solid-svg-icons";

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

export default function Tasks({ date, tasks, setTasks }) {
  const [display, setDisplay] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const [category, setCategory] = useState("");
  const [errormsg, setErrormsg] = useState("");

  const [filterValue, setFilterValue] = useState("");

  function displayBox() {
    setDisplay(!display);
  }
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}${month}${year}`;
  };
  function addTask() {
    console.log(typeof startTime);
    if (!taskName || !startTime || !endTime || !category) {
      setErrormsg("Enter all the details!");
      setError(true);
      return;
    }
    const formattedDate = formatDate(date);
    const existingTasks = tasks[formattedDate] || [];

    const newTaskStart = parseInt(startTime.replace(":", ""), 10);
    const newTaskEnd = parseInt(endTime.replace(":", ""), 10);
    const isOverlap = existingTasks.some((task) => {
      const taskStart = parseInt(task.start.replace(":", ""), 10);
      const taskEnd = parseInt(task.end.replace(":", ""), 10);

      return (
        (newTaskStart < taskEnd && newTaskEnd > taskStart) ||
        (taskStart < newTaskEnd && taskEnd > newTaskStart)
      );
    });
    if (isOverlap) {
      setErrormsg("Time overlap with existing task");
      setError(true);
      return;
    }
    setError(false);
    const newTask = {
      name: taskName,
      start: startTime,
      end: endTime,
      description: description,
      category: category,
    };
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      if (updatedTasks[formattedDate]) {
        updatedTasks[formattedDate].push(newTask);
      } else {
        updatedTasks[formattedDate] = [newTask];
      }
      localStorage.setItem("taskData", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
    setTaskName("");
    setStartTime("");
    setEndTime("");
    setDescription("");
    setDisplay(false);
  }
  function removeTask(taskDate, taskIndex) {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[taskDate].splice(taskIndex, 1);
      if (updatedTasks[taskDate].length === 0) {
        delete updatedTasks[taskDate];
      }
      localStorage.setItem("taskData", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  }
  function capitalizeFirstLetter(str) {
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  useEffect(() => {
    const savedTasks = localStorage.getItem("taskData");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, [setTasks]);

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <span>
          <div className={styles.headerText}>Tasks</div>
          <div className={styles.selectedDate}>
            {`${date.getDate()} ${monthName[date.getMonth()]}`}
          </div>
        </span>
        <span>
          <div>
            <select
              id="dropdown"
              value={filterValue}
              className={styles.dropDown}
              onChange={(e) => setFilterValue(e.target.value)}
            >
              <option value="">Filter</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="other">Other</option>
            </select>
          </div>
        </span>
      </div>
      <div className={styles.events}>
        {tasks[formatDate(date)] ? (
          tasks[formatDate(date)].map(
            (task, index) =>
              (filterValue === "" || task.category === filterValue) && (
                <div
                  className={styles.event}
                  key={`${task.name}-${task.start}`}
                >
                  <div className={styles.title}>
                    <span>
                      <div className={styles.eventTitle}>
                        {capitalizeFirstLetter(task.name)}{" "}
                      </div>
                      <div>{task.category}</div>
                    </span>
                    <div className={styles.eventTime}>
                      {task.start} - {task.end}
                    </div>
                  </div>
                  <div className={styles.description}>
                    {task.description || "No description"}
                  </div>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className={styles.remove}
                    onClick={() => removeTask(formatDate(date), index)}
                  />
                </div>
              )
          )
        ) : (
          <div className={styles.noData}>
            <FontAwesomeIcon icon={faCalendarXmark} className={styles.icon} />
            <p>No Data</p>
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <FontAwesomeIcon
          icon={faPlus}
          className={`${styles.addTask} ${display ? styles.rotate : ""}`}
          onClick={() => displayBox()}
        />
        {display ? (
          <div className={styles.addTaskBox}>
            <div className={styles.input}>
              <h2>Add Task/Event</h2>
              <h5>{`${date.getDate()}-${
                monthName[date.getMonth()]
              }-${date.getFullYear()}`}</h5>
            </div>
            <input
              type="text"
              className={styles.taskName}
              placeholder="Task"
              onChange={(e) => {
                setTaskName(e.target.value);
              }}
            ></input>
            <div className={styles.time}>
              <label id="start">Start:</label>
              <input
                type="time"
                className={styles.taskStartTime}
                id="start"
                onChange={(e) => setStartTime(e.target.value)}
              ></input>
              <label id="end">End:</label>
              <input
                type="time"
                className={styles.taskEndTime}
                id="end"
                onChange={(e) => setEndTime(e.target.value)}
              ></input>
            </div>
            <div className={styles.categories}>
              <span>
                <input
                  type="radio"
                  name="a"
                  id="work"
                  value="Work"
                  onClick={() => setCategory("work")}
                />
                <label id="work">Work</label>
              </span>
              <span>
                <input
                  type="radio"
                  name="a"
                  id="personal"
                  value="Personal"
                  onClick={() => setCategory("personal")}
                />
                <label id="personal">Personal</label>
              </span>
              <span>
                <input
                  type="radio"
                  name="a"
                  id="other"
                  value="Other"
                  onClick={() => setCategory("other")}
                />
                <label id="other">Other</label>
              </span>
            </div>
            <input
              type="text"
              className={styles.taskDescription}
              placeholder="Description(optional)"
              onChange={(e) => setDescription(e.target.value)}
            ></input>
            {error ? <p className={styles.error}>{errormsg}</p> : null}
            <button
              onClick={() => {
                addTask();
              }}
            >
              Add
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
