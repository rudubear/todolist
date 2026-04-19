// logger.js

function logMessage (messages){
    //console.log(typeof messages[Symbol.iterator]);
    if (typeof messages === 'string' || messages === null || messages === undefined || typeof messages[Symbol.iterator] === 'undefined' ){
        console.log(messages);
    } else {
        console.log(...messages);
    }
    
}

export { logMessage };