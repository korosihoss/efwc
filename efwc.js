// head section variables to perform action on
const searchIcon = document.getElementById("search-icon");
const hamburger= document.getElementById("hamburger");
const exitMenu = document.getElementById("cancelMenu");
const menuMain = document.querySelector(".menu-con-main");
const cancelSrch = document.getElementById("cancel-srch");
const searchInputMain = document.querySelector(".search-inpt-main");
let userTextToSearch = document.getElementById("inpt");

// Variables from Bible page
const recentBookUl = document.querySelector(".recent-ul");
const recentBookUlContainer = document.querySelector(".recent-ul-con");
const userEnteredBook = document.getElementById("book");
const userEnteredChapter = document.getElementById("chapter");
const userEnteredVerse = document.getElementById("verse");


//to display the search bar and focus it
searchIcon.onclick = function(){
    searchInputMain.style.display = 'flex';
    document.getElementById("inpt").focus();
}
//to not display the search bar
cancelSrch.onclick = function(){
    searchInputMain.style.display = 'none';
}

//display main menu using the hamburger 
hamburger.onclick = function(){
    menuMain.style.display = 'flex';
}
//Exit the menu using the cross
exitMenu.onclick = function(){
    menuMain.style.display = 'none';
}
//search hymn in the menu section 
function searchHymnInMenu(){
    menuMain.style.display = 'none';
    searchInputMain.style.display = 'flex';
    document.getElementById("inpt").focus();
}




// detecting user swipe to increase or decrease header height 
let startY;

    document.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', (e) => {
      const endY = e.changedTouches[0].clientY;
      const deltaY = endY - startY;

      // Adjust the threshold according to your needs
      const swipeThreshold = 50;

      if (deltaY > swipeThreshold) {
        // Swipe down action
        document.querySelector(".main-header").style.height = "7em";
      document.querySelector(".efwc-head").style.marginTop = "5.8em";
        // Add your custom action for swipe down
      } else if (deltaY < -swipeThreshold) {
        // Swipe up action
        document.querySelector(".main-header").style.height = "3em";
        document.querySelector(".efwc-head").style.marginTop = ".5em";
        // Add your custom action for swipe up
      }
 });
 
 function searchHymn(){
    
     //get user input value
     let userText = userTextToSearch.value;
     if(userText != ""){
         //adding and removing classes for changing
         //the x icon on cancelling search to a spinner
         cancelSrch.classList.remove("fa-xmark");
         cancelSrch.classList.add("fa-spinner");
         cancelSrch.classList.add("srch-anim");
         // replace space with %20
         let modifiedText = userText.replace(/\s/g, '%20');
         userTextToSearch.value = "";
         let hymnSite = "https://www.hymnal.net/en/search/all/all/";
         //go to site
         window.location.href = hymnSite + modifiedText;
     }
 }

//recent book tracker variable 
let recentVisit;
//initialize a web address variable
let webAddress;    
    
function getBible(recentBook){
    //Getting user values
    let bookOfBible = userEnteredBook.value.trim();
    let chapter = userEnteredChapter.value.trim();
    let verse = userEnteredVerse.value.trim();
    //capitalize the first letter of the book
    bookOfBible = bookOfBible.charAt(0).toUpperCase() + bookOfBible.slice(1);
    
    //check if Bible book string input field is not empty
    if(bookOfBible === ""){
    // display a warning text
        document.querySelector('.warning-txt').style.visibility = "visible";
        
       // make warning text go away 
        setTimeout(()=> {
            document.querySelector('.warning-txt').style.visibility = "hidden";
        }, 5000)
        
    }else if(chapter === ""){
    // check if chapter is empty 
        webAddress = `https://kingjames.bible/#${bookOfBible}`;
        //save recent and go to site 
       recentVisit = `${bookOfBible}`;
        window.location.href = webAddress;
        getRecent();
    }
    else if(verse === ""){
    //check if verse is empty
        webAddress = `https://kingjames.bible/${bookOfBible}-${chapter}`;
        //save recent and go to site.
        recentVisit = `${bookOfBible}  ${chapter}`
        window.location.href = webAddress;
        getRecent();
    }
    else if(chapter === "" && verse === ""){
        //check if chapter and verse are empty 
        webAddress = `https://kingjames.bible/#${bookOfBible}`;
        // save recent and go to site
        recentVisit = `${bookOfBible}`
        window.location.href = webAddress;
        getRecent();
    }
    else{
        //all the requirement is met
        webAddress = `https://kingjames.bible/${bookOfBible}-${chapter}#${verse}`
        // save recent and go to site
        recentVisit = `${bookOfBible}  ${chapter} : ${verse}`
        getRecent();
        window.location.href = webAddress;
        
    }
}

function saveRecentToLocStorage(){
    //stored the ul inner context
    localStorage.setItem("storedUl", JSON.stringify(recentBookUl.innerHTML));
}

function getRecent(){
    //check value of recent variable if not undefined
    if(recentVisit !== undefined){
    //create an li element 
        let recentLi = document.createElement("li");
        recentLi.textContent = recentVisit;
        //use web address above to attach it to
        //every li created by its attribute
        recentLi.setAttribute("onclick", "window.location.href = ' "+ webAddress+"'");
        //append. my li element from the top 
        recentBookUl.insertBefore(recentLi, recentBookUl.firstChild);

        var lastListItem = recentBookUl.lastElementChild; // Get the last <li> element
        var lastIndex = Array.prototype.indexOf.call(recentBookUl.children, lastListItem);
        //make a limited recent list by removing the last
        if(lastIndex == 5){
            recentBookUl.removeChild(recentBookUl.lastChild);
        }
        saveRecentToLocStorage();
    }
}

//get stored values
if(recentBookUl){
    recentBookUl.innerHTML = JSON.parse(localStorage.getItem("storedUl"));
    
}


// Feedback page

let feedbackForm = document.getElementById("feedbackForm");

if(feedbackForm){
    feedbackForm.addEventListener('click', function(event){
    event.preventDefault();
    
    document.getElementById("serverStatus").style.visibility = "visible";
    setTimeout(function(){
        document.getElementById("serverStatus").style.visibility = "hidden";
        
    }, 5000)
    
});
}
