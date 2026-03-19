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
        logMessage(`Task ${todoitem.getTitle()} added to project`)
    }

    removeToDoItem(todoitemID){
        const itemToRemove = this._todoList.findIndex(todoitem => 
            todoitem.getID() == todoitemID
        );
        logMessage (`time to remove ${itemToRemove} item, ${this._todoList[itemToRemove].getTitle()}`);

        this._todoList.splice(itemToRemove, 1);
    }

    listToDoItems(){
        this._todoList.forEach( todo => {
            todo.printTodoItem();
        } )
    }

    listToDoItemsBrief(){
        this._todoList.forEach( todo => {
            logMessage(todo.getMinimalView());
        })
    }

    listToDoItemsFull(){
        this._todoList.forEach( todo => {
            logMessage(todo.getMaximumView());
        })
    }

    flushToStorage(){
        logMessage("Writing to local storage");
        
        this._todoList.forEach( todo => {
            localStorage.setItem(todo.getID(), JSON.stringify(todo.getMaximumView()));
        })
    }

    retrieveFromStorage(){
        logMessage("Retrieving from local storage");
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            logMessage(JSON.parse(localStorage.getItem(key)));
        }
    }
}
