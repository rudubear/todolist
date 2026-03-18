This is going to be an interactive todolist.

todo's are tasks taht we want to create
- title
- description
- due date
- priority (p0, p1, p2, p3)

categorize todo's into projects

have a default project visible

distinct logic for
- creating new todos
- setting a todo as complete
- updating a todo's priority

distinct module for dom stuff

view
- view all projects
- view all todo's in each project (brief info), color code priorities
- expand a single todo to see it's details
- delete a todo

useful modules
- date-fns
- localStorage

error handling
- make sure app doesn't crash if data is missing
- inspet data saved in localstorage using devtools
- local storage uses json format