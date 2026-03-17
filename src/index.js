// index.js
import "./styles.css";

import img_restaurant_bg from "../assets/images/restaurant_background.png";

import { page_load_text_home, div_home } from "./home.js";
import { page_load_text_menu, div_menu} from "./menu.js";
import { page_load_text_about, div_aboutus } from "./about.js";
import { page_HTMLRenderer } from "./renderHTML.js";

console.log(page_load_text_about);
console.log(page_load_text_home);
console.log(page_load_text_menu);
console.log(page_HTMLRenderer);

let divContent = document.getElementById("content");
let divBody = document.querySelector('body');

divContent.appendChild(div_home);

const image_restaurant_bg = document.createElement("img");
image_restaurant_bg.src = img_restaurant_bg;
divBody.style.backgroundImage = `url(${img_restaurant_bg})`;


const btn_home = document.getElementById("btn_Home");
const btn_menu = document.getElementById("btn_Menu");
const btn_about = document.getElementById("btn_About");

btn_home.addEventListener("click", (event) => {
    console.log("home button clicked");
    divContent.replaceChildren();
    divContent.appendChild(div_home);

});

btn_menu.addEventListener("click", (event) => {
    console.log("menu button clicked");
    divContent.replaceChildren();
    divContent.appendChild(div_menu);
});

btn_about.addEventListener("click", (event) => {
    console.log("about button clicked");
    divContent.replaceChildren();
    divContent.appendChild(div_aboutus);
});