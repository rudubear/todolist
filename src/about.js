// about.js

const page_load_text_about = "loading about us page!"

import {createHTMLelement_DIV, createHTMLelement_H, createHTMLelement_P } from "./renderHTML.js";

export { page_load_text_about };

const aboutus_p1 = "In the fictional world of culinary folklore, the Rudubear Ajisen Ramen Restaurant has a history as rich and layered as its signature tonkotsu broth.";
const aboutus_h1 = "The Legend of the \"Rudubear\" (1962–1967)";
const aboutus_p2 = "Long before the first bowl was served, the story began in the snowy mountains of Hokkaido. Local legend tells of a mountain guide named Rudu, a man known for his rugged strength and surprisingly gentle spirit. One winter, while seeking shelter from a blizzard, Rudu shared his campfire and a humble pot of wheat noodles with a lost, orphaned bear cub.";
const aboutus_p3 = "The two became inseparable, and the villagers began calling them the \"Rudubear duo.\" Rudu discovered that the cub had an uncanny \"nose\" for finding the best wild garlic and mountain spring water—the two secret ingredients that would eventually define their broth.";
const aboutus_h2 = "The Ajisen Connection (1968)";
const aboutus_p4 = "In 1968, Rudu travelled south to Kumamoto, where he met Takaharu Shigemitsu, the real-life founder of Ajisen Ramen. Shigemitsu was impressed by Rudu’s mountain-forged \"Secret Garlic Oil\" (Senmiyu).";
const aboutus_p5 = "They decided to collaborate, blending the traditional Kumamoto-style tonkotsu with Rudu’s wild-harvested inspirations. They named the venture Rudubear Ajisen to honor the \"Thousand Flavours\" (the meaning of Ajisen) and the bear that helped discover them.";
const aboutus_h3 = "Global Expansion & Modern Era";
const aboutus_p6 = "The restaurant became a cult classic, known for its unique mascot: a bear wearing a traditional hachimaki (headband) holding a giant ramen ladle.";
const aboutus_p7 = "1990s: The \"Rudubear\" brand became a symbol of warmth and endurance, opening its first international \"den\" in Hong Kong (1996).";
const aboutus_p8 = "2005: The legend crossed the Pacific, with Rudubear Ajisen opening its doors in Toronto as a pioneer of the Canadian ramen scene.";
const aboutus_p9 = "Today: The restaurant remains famous for its \"1,800-Second Grind\", a technique said to be inspired by the way the original bear cub used to patiently crush garlic cloves with its paws.";

let div_aboutus1 = createHTMLelement_DIV("divsAboutUs");
let div_aboutus2 = createHTMLelement_DIV("divsAboutUs");
let div_aboutus3 = createHTMLelement_DIV("divsAboutUs");

div_aboutus1.appendChild(createHTMLelement_P(aboutus_p1));
div_aboutus1.appendChild(createHTMLelement_H(aboutus_h1));
div_aboutus1.appendChild(createHTMLelement_P(aboutus_p2));
div_aboutus1.appendChild(createHTMLelement_P(aboutus_p3));

div_aboutus2.appendChild(createHTMLelement_H(aboutus_h2));
div_aboutus2.appendChild(createHTMLelement_P(aboutus_p4));
div_aboutus2.appendChild(createHTMLelement_P(aboutus_p5));

div_aboutus3.appendChild(createHTMLelement_H(aboutus_h3));
div_aboutus3.appendChild(createHTMLelement_P(aboutus_p6));
div_aboutus3.appendChild(createHTMLelement_P(aboutus_p7));
div_aboutus3.appendChild(createHTMLelement_P(aboutus_p8));
div_aboutus3.appendChild(createHTMLelement_P(aboutus_p9));

let div_aboutus = createHTMLelement_DIV("divsAboutUs");

div_aboutus.appendChild(div_aboutus1);
div_aboutus.appendChild(div_aboutus2);
div_aboutus.appendChild(div_aboutus3);

export { div_aboutus } ;



