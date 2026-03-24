import { PROJECTDEFAULT } from "./constants.js";
import { logMessage } from "./logger.js";
import { Project } from "./projects.js";
import { createToDoItem } from "./todoItem.js";
import { storage } from "./storage.js";


class ProjectContainer {

    #projectList = [];
    #virtualDataStore;

    constructor(myProject = undefined){
        if (myProject) {
            this.addProject(myProject);
        } else {
            this.#projectList.push(new Project(PROJECTDEFAULT));
        }
        
    }

    addProject(myProject){
        if (this.getProjectByID(myProject.projectID)) {
            logMessage("project already exists")
        } else {
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

    listProjectToDoItems(myProjectID){
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

    getLatestProject(){
        return this.#projectList[this.#projectList.length-1];
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
        logMessage(this.#projectList);
    }

    loadTasksFromVirtualDataStore() {
        logMessage("Loading all Tasks from Virtual Data Store into their respective Projects")

        this.#virtualDataStore.forEach(record => {
            if ((record.hasOwnProperty('title') && (record.type == 'todo'))){
                const { title, description, duedate, priority, isComplete, todoID, projectID } = record;
                let loadingToDoItem = createToDoItem(title, description, duedate, priority, isComplete, todoID, projectID);
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
        
        this.loadDataFromStorage();
        this.loadProjectsFromVirtualDataStore();
        this.loadTasksFromVirtualDataStore();
        
        /*
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
        })*/
    }

    flushProjectsToStorage(){
        logMessage("Flushing Projects to Storage");
        this.#projectList.forEach((element) => {
            element.flushToStorage();
        });
    }

    clearAllProjects(){
        logMessage("Clearing all Projects");
        this.#projectList = [];
    }

    clearAllInProject(myProjectID){
        logMessage(`Clearing Project ${myProjectID}`);
        this.#projectList[this.getProjectIndexFromID(myProjectID)].clearAllItems();
    }

    
}

export { ProjectContainer }