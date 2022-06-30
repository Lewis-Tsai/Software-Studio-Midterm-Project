const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

function initApp() {
    // Login with Email/Password
    var txtEmail = document.getElementById('inputEmail');
    var txtPassword = document.getElementById('inputPassword');
    var btnLogin = document.getElementById('btnLogin');
    var btnGoogle = document.getElementById('btngoogle');
    var btnSignUp = document.getElementById('btnSignUp');

    //database parameter
    var database = firebase.database();
    var profile_path = '';

    btnLogin.addEventListener('click', function() {
        /// TODO 2: Add email login button event
        ///         1. Get user input email and password to login
        ///         2. Back to index.html when login success
        ///         3. Show error message by "create_alert()" and clean input field

        firebase.auth().signInWithEmailAndPassword(txtEmail.value, txtPassword.value).then(function(result) {
            //upload profile data
            profile_path = txtEmail.value;
            profile_path = profile_path.replace('.', '_');
            //--------------------
            var ProfileRef = firebase.database().ref('profile/' + profile_path);
            ProfileRef.once('value', function(snapshot) {
                if(snapshot.val() == null){
                    console.log('no data');
                    database.ref(`profile/${profile_path}`).update({
                        email: txtEmail.value,
                        user_name: 'user',
                        age: '20',
                        occupation: 'student',
                        education: 'college',
                        country: 'Taiwan',
                        city: 'Hsinchu',
                        photoURL: 'https://firebasestorage.googleapis.com/\
                        v0/b/software-studio-mid-chatroom.appspot.com/o/\
                        profilePictures%2Ffigure-1.png?alt=media&token=\
                        5236297e-12c5-476c-a5e0-d4c28673466a'
                    })
                    .then(function () {
                        console.log("profile data upload success");
                        window.location.href = "load.html";
                    }).catch(function () {
                        alert("伺服器發生錯誤");
                    });
                }  
                else{
                    console.log('data exist');
                    window.location.href = "load.html";
                }
            });
            
            //return to index page
            //window.location.href = "index.html";
        }).catch(function(error) {
            txtEmail.value = "";
            txtPassword.value = "";
            alert(error);
        });
    });

    btnGoogle.addEventListener('click', function() {
        /// TODO 3: Add google login button event
        ///         1. Use popup function to login google
        ///         2. Back to index.html when login success
        ///         3. Show error message by "create_alert()"
        var provider = new firebase.auth.GoogleAuthProvider();
        // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        firebase.auth().signInWithPopup(provider).then(function(result) {

            var token = result.credential.accessToken;
            var user = result.user;
            //console.log(user);
            //console.log(user.email);
            var user_name = user.displayName;
            var user_email = user.email;
            var profile_path = user_email.replace('.', '_');
            var ProfileRef = firebase.database().ref('profile/' + profile_path);
            ProfileRef.once('value', function(snapshot) {
                if(snapshot.val() == null){
                    console.log('no data');
                    database.ref(`profile/${profile_path}`).update({
                        email: user_email,
                        user_name: user_name,
                        age: '20',
                        occupation: 'student',
                        education: 'college',
                        country: 'Taiwan',
                        city: 'Hsinchu',
                        photoURL: user.photoURL
                    })
                    .then(function () {
                        console.log("profile data upload success");
                        window.location.href = "load.html";
                    }).catch(function (error) {
                        alert(error.message);
                    });
                }  
                else{
                    console.log('data exist');
                    window.location.href = "load.html";
                }
            });
            //window.location.href = "index.html";
        }).catch(function(error) {
            alert(error.message);
        });


    });

    btnSignUp.addEventListener('click', function() {
        /// TODO 4: Add signup button event
        ///         1. Get user input email and password to signup
        ///         2. Show success message by "create_alert" and clean input field
        ///         3. Show error message by "create_alert" and clean input field
        console.log(txtEmail.value)
        console.log(txtPassword.value)
        firebase.auth().createUserWithEmailAndPassword(txtEmail.value, txtPassword.value).then(function(result) {
            txtEmail.value = "";
            txtPassword.value = "";
            alert("success");
        }).catch(function(error) {
            txtEmail.value = "";
            txtPassword.value = "";
            alert(error);
        });

    });
}

// Custom alert
function create_alert(type, message) {
    var alertarea = document.getElementById('custom-alert');
    if (type == "success") {
        str_html = "<div class='alert alert-success alert-dismissible fade show' role='alert'><strong>Success! </strong>" + message + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
        alertarea.innerHTML = str_html;
    } else if (type == "error") {
        str_html = "<div class='alert alert-danger alert-dismissible fade show' role='alert'><strong>Error! </strong>" + message + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
        alertarea.innerHTML = str_html;
    }
}

window.onload = function() {
    initApp();
};