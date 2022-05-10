// FUNCTIONS FOR USER AUTHETICATION
// functions:
// signup(): signs up a new user using email and password.
// login(): validates an existing user's credentials and logs in the user.
// logout(): logs out the current user. Direct user back to landing page.


// sign up
function signup(){
  const signupForm = document.getElementById("signup");
  const submitButton = document.getElementById("submit");
  submitButton.addEventListener("click",(e) => {
    //e.preventDefault(); // delay form submission

    // get user info
    const email = document.querySelector('#signup-email').value;
    const password = document.querySelector('#signup-password').value;
    
    // if username or password is unsatifactory
    if(password.length < 6){
      alert("Invalid password: password must be more than 6 characters");
    }

    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then( cred => {
      window.location.href = '../html/setup.html';
      signupForm.reset();
      }).catch((error) => { 
        // send alert with error message if sign up fails
        alert(error.message)
      });
  })
}


// log in
function login(){
  // getting the html element
  const loginForm = document.getElementById('login');
  const loginButton = document.getElementById("login_button");
  loginButton.addEventListener('click', (e) => {
    //e.preventDefault(); // delay form submission

    // get user login info
    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;
    
    // log in using Firebase
    auth.signInWithEmailAndPassword(email, password).then(cred => {
      alert('logging in');
      window.location.href = '../html/dashboard.html';
      }).catch((error) => {
        // send alert with error message if log in fails
        alert(error.message)
      });
  })
}


// log out
function logout(){
  const logoutButton = document.getElementById('logout_button');
    logoutButton.addEventListener("click",(e) => {
    //e.preventDefault(); //delay form submission
    auth.signOut().then(()=>{
      window.location.href = '../index.html';
      });
    })
}