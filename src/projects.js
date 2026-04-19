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

    updateToDoItem(targetToDoItemID, targetToDoItemFields){
        const targetToDoItemIndex = this._todoList.findIndex( todoItem => todoItem.getID() === targetToDoItemID );
        logMessage(`targetting ${this._todoList[targetToDoItemIndex].getID()} for editing`);
        this._todoList[targetToDoItemIndex].updateToDoItem(...targetToDoItemFields);
    }

    removeToDoItem(todoitemID){
        const itemToRemove = this._todoList.findIndex(todoitem => 
            todoitem.getID() == todoitemID
        );
        logMessage (`removing ${itemToRemove} item, ${this._todoList[itemToRemove].getTitle()}`);

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

    getTargetToDoItem(targetToDoItemID){
        let resultTodoItem = this._todoList.find(todoItem => todoItem.getID() === targetToDoItemID);
        logMessage(`Found ${resultTodoItem.getID()}`);
        return resultTodoItem;
    }

    getToDoItems(){
        if (this._todoList.length == 0) {
            logMessage("no tasks in this project");
        }

        return this._todoList;
    }

    containsToDoItems(){
        return this._todoList.length > 0;
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
        logMessage("Wiping and Writing to local storage");
        //storage.deleteInvalidStorageItems(this._todoList)

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
}
