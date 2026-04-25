import { logMessage } from "./logger.js";

const page_HTMLRenderer = "loading HTML Renderer!"

function renderHTMLMenuObject (menuItem, menuItemImageSource){
    let listItem = document.createElement("li");

    let menuItemH2 = document.createElement("h2");
    let menuItemDescription = document.createElement("p");
    let menuItemPrice = document.createElement("p");
    let menuItemImage = new Image();
    menuItemImage.src = menuItemImageSource;
    menuItemImage.classList = "menu_item_image";    
    
    
    menuItemH2.textContent = menuItem.name;
    menuItemDescription.textContent = menuItem.description;
    menuItemPrice.textContent = menuItem.price;

    let myMenuItem = [];
    myMenuItem.push(menuItemH2);
    myMenuItem.push(menuItemDescription);
    myMenuItem.push(menuItemPrice);
    myMenuItem.push(menuItemImage);

    listItem.appendChild(menuItemH2);
    listItem.appendChild(menuItemDescription);
    listItem.appendChild(menuItemPrice);
    listItem.appendChild(menuItemImage);

    return listItem ;

}

function createHTMLelement_P(text){
    let myP = document.createElement("p");
    myP.innerText = text;
    
    return myP;
}

function createHTMLelement_H(text){
    let myH1 = document.createElement("h1");
    myH1.innerText = text;
    
    return myH1;
}

function createHTMLelement_DIV(styleclass){
    let myDIV = document.createElement("div");
    if (styleclass) {
        myDIV.classList = styleclass;
    }
    return myDIV;
}

function createHTMLelement_TABLE(styleclass){
    let myTable = document.createElement("table");
    if (styleclass) {
        myTable.classList = styleclass;
    }

    return myTable;
}

function createHTMLelement_TableCaption(captionText){
    let myCaption = document.createElement("caption");
    myCaption.innerText = captionText;
    return myCaption;
}

function createHTMLelement_TableHeaders(array_of_headers = []){
    let myTableHead = document.createElement("thead");
    let myTableHeadRow = document.createElement("tr");
    array_of_headers.forEach(header => {
        let myTableHeadRowHeader = document.createElement("th");
        myTableHeadRowHeader.innerText = header;
        myTableHeadRow.appendChild(myTableHeadRowHeader)
    })
    myTableHead.appendChild(myTableHeadRow);
    
    return myTableHead;
}

function createHTMLelement_TableBody(){
    let myTableBody = document.createElement("tbody");
    return myTableBody;
}

function createHTMLelement_TableRow(array_of_data){
    let myTableBodyRow = document.createElement("tr");
    array_of_data.forEach(data => {
        let myTableBodyRowData = document.createElement("td");
        myTableBodyRowData.innerText = data;
        myTableBodyRow.appendChild(myTableBodyRowData);
    })
    return myTableBodyRow;
}

function createHTMLelement_Button(text, fn, styleclass = undefined, img = undefined){
    const myButton = document.createElement("button");
    myButton.textContent = text;
    myButton.addEventListener("click",fn)
    if (styleclass) {
        myButton.classList += styleclass;
    }
    
    if(img){
        myButton.style.backgroundImage = `url(${img})`;
        //myButton.style.backgroundColor = "rgba(255, 166, 0, 0.5)";
        //myButton.style.backgroundBlendMode = "multiplty";
    }
    return myButton;
}

function createHTMLelement_Image(img, altText, width = undefined, height = undefined){
    const imgElement = document.createElement("img");
    imgElement.src = img;
    imgElement.alt = altText;
    if(width){
        imgElement.style.width = width;
    }
    if(height){
        imgElement.style.height = height;
    }
    return imgElement;
}

export { 
    createHTMLelement_DIV, 
    createHTMLelement_H, 
    createHTMLelement_P, 
    renderHTMLMenuObject,
    createHTMLelement_TABLE,
    createHTMLelement_TableCaption,
    createHTMLelement_TableHeaders,
    createHTMLelement_TableBody,
    createHTMLelement_TableRow,
    createHTMLelement_Button,
    createHTMLelement_Image,
    page_HTMLRenderer };