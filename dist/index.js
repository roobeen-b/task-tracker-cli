"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const figlet = require("figlet");
const { Command } = require("commander");
const path = require("path");
const program = new Command();
console.log(figlet.textSync("Task Tracker"));
program
    .description("A simple CLI to manage and track your tasks")
    .option("-a, add <task>", "Add new task")
    .option("-u, update <taskId task...>", "Update task")
    .option("-d, delete <taskId>", "Delete task")
    .option("-mip, mark_in_progress <taskId>", "Mark task as in progress")
    .option("-md, mark_done <taskId>", "Mark task as done")
    .option("-l, list [status]", "Lists all tasks (status: [done], [todo], [in-progress])")
    .parse(process.argv);
const options = program.opts();
const taskPath = path.join(__dirname, "../tasks.json");
const readAllTasks = () => {
    if ((0, fs_1.existsSync)(taskPath)) {
        const allTasks = (0, fs_1.readFileSync)(taskPath, "utf-8");
        if (allTasks) {
            return JSON.parse(allTasks);
        }
        return [];
    }
    return [];
};
const getNextId = (tasks) => {
    const allIds = tasks.map((task) => task.id);
    if (allIds.length) {
        return Math.max(...allIds) + 1;
    }
    else {
        return 1;
    }
};
const writeToFile = (tasks) => {
    (0, fs_1.writeFileSync)(taskPath, JSON.stringify(tasks, null, 2), "utf-8");
};
const listAllTasks = (options) => {
    try {
        const allTasks = readAllTasks();
        if (allTasks.length > 0) {
            if (typeof options === "boolean") {
                console.table(allTasks);
            }
            else if (options === "todo") {
                const todoTasks = allTasks.filter((task) => task.status === "todo");
                if (todoTasks.length > 0) {
                    console.table(todoTasks);
                }
                else {
                    console.log("No todo tasks available.");
                }
            }
            else if (options === "done") {
                const doneTasks = allTasks.filter((task) => task.status === "done");
                if (doneTasks.length > 0) {
                    console.table(doneTasks);
                }
                else {
                    console.log("No completed tasks available.");
                }
            }
            else if (options === "in-progress") {
                const inProgressTasks = allTasks.filter((task) => task.status === "in-progress");
                if (inProgressTasks.length > 0) {
                    console.table(inProgressTasks);
                }
                else {
                    console.log("No tasks currently in progress.");
                }
            }
        }
        else {
            console.log("No current tasks.");
        }
    }
    catch (error) {
        console.log(`Error while listing all tasks: ${error}`);
    }
};
const addNewTask = (taskDesc) => {
    const tasks = readAllTasks();
    const nextId = getNextId(tasks);
    const newT = {
        id: nextId,
        description: taskDesc,
        status: "todo",
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    tasks.push(newT);
    try {
        writeToFile(tasks);
        console.log("Task added successfully.");
    }
    catch (error) {
        console.log(`Error occured while adding new task: ${error}`);
    }
};
const updateTask = (taskId, updatedDesc) => {
    const tasks = readAllTasks();
    const singleTask = tasks.find((task) => task.id === Number(taskId));
    if (singleTask) {
        singleTask.description = updatedDesc;
        singleTask.updatedAt = new Date();
        writeToFile(tasks);
        console.log(`Task ${taskId} updated successfully.`);
    }
    else {
        console.log("Task not found.");
    }
};
const deleteTask = (taskId) => {
    const tasks = readAllTasks();
    const singleTask = tasks.find((task) => task.id === Number(taskId));
    if (singleTask) {
        const afterDeletionTasks = tasks.filter((task) => task.id !== Number(taskId));
        writeToFile(afterDeletionTasks);
        console.log(`Task ${taskId} deleted successfully.`);
    }
    else {
        console.log("Task not found.");
    }
};
const markInProgress = (taskId) => {
    try {
        const allTasks = readAllTasks();
        const requiredTask = allTasks.find((task) => task.id === Number(taskId));
        if (requiredTask) {
            requiredTask.status = "in-progress";
            writeToFile(allTasks);
            console.log(`Task ${requiredTask.id} marked in progress`);
        }
        else {
            console.log("Task not found.");
        }
    }
    catch (error) {
        console.log(`Error while marking in progress: ${error}`);
    }
};
const markDone = (taskId) => {
    try {
        const allTasks = readAllTasks();
        const requiredTask = allTasks.find((task) => task.id === Number(taskId));
        if (requiredTask) {
            requiredTask.status = "done";
            writeToFile(allTasks);
            console.log(`Task ${requiredTask.id} marked as done`);
        }
        else {
            console.log("Task not found.");
        }
    }
    catch (error) {
        console.log(`Error while marking done: ${error}`);
    }
};
if (options.add) {
    addNewTask(options.add);
}
if (options.update) {
    const taskId = Number(options.update[0]);
    const taskDesc = options.update[1];
    updateTask(taskId, taskDesc);
}
if (options.delete) {
    deleteTask(options.delete);
}
if (options.list) {
    listAllTasks(options.list);
}
if (options.mark_in_progress) {
    markInProgress(options.mark_in_progress);
}
if (options.mark_done) {
    markDone(options.mark_done);
}
//# sourceMappingURL=index.js.map