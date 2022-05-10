


// **************** DAILY JOURNAL FUNCTIONS ******************

// ---------------- Miscilaneous Utilities ----------------------
// grab things that need to be loaded first

// 1. grab key elements
const dailyJournal = document.getElementById('dailyJournal');
const scrollable = document.getElementById('scrollable');

// 2. initialize board visibilities
const board1 = document.getElementById("area1_boards")
board1.style.display = "grid";
const board2 = document.getElementById("area2_boards")
board2.style.display = "none";
const board3 = document.getElementById("area3_boards")
board3.style.display = "none";
// grab key navigation elements
let list_of_titles = ["MentalHealth", "PhysicalHealth", "Productivity"]; // list of str, strs are titles of boards
let list_of_boards = [board1,board2,board3]

// 3. double-check that the user is indeed logged in and 
// get the user id (uid) of the currently signed-in user 
let uid = "default";
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      uid = user.uid;
      showExisting();
    } else {
      window.location.href = '../index.html';
    }
});

// 4. get current date to display on top of journal
let date = new Date();
date_str =date.getDate() + "/ " + (date.getMonth()+1) + "/ " +date.getFullYear();
date_title = document.getElementById('date');
date_title.innerHTML=date_str;


// ------------------------ GET, POST, DELETE, UPDATE  ----------------------------
// ** DELETE and UPDATE need bug fixing

// GET
// showExisting(): upon loading, gets all items (goal, achievement, note) the current user
// has logged into the database today and display on the journal page
function showExisting(){
    scrollable.innerHTML = "";
    // gets all entries of the current user of today and display them
    db.collection("user_data").doc(uid).collection("goal").where("date", "==", date_str).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => { 
            // doc.data() is never undefined for Firebase query doc snapshots
            let entry = doc.data();
            // calls helper function that displays the entry on UI
            displayEntry(entry, scrollable);
        });
    });   
}

// POST
// addEntry(): when "add" button is clicked, create a goal/achievement/note -> store in Firestore -> show on list
function addEntry(){
    // gets the information of this new entry from database
    input_box = document.getElementById("inputBox");
    input_box_value = input_box.value;
    typeSelected = document.getElementById("type").value;
    categorySelected = document.getElementById("category").value;
        db.collection('user_data').doc(uid).collection('goal').doc(input_box_value).set({
            goal: input_box_value,
            category: categorySelected,
            date: date_str,
            type: typeSelected
        }).then(()=>{
            console.log("added entry to database")
            // new entry can be uniquely identified using the value in the input box
            let str = document.getElementById('inputBox').value; 
            let newEntry = db.collection("user_data").doc(uid).collection("goal").doc(str);
            newEntry.get().then((doc) => {
                // calls helper function that displays the entry on the UI
                let entry = doc.data();
                displayEntry(entry, scrollable);  
            });
    
        }).catch((error) => {
            alert(error);
        })
    
}

// (helper function)
// displayEntry(entry): displays entry on the client interface
function displayEntry(entry, location){

    // let entry = doc.data();
    let entry_text = entry["goal"];
    let entry_category = entry["category"];
    // append new goal to list
    let new_container = document.createElement("div");
    new_container.innerHTML = entry_text + "  (" + entry_category + ") \n";
    if(entry["type"]=="Goal"){
        new_container.setAttribute("class", "goal_container");
        new_container.innerHTML += "<span class='deleteButton'> done <span> ";
        new_container.innerHTML += "<span class='doneButton'> delete <span> ";
    }
    if(entry["type"]=="Achievement"){
        new_container.setAttribute("class", "achievement_container");
    }
    if(entry["type"]=="Note"){
        new_container.setAttribute("class", "note_container");
    }
    location.appendChild(new_container);

}

// DELETE
// deleteEntry(): deletes the entry
// TODO: use Firebase's method to delete the entry via a DELETE request
document.querySelector(".deleteButton").addEventListener('click', deleteGoal(this));
function deleteGoal(b){
    let goal = b.parentElement;
    goal.style.display = "none";

    //** in-progress - need bug fixing
    db.collection("user_data").doc(uid).collection("goal").doc("goal", "===", b.innerHTML).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}

// PATCH
// completeGoal(): mark goal as complete
function completeGoal(){
    let goal = b.parentElement;
    goal.className = "achievement_container";

    // TODO: use Firebase's method to change the type of the entry from goal to 
    // achievement via a PATCH request
}





// **************** HISTORICAL JOURNAL FUNCTIONS ******************
// organize all past entries by category

// switch_board(board): displays only entries of the chosen category
function switch_board(board){
    // get correct board and set style to show that the board has been selected  
    board1.style.display = "none";
    board2.style.display = "none";
    board3.style.display = "none";

    // only display entries of the chose category
    if (board==='area1'){
        list_of_boards[0].style.display = "grid";
        showBoardByCat(0) // Mental health entries
        
    }else if (board==='area2'){
        list_of_boards[1].style.display = "grid";
        console.log(list_of_boards[1])
        showBoardByCat(1) // Physical health entries
        
    }else{
        list_of_boards[2].style.display = "grid";
        showBoardByCat(2) // Productivity entries
        
    }
    
}

// (helper)
// showBoardbyCat: helper to switch_board. get eligible entries from database
function showBoardByCat(boardNum){
    list_of_boards[boardNum].innerHTML = "";
    category = list_of_titles[boardNum]
    
    // gets all entries of the current user of today and display them
    db.collection("user_data").doc(uid).collection("goal").where("category", "==", category).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => { 
            // doc.data() is never undefined for Firebase query doc snapshots
            let entry = doc.data();
            // calls helper function that displays the entry on UI
            displayEntry(entry,list_of_boards[boardNum]);
        });
    }); 
}