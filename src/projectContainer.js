import { PROJECTDEFAULT } from "./constants.js";
import { logMessage } from "./logger.js";
import { Project } from "./projects.js";
import { createToDoItem } from "./todoItem.js";
import { storage } from "./storage.js";


class ProjectContainer {

    #projectList = [];
    #virtualDataStore = [];

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
        logMessage("Removing all projects in current app container");
        this.#projectList = [];
    }

    removeTargetProject(targetProjectID){
        let targetProjectIndex = this.getProjectIndexFromID(targetProjectID);
        logMessage(this.#projectList);
        this.removeAllTasksInProjectFromVirtualDataStore(targetProjectID);

        if (targetProjectIndex >= 0) {
            this.#projectList.splice(targetProjectIndex,1);
        } else {
            logMessage("Invalid index recieved on attempting to remove target project");
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

        logMessage(`project to be removed${entriesToBeRemoved}`);
        
        const resultantVirtualDataStore = this.#virtualDataStore.filter(element => !(entriesToBeRemoved.includes(element)));
        this.#virtualDataStore = resultantVirtualDataStore;
        //while(this.#virtualDataStore.findIndex(element => {element.}))
        logMessage("revisit this line of code once you have tasks working");
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
        logMessage("Flushing all live Projects to Storage");
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

    wipeAllProjectsOnStorage(){
        logMessage("Deleting all Projects in Storage");
        storage.deleteAllStorageItems();
    }

    
}

export { ProjectContainer }