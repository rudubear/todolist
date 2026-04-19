import { logMessage } from "./logger.js";
import { PRIORITIES, TODOPREFIX, PROJECTDEFAULT } from "./constants.js";

function createToDoItem(
    title, 
    description, 
    duedate, 
    priority = PRIORITIES.LOW, 
    isComplete = false, 
    todoID = TODOPREFIX + crypto.randomUUID(),
    projectID = PROJECTDEFAULT
){
    let todoItem = {
        title : title,
        description: description,
        duedate: duedate,
        priority: priority,
        isComplete: isComplete,
        todoID: todoID,
        projectID: projectID 
    } 

    //logMessage(`new to do item ${title} created!`);

    const updatePriority = (newPriority) => { priority = newPriority };
    const updateProjectID = (newProjectID) => { 
        todoItem.projectID = newProjectID 
    } 
    const markAsComplete = () => { isComplete = true };
    const markAsIncomplete = () => { isComplete = false };
    const printTodoItem = () => { logMessage({title, description, duedate, priority, isComplete, todoID }) };
    
    const getID = () => todoID;
    const getTitle = () => title;
    const getDescription = () => description;
    const getDueDate = () => duedate;
    const getPriority = () => priority.PRIORITY;
    const getPriorityColor = () => priority.COLOR;
    const getIsComplete = () => isComplete;

    const getTrimmedTitle = () => {
        if (title.length <= 20) {
            return title;
        }
        else {
            return title.substring(0,20);
        }
    }
    const getMinimalView = () => { 
        let trimmedTitle = getTrimmedTitle(); 
        return { trimmedTitle, priority, isComplete };
    };

    const getMaximumView = () => {
        return { title, description, duedate, priority, isComplete, todoID, projectID };
    }

    const updateToDoItem = (newTitle, newDescription, newDueDate, newPriority, newIsComplete) => {
        title = newTitle; 
        description = newDescription; 
        duedate = newDueDate; 
        priority = newPriority 
        isComplete = newIsComplete; 
    }

    return { 
        todoItem, 
        updatePriority,
        updateProjectID, 
        markAsComplete, 
        markAsIncomplete, 
        printTodoItem, 
        getMinimalView,
        getMaximumView, 
        getID, 
        getTitle, 
        printTodoItem,
        getTrimmedTitle, 
        getDescription,
        getDueDate,
        getPriority,
        getPriorityColor,
        getIsComplete,
        updateToDoItem
    }
}


export { PRIORITIES, createToDoItem };