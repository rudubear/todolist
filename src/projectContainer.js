import { PROJECTDEFAULT } from "./constants.js";
import { logMessage } from "./logger.js";
import { Project } from "./projects.js";
import { createToDoItem } from "./todoItem.js";
import { storage } from "./storage.js";


class ProjectContainer {

    #projectList = [];
    #virtualDataStore = [];

    constructor(){
        logMessage(`New project container is available`);
    }

    addProject(myProject){
        if (this.getProjectByID(myProject.projectID)) {
            logMessage("project already exists")
        } else {
            logMessage(`adding project ${myProject.projectName}, ${myProject.projectID}`);
            this.#projectList.push(myProject);
        }
    }

    addItemToProject(myProjectID, todoItem){
        let targetProjectIndex = this.getProjectIndexFromID(myProjectID);

        this.#projectList[targetProjectIndex].addToDoItem(todoItem);
        logMessage(`adding ${todoItem.getID()} to ${this.#projectList[targetProjectIndex].projectID} `);
    }

    removeItemFromProject(myProjectID, todoitemID){
        let targetProjectIndex = this.getProjectIndexFromID(myProjectID);

        this.#projectList[targetProjectIndex].removeToDoItem(todoitemID);
        logMessage(`removing ${todoitemID} from ${this.#projectList[targetProjectIndex].projectID} `);
    }

