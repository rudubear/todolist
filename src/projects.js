import { todoItem } from "./todoItem.js";
import { PRIORITIES} from "./todoItem.js";
import { logMessage } from "./logger.js";

export class project {
    constructor(projectName) {
        this._projectName = projectName;
        this._projectID = crypto.randomUUID();
        this._todoList = [];
    }

    get projectName (){
        return this._projectName;
    }

    addToDoItem(todoitem){
        this._todoList.push(todoitem);
        logMessage(`Task ${todoitem.title} added to project`)
    }

    removeToDoItem(todoitemID){
        const itemToRemove = this._todoList.find(todoitem => todoitem.todoID == todoitemID);
        logMessage (`time to remove ${itemToRemove}`);
    }

    listToDoItems(){
        this._todoList.forEach( todo => {
            logMessage(todo);
        } )
    }
}
