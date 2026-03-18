import { logMessage } from "./logger.js";

const PRIORITIES = {
    HIGH : {
        PRIORITY: "P1",
        COLOR: "#ff0000"
    },
    MEDIUM: {
        PRIORITY: "P2",
        COLOR: "#ff9100"
    },
    LOW: {
        PRIORITY: "P3",
        COLOR: "#fff700"
    },
}

class todoItem {
    //do something
    _title;
    _description;
    _duedate;
    _priority;
    _todoComplete;
    _todoID;



    constructor(title, description, due_date, priority, todo_status){
        this._title = title;
        this._description = description;
        this._duedate = due_date;
        this._priority = priority;
        this._todoComplete = todo_status;
        this._todoID = crypto.randomUUID();

        logMessage(`new to do item ${title} created!`);
    }

    get title() {
        return this._title;
    }

    get description() {
        return this._description;
    }

    get duedate() {
        return this._duedate;
    }

    set duedate(value) {
        this._duedate = value;
        logMessage(`ToDo item ${this._title} due date updated to ${value} `);
    }
    
    get priority() {
        return this._priority;
    }

    set priority(value) {
        this._priority = value;
        logMessage(`ToDo item ${this._title} updated to ${this._priority}`)
    }

    get todoID() {
        return this._todoID;
    }


    markAsComplete(){
        this._todoComplete = true;
        logMessage(`marking task ${this._title} as ${this._todoComplete}`);
    }

    markAsIncomplete(){
        this._todoComplete = false;
        logMessage(`marking task ${this._title} as ${this._todoComplete}`);
    }
}


export { PRIORITIES, todoItem };