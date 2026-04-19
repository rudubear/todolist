// todoViewGenerator.js

import { logMessage } from "./logger.js";
import * as DOMRenderer from "./renderHTML.js"
import { APPSTATE, IMAGES } from "./constants.js"
import { todoApp } from "./appContainer.js";

export const toDoAppViewGenerator = ( function(){

    function showProjectListTable(listOfProjects){
        let myTable = DOMRenderer.createHTMLelement_TABLE();
        let myTableCaptions = DOMRenderer.createHTMLelement_TableCaption("List of Projects");
        let myTableHeaders = DOMRenderer.createHTMLelement_TableHeaders(['Project', 'Open', 'Delete']);
        let myTableBody = DOMRenderer.createHTMLelement_TableBody();

        myTable.appendChild(myTableCaptions);
        myTable.appendChild(myTableHeaders);
        
        listOfProjects.forEach(myProject => {
            let myTableRow = DOMRenderer.createHTMLelement_TableRow([myProject.projectName, 'Open', 'Delete']);
            myTableRow.setAttribute('data-projectid',`${myProject.projectID}`)
            myTableBody.appendChild(myTableRow);
        });

        /*
        //This is causing things to break, maybe because it takes time to load before we return mytable to the content div? 
        //lets solve this later
        
        for(var i = 0; i < myTableBody.rows.length; i++ ){
            let row = myTableBody.rows[i];
            let columnContainingOpenText = 1;
            let columnContainingDeleteText = 2;
        
            
            
            row.cells[columnContainingOpenText].replaceChildren(
                DOMRenderer.createHTMLelement_Image
                (
                    IMAGES.img_NewProject,
                    "Open",
                    "50px",
                    "auto"
                )
            );
            
            row.cells[columnContainingDeleteText].replaceChildren(
                DOMRenderer.createHTMLelement_Image
                (
                    IMAGES.img_DeleteProject,
                    "Delete",
                    "50px",
                    "auto"
                )
            );
        }*/

        myTable.appendChild(myTableBody);
        
        myTable.onclick = (event) => {
            if (event.target.tagName === "TD") {
                let targetCommand = (event.target.innerText);
                let targetProjectID = event.target.closest("tr").attributes['data-projectid'].value;
                logMessage(`Event triggered to ${targetCommand} ${targetProjectID}`);

                if(targetCommand === "Open"){
                    todoApp.setState(APPSTATE.OPENPROJECT);
                    todoApp.setCurrentProject(targetProjectID);
                    todoApp.run();
                }
                else if (targetCommand === "Delete"){
                    todoApp.setState(APPSTATE.DELETEPROJECT);
                    todoApp.setCurrentProject(targetProjectID);
                    todoApp.run();
                }
            }
            else {
                logMessage(event.target.tagName);
            }
        }
        myTable.classList+=("myCustomTable");
        return myTable;
    }

    function showTaskListTable(listOfTasks){
        let myTable = DOMRenderer.createHTMLelement_TABLE();
        let myTableCaptions = DOMRenderer.createHTMLelement_TableCaption("List of Tasks");
        let myTableHeaders = DOMRenderer.createHTMLelement_TableHeaders(
            ['Task', 'DueDate', 'Priority', 'Complete', 'Edit', 'Delete']
        );
        let myTableBody = DOMRenderer.createHTMLelement_TableBody();

        myTable.appendChild(myTableCaptions);
        myTable.appendChild(myTableHeaders);
        
        listOfTasks.forEach(task => {
            let myTableRow = DOMRenderer.createHTMLelement_TableRow(
                [task.getTrimmedTitle(), task.getDueDate(), task.getPriority(), task.getIsComplete()? "Yes" : "No",  'Open', 'Delete']
            );
            myTableRow.setAttribute('data-todoid',`${task.getID()}`);
            let rowBgColor = task.getPriorityColor();
            myTableRow.style.backgroundColor = rowBgColor;
            
            myTableBody.appendChild(myTableRow);
        });

        //lets add images in place of open and delete in the cells. 
        //Note this is causing issues at page load that are difficult to debug at this time so we have paused this implementaiton

        myTable.appendChild(myTableBody);

        /*for(var i = 1; i < myTable.rows.length; i++ ){
            let row = myTable.rows[i];
            let columnContainingOpenText = 4;
            let columnContainingDeleteText = 5;
            row.cells[columnContainingOpenText].innerText = "overwrite";
            row.cells[columnContainingDeleteText].innerText = "overwrite2";
        }*/

        myTable.onclick = (event) => {
            if (event.target.tagName === "TD") {
                let targetCommand = (event.target.innerText);
                let targetTaskID = event.target.closest("tr").attributes['data-todoid'].value;
                logMessage(`Event triggered to ${targetCommand} ${targetTaskID}`);

                if(targetCommand === "Open"){
                    logMessage("open task");
                    todoApp.setState(APPSTATE.OPENTODO);
                    todoApp.setCurrentTask(targetTaskID);
                    todoApp.run();
                    
                }
                else if (targetCommand === "Delete"){
                    logMessage("delete task");
                    todoApp.setState(APPSTATE.DELETETODO);
                    todoApp.setCurrentTask(targetTaskID);
                    todoApp.run();
                }
            }
            else {
                logMessage(event.target.tagName);
            }
        }
        myTable.classList+=("myCustomTable");
        return myTable;
    }

    function loadView(containerElement, fnGenerateNewContent, ...args){
        logMessage(`Reloading view ${containerElement}`);
        containerElement.replaceChildren();
        const newContent = fnGenerateNewContent(...args);
        containerElement.appendChild(newContent);
    }
    return {
        showProjectListTable,
        showTaskListTable,
        loadView,
        prepCreateProjectModal,
        loadNoRelevantItems
    }

    function prepCreateProjectModal(){
        const myModal = document.getElementById("modalCreateProject");
        const myModalCreateButton = document.getElementById("btnCreateProjectConfirm");
        const myModalCancelButton = document.getElementById("btnCreateProjectCancel");

        myModalCreateButton.addEventListener(
            "click", 
            () => { 
                const myModalNewProjectName = document.getElementById("projectNameToBeCreated").value;
                todoApp.myProjectContainer.addProject(new Project(myModalNewProjectName));
                myModal.close();
            });
        
        myModalCancelButton.addEventListener("click", () => { myModal.close();})
    }

    function loadNoRelevantItems(defaultMessage){
        let myParagraph = DOMRenderer.createHTMLelement_P(defaultMessage);
        return myParagraph;
    }

})();