let users = [];

/**
 * This function is to animat the start page
 */
function animationWindow() {
    setTimeout(function() {
        document.getElementById('joinLogoAnimation').classList.add('hidden');
    }, 1500)
}

/**
 * This function is to checkt for the rigth password 
 */
async function login() {
    users = Object.entries(await loadData('users'));
    let email = document.getElementById('email').value.toLowerCase();
    let password = document.getElementById('password').value;
    let user = users.find(u => u[1].mail == email && u[1].password == password);
    if (user) {
        saveUser(email);
        window.location.href = './summary.html';

    } else {
        document.getElementById('loginError').classList.remove('hidden');
        document.getElementById('passwordButten').classList.add('input-border');
    }
}

function saveUser(email) {
    let userMail = JSON.stringify(email);
    localStorage.setItem("userMail", userMail);
}

/**
 * Logs the user out by removing the 'userMail' item from local storage.
 */
function logout(){
    localStorage.removeItem('userMail');
}

/**
 * Checks if the user is logged in by verifying the presence of 'userMail' in local storage.
 */
function checkUser(){
    let userMail = localStorage.getItem('userMail');
    if (userMail === null) {
        window.location.href = './index.html';
    }
}

function changePassword() {
    document.getElementById('passwordButten').classList.add('password_container_border');
    document.getElementById('emailContainer').classList.remove('password_container_border');
    var x = document.getElementById("password");
    if (x.type === "password") {
        document.getElementById('passwordLock').classList.add('hidden');
        document.getElementById('unlock').classList.remove('hidden');
    } else {
        document.getElementById('passwordLock').classList.add('hidden');
        document.getElementById('unlock').classList.add('hidden');
    }
}

function changeEmail() {
    document.getElementById('emailContainer').classList.add('password_container_border');
    document.getElementById('passwordButten').classList.remove('password_container_border');
}

function togglePasswordVisibility() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
      document.getElementById('lock').classList.remove('hidden');
      document.getElementById('unlock').classList.add('hidden');
      
    } else {
      x.type = "password";
      document.getElementById('lock').classList.add('hidden');
      document.getElementById('unlock').classList.remove('hidden');
    }
  }