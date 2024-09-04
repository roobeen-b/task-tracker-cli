# Task Tracker

Task tracker is a project used to track and manage your tasks.

## How to run the application

Clone the repository from:

https://github.com/roobeen-b/task-tracker-cli

Then go to the project root directory.

At the root directory, open the terminal and run following commands:

 - To Add new task `-a <task>`
 
    E.g. `node dist/index.js -a "New Task"`
  
 - To Update task `-u <taskId task...>`
 
    E.g. `node dist/index.js -u 1 "Update test"`
  
 - To Delete task `-d <taskId>`
  
 - To Mark task as in progress `-mip <taskId>`
  
 -  To Mark task as done `-md <taskId>`
  
 - To Lists all tasks (status: [done], [todo], [in-progress]) `-l [status]`

   E.g. `node dist/index.js -l`

   E.g. `node dist/index.js -l done`

   E.g. `node dist/index.js -l todo`

   E.g. `node dist/index.js -l in-progress`
  
 -  To display help for command `-h,`
