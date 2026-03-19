import { createToDoItem, todoItem } from "./todoItem.js";
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

    get projectID (){
        return this._projectID;
    }

    addToDoItem(todoitem){
        todoitem.updateProjectID(this._projectID);
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

    clearAllItems(){
        this._todoList.length = 0;
        logMessage(`All items cleared ${this._todoList}`);
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
            let parsedToDoItem = JSON.parse(localStorage.getItem(key));
            if (parsedToDoItem.projectID == this._projectID){
                let todoItem = createToDoItem(
                    parsedToDoItem.title,
                    parsedToDoItem.description,
                    parsedToDoItem.duedate, 
                    parsedToDoItem.priority,
                    parsedToDoItem.isComplete,
                    parsedToDoItem.todoID,
                    parsedToDoItem.projectID 
                );
            this.addToDoItem(todoItem);
            }
        }
    }
}
