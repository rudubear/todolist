// index.js
import "./styles.css";

import { Project } from "./projects.js";
import { ProjectContainer } from "./projectContainer.js";

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



const myProject = new Project("my project");

const myProjectContainer = new ProjectContainer(myProject);

myProjectContainer.addProject(myProject);

let todoItem1 = createToDoItem("task 1 is very long i think, maybe a bit too long", "task 1 description", "someduedate", PRIORITIES.HIGH, false, undefined, myProject.projectID);
let todoItem2 = createToDoItem("task 2 is short", "task 2 description", "someduedate", PRIORITIES.MEDIUM, false, undefined, myProject.projectID)
let todoItem3 = createToDoItem("task 3 is also very long, a bit too long", "task 3 description", "someduedate", PRIORITIES.MEDIUM, false, undefined, myProject.projectID);
let todoItem4 = createToDoItem("task 4", "task 4 description", "someduedate", PRIORITIES.LOW, false, undefined, myProject.projectID);

myProjectContainer.addItemToProject(myProject.projectID, todoItem1);
myProjectContainer.addItemToProject(myProject.projectID, todoItem2);
myProjectContainer.addItemToProject(myProject.projectID, todoItem3);
myProjectContainer.addItemToProject(myProject.projectID, todoItem4);

myProjectContainer.listProjectToDoItems(myProject.projectID);

myProjectContainer.removeItemFromProject(myProject.projectID, todoItem1.getID());
myProjectContainer.removeItemFromProject(myProject.projectID, todoItem3.getID());


myProjectContainer.listProjectToDoItems(myProject.projectID);

myProjectContainer.listProjectToDoItemsBrief(myProject.projectID);

myProjectContainer.listProjectTodoItemsFull(myProject.projectID);

localStorage.clear();

myProjectContainer.flushProjectsToStorage();


myProjectContainer.clearAllProjects();

myProjectContainer.listProjectToDoItemsBrief(myProject.projectID);

myProjectContainer.rebuildFromStorage(); //continue here

myProjectContainer.listProjectTodoItemsFull(myProjectContainer.getLatestProject().projectID);