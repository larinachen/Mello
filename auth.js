// listen for auth status changes
/*
auth.onAuthStateChanged(user => {
  if(user){
    alert(user);
    window.location.href = 'http://127.0.0.1:5500/dashboard.html';
  }
  else{
    alert(user);
    // window.location.href = 'http://127.0.0.1:5500/index.html';
  }
})
*/ 

//sign up
const signupform = document.getElementById("signup");
const submit_button = document.getElementById("submit");
submit_button.addEventListener("click",(e) => {
  e.preventDefault();
  // get user info
  const email = document.querySelector('#signup-email').value;
  const password = document.querySelector('#signup-password').value;
  // if username or password is unsatifactory
  if(password.length < 6){
      alert("Invalid password: password must be more than 6 characters");
  }
  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then( cred => {
    //console.log("signed up");
    window.location.href = 'http://127.0.0.1:5500/setup.html';
    signupform.reset();
  })
})

// log in


// log out script is contained in dashboard.html on its own