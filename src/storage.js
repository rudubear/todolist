import { logMessage } from "./logger.js";
import { Project } from "./projects.js";
import { createToDoItem } from "./todoItem.js";

class Storage {
    constructor(){
        logMessage("nothing to do yet in initializing storage");
    }

    writeToStorage(key, value, msg){
        localStorage.setItem(key, value);
        logMessage(msg);
    }

    readFromStorage(){
        logMessage("Retrieving from local storage");
        let itemsOnLocalStorage = []
        for (let i = 0; i < localStorage.length; i++) {
            const mykey = localStorage.key(i);
            let parsedToDoItem = JSON.parse(localStorage.getItem(mykey));
            itemsOnLocalStorage.push(parsedToDoItem);
        }
        return itemsOnLocalStorage;
    }
}

const storage = new Storage();
Object.freeze(storage);
export { storage };