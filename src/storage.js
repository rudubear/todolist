import { logMessage } from "./logger.js";
import { Project } from "./projects.js";
import { createToDoItem } from "./todoItem.js";

class Storage {
    constructor(){
        logMessage("nothing to do yet in initializing storage");
    }

    writeToStorage(key, value, msg){
        localStorage.setItem(key, value);
        logMessage(`${msg}, ${key} : ${value}`);
    }

    readFromStorage(){
        logMessage("Retrieving from local storage");
        let itemsOnLocalStorage = []
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                const mykey = localStorage.key(i);
                let parsedToDoItem = JSON.parse(localStorage.getItem(mykey));
                itemsOnLocalStorage.push(parsedToDoItem);
            }
        }
        else {
            logMessage("There is nothing in storage!");
        }
        return itemsOnLocalStorage;
    }

    deleteAllStorageItems(){
        logMessage("Wiping storage");
        localStorage.clear();
    }

    deleteInvalidStorageItems(validDataArray, validKeyFindFn){
        let invalidKeysInStorage = Object.keys(localStorage);
        logMessage(`All keys in storage ${invalidKeysInStorage}`);
        //validDataArray[0].todo is included in invalidKeysInStorage
        
        validDataArray.forEach(element => {
            const validKey = validKeyFindFn(element);
            const index = invalidKeysInStorage.indexOf(validKey);
            if (index >=0) {
                invalidKeysInStorage.splice(index, 1);
            }
            /*
            const index = invalidKeysInStorage.indexOf(element.validKeyFindFn());
            if (index >=0) {
                invalidKeysInStorage.splice(index, 1);
            }  */
        });
        logMessage(`Invalid keys in storage to be removed ${invalidKeysInStorage}`);
        invalidKeysInStorage.forEach(invalidKey => {
            localStorage.removeItem(invalidKey);
        })
        
    }
}

const storage = new Storage();
Object.freeze(storage);
export { storage };