import { logMessage } from "./logger.js";

const PRIORITIES = {
    HIGH : {
        PRIORITY: "P1",
        COLOR: "#ff0000"
    },
    MEDIUM: {
        PRIORITY: "P2",
        COLOR: "#ff9100"
    },
    LOW: {
        PRIORITY: "P3",
        COLOR: "#fff700"
    },
}

function createToDoItem(
    title, 
    description, 
    duedate, 
    priority = PRIORITIES.LOW, 
    isComplete = false, 
    todoID = crypto.randomUUID(),
    projectID = 'empty'
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
        getTrimmedTitle 
    }
}


export { PRIORITIES, createToDoItem };