// index.js
import "./styles.css";

import { project } from "./projects.js";

import img_restaurant_bg from "../assets/images/todolist_background.jpg";

import { page_load_text_home } from "./home.js";
import { page_load_text_about } from "./about.js";
import { page_HTMLRenderer } from "./renderHTML.js";
import { createToDoItem, PRIORITIES} from "./todoItem.js";

console.log(page_load_text_about);
console.log(page_load_text_home);
console.log(page_HTMLRenderer);

let divContent = document.getElementById("content");
let divBody = document.querySelector('body');

const image_restaurant_bg = document.createElement("img");
image_restaurant_bg.src = img_restaurant_bg;
divBody.style.backgroundImage = `url(${img_restaurant_bg})`;


const btn_home = document.getElementById("btn_Home");
const btn_menu = document.getElementById("btn_Menu");
const btn_about = document.getElementById("btn_About");

btn_home.addEventListener("click", (event) => {
    console.log("home button clicked");
    divContent.replaceChildren();

});

btn_menu.addEventListener("click", (event) => {
    console.log("menu button clicked");
    divContent.replaceChildren();
});

btn_about.addEventListener("click", (event) => {
    console.log("about button clicked");
    divContent.replaceChildren();
});

const myProject = new project("my project");

let todoItem1 = createToDoItem("task 1 is very long i think, maybe a bit too long", "task 1 description", "someduedate", PRIORITIES.HIGH, false);
let todoItem2 = createToDoItem("task 2 is short", "task 2 description", "someduedate", PRIORITIES.MEDIUM)
let todoItem3 = createToDoItem("task 3 is also very long, a bit too long", "task 3 description", "someduedate", PRIORITIES.MEDIUM, false);
let todoItem4 = createToDoItem("task 4", "task 4 description", "someduedate", PRIORITIES.LOW, false);

myProject.addToDoItem(todoItem1);
myProject.addToDoItem(todoItem2);
myProject.addToDoItem(todoItem3);
myProject.addToDoItem(todoItem4);

myProject.listToDoItems();

myProject.removeToDoItem(todoItem1.getID());
myProject.removeToDoItem(todoItem3.getID());

myProject.listToDoItems();

myProject.listToDoItemsBrief();

myProject.listToDoItemsFull();

localStorage.clear();

myProject.flushToStorage();
myProject.retrieveFromStorage();