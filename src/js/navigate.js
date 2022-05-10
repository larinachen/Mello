// toggle open/close daily journal
let sidebar = document.getElementById("dailyJournal");
let sidebar_button = document.getElementById("sidebar_button");
document.getElementById("dailyJournal").style.display = "block";
document.getElementById("sidebar_button").innerHTML="<<";

function toggle_sidebar(){
    if(sidebar.style.display === "none"){
        console.log(sidebar_button.innerHTML);
        document.getElementById("sidebar_button").innerHTML="<<";
        sidebar.style.display = "block";
    }
    else{
        document.getElementById("sidebar_button").innerHTML=">>";
        sidebar.style.display = "none";
    }
}

// navigate between different sections in main
console.log(document.getElementById("entriesByDate"))
document.getElementById("entriesByDate").style.display = "flex";
document.getElementById("calendar").style.display = "none";
document.getElementById("guides").style.display = "none";
document.getElementById("game").style.display = "none";


function navigate(clicked_id){
    if(clicked_id=="entriesByDate_button"){
        document.getElementById("entriesByDate").style.display = "flex";
        document.getElementById("calendar").style.display = "none";
        document.getElementById("guides").style.display = "none";
        document.getElementById("game").style.display = "none";
    }
    if(clicked_id=="calendar_button"){
        document.getElementById("entriesByDate").style.display = "none";
        document.getElementById("calendar").style.display = "block";
        document.getElementById("guides").style.display = "none";
        document.getElementById("game").style.display = "none";
    }
    if(clicked_id=="guides_button"){
        document.getElementById("entriesByDate").style.display = "none";
        document.getElementById("calendar").style.display = "none";
        document.getElementById("guides").style.display = "block";
        document.getElementById("game").style.display = "none";
    }
    if(clicked_id=="game_button"){
        document.getElementById("entriesByDate").style.display = "none";
        document.getElementById("calendar").style.display = "none";
        document.getElementById("guides").style.display = "none";
        document.getElementById("game").style.display = "block";
    }
}

