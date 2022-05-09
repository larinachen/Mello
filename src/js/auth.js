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

// sign up
function signup(){
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
  try{
    auth.createUserWithEmailAndPassword(email, password).then( cred => {
      window.location.href = '../html/setup.html';
      signupform.reset();
      })
  }
  catch(error){
    alert(error)
  }
  })
}


// log in
function login(){
  // getting the html element
  const loginform = document.getElementById('login');
  const login_button = document.getElementById("login_button");
  loginform.addEventListener('click', (e) => {
  e.preventDefault();

  // get user login info
  const email = document.querySelector('#login-email').value;
  const password = document.querySelector('#login-password').value;
  
  // log in using Firebase
  auth.signInWithEmailAndPassword(email, password).then(cred => {
    alert('logging in');
    window.location.href = '../html/dashboard.html';
    signupform.reset();
    });
  })
}


// log out
function logout(){
  const logout_button = document.getElementById('logout_button');
    logout_button.addEventListener("click",(e) => {
    e.preventDefault();
    auth.signOut().then(()=>{
      window.location.href = 'https://www.technologyreview.com/2022/04/19/1049378/ai-inequality-problem/';
      })
    })
}