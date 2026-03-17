// menu.js

const page_load_text_menu = "loading menu page!"

import { page_load_text_menu_item, MenuItem } from "./menuitem.js";
import { renderHTMLMenuObject } from "./renderHTML.js";

import img_menuitem_sushi from "../assets/images/sushi_dragon_roll.jpeg";
import img_menuitem_ramen from "../assets/images/ramen.jpeg";
import img_menuitem_misosoup from "../assets/images/miso_soup.jpeg";
import img_menuitem_coke from "../assets/images/coca_cola.jpeg";
import img_menuitem_greentea from "../assets/images/green-tea-scaled.jpeg";
import img_menuitem_cappuccino from "../assets/images/cappuccino.jpg";

console.log(page_load_text_menu_item);

let div_menu = document.createElement("div");
div_menu.classList = "divsMenu";
let ul_menuList = document.createElement("ul");

const menu_item_coke = new MenuItem(
    "Coca Cola",
    "A refreshing ice cold Coca Cola. Served with ice cubes fresh from our fridge.",
    "$2.99"
);

const menu_item_greentea = new MenuItem(
    "Green Tea", 
    "A refreshing cup of green tea made with tea leaves from the tee plantations of China.",
    "$1.99"
);

const menu_item_cappuccino = new MenuItem(
    "Cappuccino",
    "A hot delicious cappuccino, made with beans from the mountains of the himalayas. Italian's say a cup a day keeps the energy up and running all day.",
    "$5.99"
);

const menu_item_ramen = new MenuItem(
    "Ramen",
    "Our world class pork ramen, loved by men and women of all ages, made with our unique blend of herbs and spices with a zesty taste that is sure to satisfy your palate",
    "$14.99"
);

const menu_item_misosoup = new MenuItem(
    "Miso Soup",
    "The best Miso Soup the working class man or woman would ask for. Warms your heart and soul",
    "$8.99"
)

const menu_item_dragonroll = new MenuItem(
    "Dragon Roll",
    "The greatest dragon roll sushi to exist. It was forged in the heart of a dying star by gathering the 7 dragon balls and summoning the immortal dragon Shenron",
    "$18.99"
)

ul_menuList.appendChild(renderHTMLMenuObject(menu_item_cappuccino, img_menuitem_cappuccino));
ul_menuList.appendChild(renderHTMLMenuObject(menu_item_coke, img_menuitem_coke));
ul_menuList.appendChild(renderHTMLMenuObject(menu_item_greentea, img_menuitem_greentea));
ul_menuList.appendChild(renderHTMLMenuObject(menu_item_misosoup, img_menuitem_misosoup));
ul_menuList.appendChild(renderHTMLMenuObject(menu_item_ramen, img_menuitem_ramen));
ul_menuList.appendChild(renderHTMLMenuObject(menu_item_dragonroll, img_menuitem_sushi));

div_menu.appendChild(ul_menuList);

export { page_load_text_menu, div_menu} ;
