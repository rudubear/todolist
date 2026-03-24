import { PRIORITIES, PROJECTPREFIX } from "./constants.js";
import { createToDoItem } from "./todoItem.js";
import { logMessage } from "./logger.js";
import { storage } from "./storage.js";

export class Project {
    constructor(projectName, projectID = undefined ) {
        this._projectName = projectName;
        this._todoList = [];
        if (projectID === undefined){
            this._projectID = PROJECTPREFIX + crypto.randomUUID();
        }
        else {
            this._projectID = projectID;
        }
    }

    get projectName (){
        return this._projectName;
    }

    get projectID (){
        return this._projectID;
    }

    addToDoItem(todoitem){

        if (this._todoList.find((element) => {
            element.getID == todoitem.getID
        })) {
            logMessage(`Task ${ todoitem.getID }already exists in this project`);
        } else {
            todoitem.updateProjectID(this._projectID);
        this._todoList.push(todoitem);
        logMessage(`Task ${todoitem.getTitle()} added to project`);
        }
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
        if (this._todoList.length == 0) {
            logMessage("no tasks in this project");
        }

        this._todoList.forEach( todo => {
            todo.printTodoItem();
        } )
    }

    listToDoItemsBrief(){
        if (this._todoList.length == 0) {
            logMessage("no tasks in this project");
        }

        this._todoList.forEach( todo => {
            logMessage(todo.getMinimalView());
        })
    }

    listToDoItemsFull(){
        if (this._todoList.length == 0) {
            logMessage("no tasks in this project");
        }

        this._todoList.forEach( todo => {
            logMessage(todo.getMaximumView());
        })
    }

    flushToStorage(){
        logMessage("Writing to local storage");

        this._todoList.forEach( todo => {
            let key = todo.getID();
            const todoMaxView = todo.getMaximumView();
            const todoMaxViewWithType = {...todoMaxView, 'type':'todo'};
            let value = JSON.stringify(todoMaxViewWithType)
            let msg = 'Writing a TODO item to Storage';
            storage.writeToStorage(key, value, msg);
        })

        let projObject = {
            projName : this.projectName,
            projID : this.projectID,
            type : 'project'
        }

        let key = this.projectID;
        let value = JSON.stringify( projObject );
        let msg = 'Writing a Project to Storage'
        storage.writeToStorage(key, value, msg);
    }

    retrieveFromStorage(){
        logMessage("Retrieving from local storage");
        const dataFromStorage = storage.readFromStorage();

        dataFromStorage.forEach(record => {
            if ((record.hasOwnProperty('projName') && (record.type == 'project'))){
                //TODO
                console.log('load a project');    
            }

            if ((record.hasOwnProperty('title') && (record.type == 'todo'))){
                const { title, description, duedate, priority, isComplete, todoID, projectID } = record;
                let loadingToDoItem = createToDoItem(title, description, duedate, priority, isComplete, todoID, projectID)
                this.addToDoItem(loadingToDoItem);
            }
        })
    }
}
