// menu.js

const page_load_text_menu = "loading menu page!"

import { page_load_text_menu_item, MenuItem } from "./menuitem.js";
import { renderHTMLMenuObject } from "./renderHTML.js";

/* replace with icons later
import img_menuitem_sushi from "../assets/images/sushi_dragon_roll.jpeg";
import img_menuitem_ramen from "../assets/images/ramen.jpeg";
import img_menuitem_misosoup from "../assets/images/miso_soup.jpeg";
import img_menuitem_coke from "../assets/images/coca_cola.jpeg";
import img_menuitem_greentea from "../assets/images/green-tea-scaled.jpeg";
import img_menuitem_cappuccino from "../assets/images/cappuccino.jpg";
*/

console.log(page_load_text_menu_item);

let div_menu = document.createElement("div");
div_menu.classList = "divsMenu";
let ul_menuList = document.createElement("ul");

div_menu.appendChild(ul_menuList);

export { page_load_text_menu, div_menu} ;
