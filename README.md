# Dynamic Event Calendar Application

## *Overview*
This is a React.js application designed to create a dynamic event calendar. It allows users to view a calendar grid, add, edit, and delete events, and persist event data locally. The app is built using the *Vite* framework and styled with *shadcn* components.

---

## *Features*

### *1. Calendar View*
- Displays a calendar grid for the current month.
- Allows navigation between months using "Previous" and "Next" buttons.

### *2. Event Management*
- Users can:
  - Add events by clicking on a specific day.
  - Edit or delete events for a selected day.
  - Include event details such as:
    - *Event Name*
    - *Start Time* and *End Time*
    - Optional *Description*.

### *3. Event List*
- Shows a detailed list of all events for a selected day in a modal or side panel.

### *4. Data Persistence*
- Utilizes *localStorage* to retain event data between page refreshes.

### *5. UI Requirements*
- Clean, modern design using *shadcn* components.
- Clear separation of weekdays and weekends in the calendar.
- Highlights:
  - The current day.
  - The selected day.

### *6. Complex Logic*
- Handles seamless month transitions.
- Prevents overlapping events by validating time slots.
- Allows filtering of events by keyword.

---

## *Technologies Used*
- *React.js* with functional components and hooks.

---

## *Getting Started*

### *Installation*
1. Clone the repository:
   ```bash
   git clone <repository-url>