    listProjects(){
        this.#projectList.forEach(record => {
            logMessage(record.projectName);
        });
    }

    getAllProjects(){
        return this.#projectList;
    }

    listProjectToDoItems(myProjectID){
        let targetProjectIndex = this.getProjectIndexFromID(myProjectID);
        if (targetProjectIndex >= 0) {
            this.#projectList[targetProjectIndex].listToDoItems();    
        } else {
            logMessage("project not found");
        }
    }

    getAllProjectToDoItems(myProjectID){
        let targetProjectIndex = this.getProjectIndexFromID(myProjectID);
        if (targetProjectIndex >= 0) {
            this.#projectList[targetProjectIndex].listToDoItems();    
        } else {
            logMessage("project not found");
        }
    }

    listProjectToDoItemsBrief(myProjectID){
        let targetProjectIndex = this.getProjectIndexFromID(myProjectID);
        
        if (targetProjectIndex >= 0) {
            this.#projectList[targetProjectIndex].listToDoItemsBrief();    
        } else {
            logMessage("project not found");
        }
    }

    listProjectTodoItemsFull(myProjectID){
        let targetProjectIndex = this.getProjectIndexFromID(myProjectID);
        
        if (targetProjectIndex >= 0) {
            this.#projectList[targetProjectIndex].listToDoItemsFull();    
        } else {
            logMessage("project not found");
        }
    }

    containsProjects(){
        return this.#projectList.length > 0;
    }

    getLatestProject(){
        if (this.#projectList.length > 0){
            return this.#projectList[this.#projectList.length-1];
        }
        else {
            logMessage("no projects in project container");
            return 0;
        }
    }

    getProjectByID(projectID){
        let targetProject = this.#projectList.find((element) => {
            return (element.projectID == projectID);
        })

        return targetProject;
    }

    getProjectIndexFromID(myProjectID){
        let targetProjectIndex = this.#projectList.findIndex((element) => {
            return (element.projectID == myProjectID);
        })
        return targetProjectIndex;
    }

    removeAllCurrentProjects(){
        logMessage("Removing all projects in current app container and virtual data store");
        this.#projectList = [];
        this.#virtualDataStore = [];
    }

    removeTargetProject(targetProjectID){
        let targetProjectIndex = this.getProjectIndexFromID(targetProjectID);
        logMessage(this.#projectList);
        this.removeAllTasksInProjectFromVirtualDataStore(targetProjectID);

        if (targetProjectIndex >= 0) {
            this.#projectList.splice(targetProjectIndex,1);
            logMessage(`project ${targetProjectID} pruned from project lists`);
        } else {
            logMessage("Invalid index recieved on attempting to remove target project");
        }

        
    }

    removeTaskWithinProjectFromVirtualDataStore(taskID){
        let idxTargetTodoToBeRemoved = this.#virtualDataStore.findIndex(
            element => {
                return (element.type === 'todo') && (element.todoID === taskID)
                }
        );
        if (idxTargetTodoToBeRemoved >= 0) {
            logMessage(`removing ${this.#virtualDataStore[idxTargetTodoToBeRemoved].title} from virtual data store`);
            this.#virtualDataStore.splice(idxTargetTodoToBeRemoved,1);  
        }
        else {
            logMessage(`${taskID} not in virtual data store, no need to remove`)
        }
        
    }

    

    removeAllTasksInProjectFromVirtualDataStore(targetProjectID){
        logMessage(this.#virtualDataStore);
        const entriesToBeRemoved = this.#virtualDataStore.filter(
            element => (
                (element.hasOwnProperty('projID') && element.projID === targetProjectID) ||
                (element.hasOwnProperty('projectID') && element.projectID === targetProjectID)
            )
        );
        if (entriesToBeRemoved.length > 0) {
            logMessage(`project to be removed are`);
            logMessage(entriesToBeRemoved);
            
            const resultantVirtualDataStore = this.#virtualDataStore.filter(element => !(entriesToBeRemoved.includes(element)));
            this.#virtualDataStore = resultantVirtualDataStore;    
        }
        else {
            logMessage(`project not in virtual datastore, nothing to remove`);
        }
    }

    removeInvalidObjectsFromStorage(){
        let validKeyFn = (validObject) => {
            if (validObject.type === "project") {
                return validObject.projID;
            } 
            else if (validObject.type === "todo") {
                return validObject.todoID
            }
        };
        storage.deleteInvalidStorageItems(this.#virtualDataStore, validKeyFn);
    }

    loadDataFromStorage (){
        logMessage("Retrieving All Data from Storage into Virtual Data Store");
        this.#virtualDataStore = storage.readFromStorage();
    }

    loadProjectsFromVirtualDataStore() {
        logMessage("Loading all Projects from Virtual Data Store")
       
        this.#virtualDataStore.forEach(record => {
            if ((record.hasOwnProperty('projID') && (record.type == 'project'))){
                const { projID, projName } = record;
                let loadingProject = new Project(projName, projID);
                this.addProject(loadingProject);
            }
        })
    }

    loadTasksFromVirtualDataStore() {
        logMessage("Loading all Tasks from Virtual Data Store into their respective Projects")

        this.#virtualDataStore.forEach(record => {
            if ((record.hasOwnProperty('title') && (record.type == 'todo'))){
                const { 
                    title, 
                    description, 
                    duedate, 
                    priority, 
                    isComplete, 
                    todoID, 
                    projectID 
                } = record;

                let loadingToDoItem = createToDoItem(
                    title, 
                    description, 
                    duedate, 
                    priority, 
                    isComplete, 
                    todoID, 
                    projectID
                );
                let targetProjectIndex = this.#projectList.findIndex((element) => {
                    return ( element.projectID == projectID );
                })

                this.#projectList[targetProjectIndex].addToDoItem(loadingToDoItem);
                
                //this.addToDoItem(loadingToDoItem);
            }
        })
    }

    rebuildFromStorage(){
        logMessage("Rebuilding projects and tasks from storage");
        
        this.removeAllCurrentProjects();
        this.loadDataFromStorage();
        if(this.#virtualDataStore.length > 0) {
            this.loadProjectsFromVirtualDataStore();
            this.loadTasksFromVirtualDataStore();
        }
    }



    flushProjectsToStorage(){
        //Reconcile difference between virtual datastore, updated project list, and whats in storage
        //currently we don't clear out old keys on storage
        logMessage("Flushing all live Projects to Storage");
        this.#projectList.forEach((element) => {
            element.flushToStorage();
        });
    }

    clearAllInProject(myProjectID){
        logMessage(`Clearing Project ${myProjectID}`);
        this.#projectList[this.getProjectIndexFromID(myProjectID)].clearAllItems();
    }

    wipeAllProjectsOnStorage(){
        logMessage("Deleting all Projects in Storage");
        storage.deleteAllStorageItems();
    }

    
}

export { ProjectContainer }