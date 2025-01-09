import { useState } from "react";
import styles from "./app.module.css";

import Calendar from "./components/calendar/calendar";
import Tasks from "./components/tasks/tasks";

export default function App() {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState({});
  return (
    <div className={styles.main}>
      <Calendar date={date} setDate={setDate} tasks={tasks} setTasks={setTasks} />
      <Tasks date={date} tasks={tasks} setTasks={setTasks}/>
    </div>
  );
}
