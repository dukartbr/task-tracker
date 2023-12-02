## Task Tracker

---

Simple React Task Tracker App using Vite, Chakra, and many other cool tools.

[Live Demo](https://reacttasktracker.com)

[Figma Designs](https://www.figma.com/file/oxen1fyXzt5rAciomHfg5K/Custom-Dashboard?type=design&node-id=0%3A1&mode=design&t=ikNPDA17SQajEloH-1)

**To Do - Features**

- [x] add [formik](https://formik.org/)
- [x] add local storage - [react-use](https://github.com/streamich/react-use/blob/master/docs/useLocalStorage.md)
- [x] add CRUD operations for Tasks to local storage - [tanstack query](https://tanstack.com/query/latest)
- [] add [react-datepicker](https://github.com/Hacker0x01/react-datepicker) for selecting due date
- [x] add [dnd-kit](https://github.com/clauderic/dnd-kit/tree/master)
- [] add notes section

**To Do - UI**

- [x] add mobile UI
- [] fix mobile UX
- [x] fix width handling for tasks with large titles
- [x] add ability to add comments
- [] add due date
- [x] improve D&D experience by showing the task being dragged over

**To Do - Minor Improvements && Refactors**

- [] add toasts
- [x] add form validation
- [] add `overdue` status

**To Do - Bugs**

- [] when dragging is done the task still flashes in the old column
- [x] when clicking a task in the column, and not dragging the form tries to submit
