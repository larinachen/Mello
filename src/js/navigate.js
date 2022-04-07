// toggle sidebar
let sidebar = document.getElementById("today");
let sidebar_button = document.getElementById("sidebar_button");
document.getElementById("today").style.display = "none";

function toggle_sidebar(){
    if(sidebar.style.display == "none"){
        console.log(sidebar_button.innerHTML);
        document.getElementById("sidebar_button").innerHTML="<<";
        sidebar.style.display = "block";
    }
    else{
        console.log("hi")
        document.getElementById("sidebar_button").innerHTML=">>";
        sidebar.style.display = "none";
    }
}

// navigate between different sections in main
document.getElementById("vision_board").style.display = "flex";
document.getElementById("calendar").style.display = "none";
document.getElementById("guides").style.display = "none";
document.getElementById("game").style.display = "none";


function navigate(clicked_id){
    if(clicked_id=="vision_board_button"){
        document.getElementById("vision_board").style.display = "flex";
        document.getElementById("calendar").style.display = "none";
        document.getElementById("guides").style.display = "none";
        document.getElementById("game").style.display = "none";
    }
    if(clicked_id=="calendar_button"){
        document.getElementById("vision_board").style.display = "none";
        document.getElementById("calendar").style.display = "block";
        document.getElementById("guides").style.display = "none";
        document.getElementById("game").style.display = "none";
    }
    if(clicked_id=="guides_button"){
        document.getElementById("vision_board").style.display = "none";
        document.getElementById("calendar").style.display = "none";
        document.getElementById("guides").style.display = "block";
        document.getElementById("game").style.display = "none";
    }
    if(clicked_id=="game_button"){
        document.getElementById("vision_board").style.display = "none";
        document.getElementById("calendar").style.display = "none";
        document.getElementById("guides").style.display = "none";
        document.getElementById("game").style.display = "block";
    }
}

// navigates between different boards in My Boards
let list_of_titles = ["Physical Health", "Work Ethics", "Self Compassion"]; // list of str, strs are titles of boards
let list_of_boards = ["area1_boards","area2_boards","area3_boards"]

document.getElementById("area1_boards").style.display = "grid";
document.getElementById("area2_boards").style.display = "none";
document.getElementById("area3_boards").style.display = "none";


function switch_board(board){
    let str = board+"_boards"
    let current_board =  document.getElementById(str);
    current_board.style.display = "grid";
    document.getElementById(board).style.borderColor = "rgb(194,123,104)"
    for(i=1; i<=list_of_boards.length; i++){
        let str = list_of_boards[i-1];
        let temp = document.getElementById(str);
        if(document.getElementById(str).innerHTML !== current_board.innerHTML){
            temp.style.display = "none";
            num = i.toString();
            document.getElementById("area"+num).style.borderColor = "rgb(235,235,235)"
            console.log("not this one")
        }
    }
}
