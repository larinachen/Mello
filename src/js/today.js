// get the currently signed-in user
let uid = "default";
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      uid = user.uid;
      show_existing();
      //alert(uid);
    } else {
      //alert('You are not signed in');
      window.location.href = 'http://127.0.0.1:5500/index.html';
    }
  });

// get current date
let date = new Date();
date_str =date.getDate() + "/ " + (date.getMonth()+1) + "/ " +date.getFullYear();
date_title = document.getElementById('date');
date_title.innerHTML=date_str;
// grab elements
const today = document.getElementById('today');
const scrollable = document.getElementById('scrollable');

// SHOW_EXISTING: upon loading, gets all items of the current user of today and show on list
function show_existing(){
    scrollable.innerHTML = "";
    // gets all goals of the current user of today and show on list
    db.collection("user_data").doc(uid).collection("goal").where("date", "==", date_str).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let goal = (doc.id, " => ", doc.data());
            let goal_text = goal["goal"];
            let goal_category = goal["category"];
            
            // create a new container on the page and add to list
            let new_container = document.createElement("div");
            new_container.innerHTML = goal_text + "\n" + goal_category;
            if(goal["type"]=="Goal"){
                new_container.setAttribute("class", "goal_container");
            }
            if(goal["type"]=="Achievement"){
                new_container.setAttribute("class", "achievement_container");
            }
            if(goal["type"]=="Note"){
                new_container.setAttribute("class", "note_container");
            }
            scrollable.appendChild(new_container);
            delete_close()
            add_close_button()
        });
    });
    
}

// ADD_GOAL: when "add" button is clicked, create a goal/achievement/note -> store in Firestore -> show on list
function add_goal(){
    input_box = document.getElementById("input_box");
    input_category = document.getElementById("input_category");
    input_box_value = input_box.value;
    input_category_value = input_category.value;
    type = document.getElementById("type").value;
    if(input_box_value.length !=0){
        db.collection('user_data').doc(uid).collection('goal').doc(input_box_value).set({
            goal: input_box_value,
            category: input_category_value,
            date: date_str,
            type: type
        }).then(()=>{
            //show_existing();
        }).catch((error) => {
            alert(error);
        })
    }
    //show_existing();
    update_add_goal();
    
}

// UPDATE_ADD_GOAL: HELPER TO ADD_GOAL when "add" button is clicked, add the new item to list
function update_add_goal(){
    let str = document.getElementById('input_box').value;
    //let str="hi-friend";
    let new_container = db.collection("user_data").doc(uid).collection("goal").doc(str);
    new_container.get().then((doc) => {
        if (doc.exists) {
            let goal = doc.data();
            let goal_text = goal["goal"];
            let goal_category = goal["category"];
            // append new goal to list
            let new_container = document.createElement("div");
            new_container.innerHTML = goal_text + "\n" + goal_category;
            if(goal["type"]=="Goal"){
                new_container.setAttribute("class", "goal_container");
            }
            if(goal["type"]=="Achievement"){
                new_container.setAttribute("class", "achievment_container");
            }
            if(goal["type"]=="Note"){
                new_container.setAttribute("class", "note_container");
            }
            scrollable.appendChild(new_container);
            delete_close();
            add_close_button();
        } else {
            // doc.data() will be undefined in this case
            //alert("No such document!");
        }
    }).catch((error) => {
        alert("Error getting document:", error);
    });
}

// add a close button
function add_close_button(){
    delete_close();
    var myNodelist = document.getElementsByClassName("goal_container");
    var i;
for (i = 0; i < myNodelist.length; i++) {
    // delete ie. "cross"
  var span1 = document.createElement("SPAN");
  var cross = document.createTextNode("\u00D7");
  span1.className = "close";
  span1.appendChild(cross);
  myNodelist[i].appendChild(span1);
  // complete ie. "check"
  
  var span2 = document.createElement("SPAN");
  var check = document.createTextNode('&#10003;');
  span2.className = "complete";
  span2.appendChild(check);
  myNodelist[i].appendChild(span2);
  
}
}
// delete all close buttons
function delete_close(){
    var cross = document.getElementsByClassName("close");
    //var check = document.getElementsByClassName("complete");
    for (i = 0; i < cross.length; i++) {
        cross[i].style.display = "none";
        //check[i].style.display = "none";
      }
}
// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}


// DELETE_OLD_GOALS: deletes goals from previous dates in cloud Firestore
function delete_old_goals(){
    db.collection("user_data").doc(uid).collection("goal").doc("drinks").delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}


delete_old_goals();


// ADD_ITEM: add new board into My Boards
function add_item(board){
    let txt = prompt("What's do you want to add?","Reminder: you can do this!");
    let str = board+"_boards"
    let current_board =  document.getElementById(str);
    let new_board = document.createElement("div");
    new_board.setAttribute("class", "grid-item");
    new_board.innerHTML= txt;
    current_board.appendChild(new_board);
    // move add button to the end again
    let add = document.getElementById(board+ "_add_button");
    add.style.display = "none";
    let add_button = document.createElement("div");
    add_button.innerHTML = "+";
    add_button.setAttribute("class", "add-item")
    current_board.appendChild(add_button);
}

let list = document.getElementsByClassName("grid-item");