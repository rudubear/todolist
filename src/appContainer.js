
import { APPSTATE, IMAGES, BUTTON_TEXT, APPTEXT, PRIORITIES } from "./constants.js"
import { logMessage } from "./logger.js";
import { ProjectContainer } from "./projectContainer.js";
import { Project } from "./projects.js";
import * as DOMRenderer from "./renderHTML.js";
import { createToDoItem } from "./todoItem.js";
import { toDoAppViewGenerator } from "./todoViewGenerator.js";
import { compareAsc, format } from "date-fns";



export const todoApp = (function() {
    let state = APPSTATE.LOADAPP;
    let myProjectContainer = new ProjectContainer(); 
    let myCurrentProject;
    let myCurrentTask;
    let navMenu = document.getElementById('btns_menu');
    let myMainContainer = document.getElementById("content");

    function prepareProjectInterface(){
        const btnLoadData = DOMRenderer.createHTMLelement_Button(
            BUTTON_TEXT.btn_Load_Data, 
            () => {
                setState(APPSTATE.LOADDATA);
                run();
            },
            "navButton",
            IMAGES.img_LoadFromDisk
        );
        
        const btnCreateProject = DOMRenderer.createHTMLelement_Button(
            BUTTON_TEXT.btn_Create_Project, 
            () => {
                setState(APPSTATE.CREATEPROJECT);
                run();
                },
            "navButton",
            IMAGES.img_NewProject
        );

        const btnSaveData = DOMRenderer.createHTMLelement_Button(
            BUTTON_TEXT.btn_Save_Data,
            () => {
                setState(APPSTATE.SAVEDATA);
                run();
            },
            "navButton",
            IMAGES.img_Save
        );

        const btnDeleteProjects = DOMRenderer.createHTMLelement_Button(
            BUTTON_TEXT.btn_Delete_All_Projects,
            () => {
                setState(APPSTATE.DELETEPROJECTS),
                run();
            },
            "navButton",
            IMAGES.img_DeleteAllProjects
        )

        const btnWipeStorage = DOMRenderer.createHTMLelement_Button(
            BUTTON_TEXT.btn_Delete_Storage,
            () => {
                setState(APPSTATE.DELETEDATA),
                run();
            },
            "navButton",
            IMAGES.img_WipeStorage
        )

        navMenu.replaceChildren();

        navMenu.appendChild(btnLoadData);
        navMenu.appendChild(btnCreateProject);
        navMenu.appendChild(btnSaveData);
        navMenu.appendChild(btnDeleteProjects);
        navMenu.appendChild(btnWipeStorage);

    }

    function prepareTaskInterface(){
        const btnCreateTask = DOMRenderer.createHTMLelement_Button(
            BUTTON_TEXT.btn_Create_Todo, 
            () => {
                setState(APPSTATE.CREATETODO);
                run();
                },
            "navButton",
            IMAGES.img_NewTask
        );

        const btnSaveData = DOMRenderer.createHTMLelement_Button(
            BUTTON_TEXT.btn_Save_Data,
            () => {
                setState(APPSTATE.SAVEDATA);
                run();
            },
            "navButton",
            IMAGES.img_Save
        );

        const btnCloseProject = DOMRenderer.createHTMLelement_Button(
            BUTTON_TEXT.btn_Close_Project,
            () => {
                setState(APPSTATE.CLOSEPROJECT),
                run();
            },
            "navButton",
            IMAGES.img_CloseProject
        )
        navMenu.replaceChildren();

        navMenu.appendChild(btnCreateTask);
        navMenu.appendChild(btnSaveData);
        navMenu.appendChild(btnCloseProject);

    }

    function run(){
        logMessage(state);

        switch(state){
            case APPSTATE.LOADAPP:
                prepareProjectInterface();
                setState(APPSTATE.OPEN)
                run();
                break;
            case APPSTATE.OPEN:
                //Default state, app is open awaiting input. Load list of al projects.

                if (myProjectContainer.containsProjects()){
                    myCurrentProject = myProjectContainer.getLatestProject();
                    myCurrentProject.listToDoItemsFull();
                    toDoAppViewGenerator.loadView(
                        myMainContainer, 
                        toDoAppViewGenerator.showProjectListTable, 
                        myProjectContainer.getAllProjects());
                }
                else {
                    toDoAppViewGenerator.loadView(
                        myMainContainer, 
                        toDoAppViewGenerator.loadNoRelevantItems, 
                        APPTEXT.txt_noProjects);
                }
                

                break;
            case APPSTATE.LOADDATA:
                //Remove all current projects in the app view and rebuild app container, projects and todo items from storage
                myProjectContainer.rebuildFromStorage();
                myCurrentProject = myProjectContainer.getLatestProject();
                myProjectContainer.listProjects();
                toDoAppViewGenerator.loadView(
                    myMainContainer, 
                    toDoAppViewGenerator.showProjectListTable, 
                    myProjectContainer.getAllProjects());
                setState(APPSTATE.OPEN);
                run();
                break;

            case APPSTATE.SAVEDATA:
                //Write all current project data to storage, overwriting existing keys/values.
                myProjectContainer.flushProjectsToStorage();
                setState(APPSTATE.OPEN);
                run();
                break;

            case APPSTATE.CREATEPROJECT:
                //Pop up a modal to create a new project. User can cancel.
                const myModal = document.getElementById("modalCreateProject");
                myModal.showModal();

                
                const myModalCreateButton = document.getElementById("btnCreateProjectConfirm");
                const myModalCancelButton = document.getElementById("btnCreateProjectCancel");
                

                myModalCreateButton.onclick = () => { 
                    const myModalNewProjectName = document.getElementById("projectNameToBeCreated").value;
                    myProjectContainer.addProject(new Project(myModalNewProjectName));
                    myModal.close();
                    setState(APPSTATE.OPEN);
                    run();
                
                };
                myModalCancelButton.onclick = () => { 
                    //myModalNewProjectName.value = "myNewProject";
                    myModal.close();
                    setState(APPSTATE.OPEN);
                    run();
                };
                break;

            case APPSTATE.DELETEPROJECTS:
                //Delete all current projects but don't touch storage
                myProjectContainer.clearAllProjects();
                myProjectContainer.listProjects();
                toDoAppViewGenerator.loadView(
                    myMainContainer, 
                    toDoAppViewGenerator.showProjectListTable, 
                    myProjectContainer.getAllProjects());
                setState(APPSTATE.OPEN);
                run();
                break;
    
            case APPSTATE.DELETEDATA:
                myProjectContainer.wipeAllProjectsOnStorage();
                break;
            
            case APPSTATE.OPENPROJECT:
                logMessage(`Time to Open Project ${myCurrentProject.projectName}`);
                if (myCurrentProject.containsToDoItems()){
                    toDoAppViewGenerator.loadView(
                        myMainContainer, 
                        toDoAppViewGenerator.showTaskListTable, 
                        myCurrentProject.getToDoItems());    
                } else {
                    toDoAppViewGenerator.loadView(
                        myMainContainer, 
                        toDoAppViewGenerator.loadNoRelevantItems, 
                        APPTEXT.txt_noTasks)
                }
                prepareTaskInterface();
                setState(APPSTATE.ACTIVEOPENPROJECT);
                run();
                //TODO
                break;
            case APPSTATE.ACTIVEOPENPROJECT:
                if (myCurrentProject.containsToDoItems()){
                    toDoAppViewGenerator.loadView(
                        myMainContainer, 
                        toDoAppViewGenerator.showTaskListTable, 
                        myCurrentProject.getToDoItems());    
                }
                //TODO
                break;
            case APPSTATE.SAVEPROJECT:
                //TODO
                break;
            case APPSTATE.CLOSEPROJECT:
                logMessage(`Closing Current PRoject ${myCurrentProject.projectID}`)
                myCurrentProject = undefined;
                setState(APPSTATE.LOADAPP);
                run();
                //TODO
                break;
            case APPSTATE.DELETEPROJECT:
                logMessage(`Time to Delete Project ${myCurrentProject.projectID}`);
                myProjectContainer.removeTargetProject(myCurrentProject.projectID);
                setState(APPSTATE.OPEN);
                run();
                //TODO
                break;
            case APPSTATE.CREATETODO:
                //Pop up a modal to create a new todo item. User can cancel.
                const myModalTask = document.getElementById("modalCreateTask");
                myModalTask.showModal();

                document.getElementById("taskDuedateToBeCreated").valueAsDate = new Date();
                document.getElementById("taskPriorityToBeCreated").value = "LOW";

                const myModalTaskCreateButton = document.getElementById("btnCreateTaskConfirm");
                const myModalTaskCancelButton = document.getElementById("btnCreateTaskCancel");
                

                myModalTaskCreateButton.onclick = () => { 
                    const newTaskName = document.getElementById("taskNameToBeCreated").value;
                    const newTaskDescription = document.getElementById("taskNameToBeCreatedDescription").value;
                    const newTaskPriorityValue = document.getElementById("taskPriorityToBeCreated").value;
                    const newTaskDueDate = document.getElementById("taskDuedateToBeCreated").value;
                    const newTaskPriority = PRIORITIES[`${newTaskPriorityValue}`];

                    logMessage({
                        newTaskName,
                        newTaskDescription,
                        newTaskPriority,
                        newTaskDueDate
                    })

                    myCurrentProject.addToDoItem(
                        createToDoItem(
                            newTaskName, 
                            newTaskDescription, 
                            newTaskDueDate, 
                            newTaskPriority, 
                            undefined, 
                            undefined, 
                            myCurrentProject.projectID));
                    myModalTask.close();
                    setState(APPSTATE.ACTIVEOPENPROJECT)
                    run();
                
                };
                myModalTaskCancelButton.onclick = () => { 
                    //myModalNewProjectName.value = "myNewProject";
                    
                    myModalTask.close();
                    setState(APPSTATE.ACTIVEOPENPROJECT);
                    run();
                };
                break;

                break;
            case APPSTATE.OPENTODO:
                logMessage(`Time to edit a task ${myCurrentProject} ${myCurrentTask}`);
                const myTaskTitleLoadValue = myCurrentTask.getTitle();
                const myTaskDescriptionLoadValue = myCurrentTask.getDescription();
                const myTaskDueDateLoadValue = myCurrentTask.getDueDate(); 
                const myTaskPriorityLoadValue = myCurrentTask.getPriority();
                const myTaskIsCompleteLoadValue = myCurrentTask.getIsComplete(); 


                const myModalEditTask = document.getElementById("modalUpdateTask");
                myModalEditTask.showModal();

                let myModalTaskTitleToBeUpdated = document.getElementById("taskNameToBeUpdated");
                let myModalTaskDescriptionToBeUpdated = document.getElementById("taskNameToBeUpdatedDescription");
                let myModalTaskDueDateToBeUpdated = document.getElementById("taskDuedateToBeUpdate");
                let myModalTaskPriorityToBeUpdated = document.getElementById("taskPriorityToBeUpdated");
                let myModalTaskIsCompleteToBeUpdated = document.getElementById("taskCompletecheckbox");
            
                myModalTaskTitleToBeUpdated.value = myTaskTitleLoadValue;
                myModalTaskDescriptionToBeUpdated.value = myTaskDescriptionLoadValue;
                myModalTaskDueDateToBeUpdated.value = myTaskDueDateLoadValue;
                myModalTaskPriorityToBeUpdated.value = myTaskPriorityLoadValue;
                myModalTaskIsCompleteToBeUpdated.checked = myTaskIsCompleteLoadValue;

                const myModalTaskUpdateButton = document.getElementById("btnUpdateTaskConfirm");
                const myModalTaskUpdateCancelButton = document.getElementById("btnUpdateTaskCancel");
                
                
                myModalTaskUpdateButton.onclick = () => { 
                    const updatedTaskName = myModalTaskTitleToBeUpdated.value;
                    const updatedTaskDescription = myModalTaskDescriptionToBeUpdated.value;
                    const updatedTaskDueDate = myModalTaskDueDateToBeUpdated.value;
                    const updatedTaskPriorityValue = myModalTaskPriorityToBeUpdated.value;
                    const updatedTaskPriority = PRIORITIES[`${updatedTaskPriorityValue}`];
                    const updatedTaskIsComplete = myModalTaskIsCompleteToBeUpdated.checked;

                    logMessage({
                        updatedTaskName,
                        updatedTaskDescription,
                        updatedTaskDueDate,
                        updatedTaskPriority,
                        updatedTaskIsComplete
                    })

                    myCurrentProject.updateToDoItem(
                        myCurrentTask.getID(), 
                        [
                            updatedTaskName, 
                            updatedTaskDescription, 
                            updatedTaskDueDate, 
                            updatedTaskPriority,
                            updatedTaskIsComplete
                        ])

                    myModalEditTask.close();
                    setState(APPSTATE.ACTIVEOPENPROJECT)
                    run();
                
                };
                myModalTaskUpdateCancelButton.onclick = () => { 
                    //myModalNewProjectName.value = "myNewProject";
                    
                    myModalEditTask.close();
                    setState(APPSTATE.ACTIVEOPENPROJECT);
                    run();
                };
                
                //TODO
                break;
            case APPSTATE.SAVETODO:
                //TODO
                break;
            case APPSTATE.CLOSETODO:
                //TODO
                break;
            case APPSTATE.DELETETODO:
                logMessage(`Time to delete ${myCurrentTask.getID()}`);
                myCurrentProject.removeToDoItem(myCurrentTask.getID());
                setState(APPSTATE.ACTIVEOPENPROJECT);
                run();
                break;
            case APPSTATE:
                //TODO
                break;
            case APPSTATE:
                //TODO
                break;
            case APPSTATE:
                //TODO
                break;
            case APPSTATE:
                //TODO
                break;
        }
    }

    function setState(newState){
        state = newState;
    }

    function setCurrentProject(targetProjectID){
        myCurrentProject = myProjectContainer.getProjectByID(targetProjectID);
        logMessage(`current project set to ${myCurrentProject.projectID}`);
    }

    function setCurrentTask(targetTaskID){
        myCurrentTask = myCurrentProject.getTargetToDoItem(targetTaskID);
        logMessage(`current task set to ${myCurrentTask.getID()}`)
    }

    function btnLoadData(){
        myProjectContainer.loadDataFromStorage();
        //TODO : populate gui, link projects on dom
    }

    function btnSaveData(){
        myProjectContainer.flushProjectsToStorage();
        //Nothing to do on gui?
    }

    function btnCreateProject(){
        //TODO: Pop open a modal to take input on project
        let newProjectTitle = "new project title"
        let newProject = new Project(newProjectTitle)
        myProjectContainer.addProject();
    }

    return {
        run,
        setState,
        setCurrentProject,
        setCurrentTask
    }
})();