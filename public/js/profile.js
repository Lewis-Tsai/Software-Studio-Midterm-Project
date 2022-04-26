function init() {
    var user_name, age, city, country, education, email, occupation;
    var user_img_src;
    var text_user_name = document.getElementById('text_user_name');
    var text_age = document.getElementById('text_user_name');
    var text_occu = document.getElementById('text_user_name');
    var text_edu = document.getElementById('text_user_name');
    var text_user_country = document.getElementById('text_user_name');
    var text_user_city = document.getElementById('text_user_name');
    //----------------------
    firebase.auth().onAuthStateChanged(function(fb_user) {
        if (fb_user) {
          // User is signed in.
          user = fb_user;
          console.log("login successfully");
        } else {
          // No user is signed in.
          user = null;
          console.log("login failed");
          window.location.href = "signin.html";
        }
    });
    //----------------------
    var profile_path;
    var database = firebase.database();
    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            email = user.email;
            profile_path = email;
            //console.log(email);
        
            profile_path = profile_path.replace('.', '_');
            var ProfileRef = firebase.database().ref('profile/' + profile_path);

            ProfileRef.on('value', function(data) {
                user_name = data.val().user_name;
                user_img_src = data.val().photoURL;
                document.getElementById('show_user').innerHTML = user_name;
                document.getElementById('show_user_email').innerHTML = email;
                document.getElementById('img_src').src = user_img_src;
            });
        }
        else
            alert('not logged in');
            
    });

    var submit_btn = document.getElementById('submit');

    submit_btn.addEventListener('click', function() {
        console.log(text_age.value);
        database.ref(`profile/${profile_path}`).update({
            user_name: text_user_name.value,
            age: text_age.value,
            occupation: text_occu.value,
            education: text_edu.value,
            country: text_user_country.value,
            city: text_user_city.value
        })
        .then(function () {
            console.log("profile user_name upload success");
            console.log(text_user_city.value);
            window.location.href = "index.html";
        }).catch(function () {
            alert("伺服器發生錯誤");
        });
    });

    //----------------------

    var upload = document.getElementById('upload');
    var fileInput = document.getElementById('fileInput');
    var uploader = document.getElementById('uploader');
    upload.addEventListener("click", fileInputClick, false);
    fileInput.addEventListener("change", handleImage, false);

    function fileInputClick(e) {
        fileInput.click();
        document.getElementsByTagName("body")[0].style.cursor = "pointer";
    }

    function handleImage(e){
        var file = e.target.files[0];
        if (!file) {
            console.log("No file selected");
        }
        //Create a Storage Ref
        var storageRef = firebase.storage().ref('profilePictures/' + profile_path +'/' + file.name);
        //Upload file
        var task = storageRef.put(file);

        //Update Progress Bar 
        task.on('state_changed', 
            function progress(snapshot){
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
                uploader.value = percentage;        
            },
            function error(err){
                alert(err.message);
            },
            function complete(){
                alert('profile picture uploaded successfully');
                uploader.value = 0;
                storageRef.getDownloadURL().then(function(url)                             {
                    // Once we have the download URL, we set it to our img element
                    //console.log(url);
                    database.ref(`profile/${profile_path}`).update({
                        photoURL: url
                    })
                    .then(function () {
                        console.log("profile photo update success");
                    }).catch(function (error) {
                        alert(error.message);
                    });
                }).catch(function(error) {
                    // If anything goes wrong while getting the download URL, log the error
                    alert(error.message);
                });
            }
        ); 
    }
    
}

window.onload = function() {
    init();
};
