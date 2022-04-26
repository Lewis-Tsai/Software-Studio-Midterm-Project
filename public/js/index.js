var database = firebase.database();
var profile_path;

function init() {
    //user parameters
    var user_email = '';
    var user_name = 'user';
    var user;
    var user_img_src;
    //----------------------
    var auth_chatrm = [];
    //database parameters
    var Ref = firebase.database().ref('com_list');
    var postsRef = firebase.database().ref('com_list');
    var current_chatroom = 0;

    firebase.auth().onAuthStateChanged(function(fb_user) {
        if (fb_user) {
          // User is signed in.
          user = fb_user;
          console.log("login successfully");
        } else {
          // No user is signed in.
          user = null;
          console.log("login failed");
        }
    });

    firebase.auth().onAuthStateChanged(function(user) {
        var panel = document.getElementById('dynamic_panel');
        // Check user login
        if (user) {
            user_email = user.email;
            
            panel.innerHTML = "<a class='nav-link' href='profile.html'>Profile</a>";
            var ButtonData = '<button type="button" id="logout-btn" class="btn btn-danger">Logout</button>';
            document.getElementById('search_block').insertAdjacentHTML('afterbegin', ButtonData);
            
            //user info block
            profile_path = user_email;
            profile_path = profile_path.replace('.', '_');
            var ProfileRef = firebase.database().ref('profile/' + profile_path);
            
            ProfileRef.once('value')
            .then(function(snapshot) {
                //console.log(snapshot.val());
                user_name = snapshot.val().user_name;
                document.getElementById('show_user_info1').innerHTML = user_name;
                user_img_src = snapshot.val().photoURL;
                //console.log(typeof(user_img_src));
                var user_img_HTML = '<img src="' + user_img_src +'" class="rounded-circle user_img">';
                document.getElementById('show_user_img').innerHTML = user_img_HTML;
            })
            .catch(e => console.log(e.message));
            //--------------------
            //var result = user_img_src.replace('s96-c', 's400-c');
            //var user_img_HTML = '<img src="' + result +'" class="rounded-circle user_img">';
            //document.getElementById('show_user_img').innerHTML = user_img_HTML;
            document.getElementById('show_user_info2').innerHTML = user_email;
            //-------------------------
            //load chatroom content
            var chtrm_name_Ref = firebase.database().ref('profile/' + profile_path + '/chatroom_available/');
            var chtrm_name_first_count = 0;
            var chtrm_name_second_count = 0;
            var total_chtrm_name = [];
            
            chtrm_name_Ref.once('value')
            .then(function(snapshot) {
                if(user != null){
                    snapshot.forEach(function(childshot) {
                        var childData = childshot.val();
                        var divData;
                        divData = '<button type="button" class="list-group-item list-group-item-action " style="background-color:#404040;" id="' + childData.chatroom_idx + '">\n' +
                        '               <div class="media "><img src="../img/chatroom_icon.png" alt="user" width="50" class="rounded-circle">\n' +
                        '                   <div class="media-body ml-4">\n' +
                        '                       <div class="d-flex align-items-center justify-content-between mb-1">\n' +
                        '                           <h6 class="mb-3" style="color:azure">' + childData.chatroom_name + '</h6>\n' +
                        '                       </div>\n' +
                        '                   </div>\n' +
                        '               </div>\n' +
                        '          </button>';
                        total_chtrm_name[total_chtrm_name.length] = divData;
                        //tmp_array_1.push(childData.chatroom_idx);
                        chtrm_name_first_count += 1
                    });
    
    
                    document.getElementById('self_add_chatroom_content').innerHTML = total_chtrm_name.join('');
                    
    
                    chtrm_name_Ref.on('child_added', function(data) {
                        chtrm_name_second_count += 1;
                        if (chtrm_name_second_count > chtrm_name_first_count) {
                            var childData = data.val();
                            
                            //total_post[total_post.length] = str_before_username + childData.email + "</strong>" + childData.data + str_after_content
                            //document.getElementById('post_list').innerHTML = total_post.join('');
                            var divData = '<button type="button" class="list-group-item list-group-item-action " style="background-color:#404040;" id="' + childData.chatroom_idx + '">\n' +
                            '               <div class="media "><img src="../img/chatroom_icon.png" alt="user" width="50" class="rounded-circle">\n' +
                            '                   <div class="media-body ml-4">\n' +
                            '                       <div class="d-flex align-items-center justify-content-between mb-1">\n' +
                            '                           <h6 class="mb-3" style="color:azure">' + childData.chatroom_name + '</h6>\n' +
                            '                       </div>\n' +
                            '                   </div>\n' +
                            '               </div>\n' +
                            '          </button>';
                            total_chtrm_name[total_chtrm_name.length] = divData;
                            
                            document.getElementById('self_add_chatroom_content').innerHTML = total_chtrm_name.join('');
                        }
                    });
                }
                else{
                    console.log("can't upload or update mseeage due to user is not logged in");
                }
            }).catch(e => console.log(e.message));
            //-------------------------
            //initialize auth_chtrm
            var chtrm_data_Ref = firebase.database().ref('chatroom_data');
            chtrm_data_Ref.once('value')
            .then(function(snapshot) {
                var chatroom_amount = snapshot.val().amount;
                for(var i=0;i<=chatroom_amount;i++)
                    auth_chatrm.push(i);
                //console.log(auth_chatrm);
            }).catch(e => console.log(e.message));
            //-------------------------
            //load chatroom content
            load_chtrm_content();

            //---------------------------
            /// TODO 5: Complete logout button event
            ///         1. Add a listener to logout button 
            ///         2. Show alert when logout success or error (use "then & catch" syntex)
            var logoutbtn = document.getElementById('logout-btn');
            logoutbtn.addEventListener("click", function() {
                firebase.auth().signOut().then(function() {
                    alert("User sign out success!");
                }).catch(function(error) {
                    alert("User sign out failed!");
                })
            }, false);

        } else {
            // It won't show any post if not login
            //menu.innerHTML = "<a class='dropdown-item' href='signin.html'>Login</a>";
            var user_img_HTML = '<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img">';
            panel.innerHTML = "<a class='nav-link' href='signin.html'>Login</a>";
            document.getElementById('search_block').innerHTML = "";
            document.getElementById('bodyContent').innerHTML = "";
            document.getElementById('self_add_chatroom_content').innerHTML = "";
            document.getElementById('show_user_img').innerHTML = user_img_HTML;
            document.getElementById('show_user_info1').innerHTML = 'Winnie';
            document.getElementById('show_user_info2').innerHTML = 'pounding_hard@nthu';
        }
    });

    document.addEventListener('click',function(e){
        if(e.target){
            //console.log(e.target.id);
            if(e.target.id == '' || e.target.id == 'message' || e.target.id == 'invite_chtrm'
             || e.target.id == 'create_chtrm' || e.target.id == 'logout-btn' || e.target.id == 'attach'
               || e.target.id == 'submit')
                console.log('id didnt trigger event listener');
            else if(!isNaN(e.target.id)){
                var tmp_num = Number(e.target.id);
                alert("you have successfully changed chatroom");
                document.getElementById('bodyContent').innerHTML = "";
                if(auth_chatrm.includes(tmp_num)){
                    if(tmp_num == 0){
                        Ref = firebase.database().ref('com_list');
                        postsRef = firebase.database().ref('com_list');
                        current_chatroom = 0;
                    }else{
                        Ref = firebase.database().ref(tmp_num + '/com_list');
                        postsRef = firebase.database().ref(tmp_num + '/com_list');
                        current_chatroom = tmp_num;
                    }
                    load_chtrm_content();   
                }
            }else{
                console.log('id uncaught error');
            }
        }
    });

    //create chatroom panel
    create_chtrm_btm = document.getElementById('create_chtrm');
    create_chtrm_btm.addEventListener('click', function() {
        if(user != null){
            //get current chat room amount
            
            var chatroom_amount;
            var user_current_chtrm_list;
            var chtrm_data_Ref = firebase.database().ref('chatroom_data');
            chtrm_data_Ref.once('value')
            .then(function(snapshot) {
                chatroom_amount = snapshot.val().amount;
                chatroom_amount = chatroom_amount + 1;
                auth_chatrm.push(chatroom_amount);
                
                database.ref(`chatroom_data`).set({
                    amount: chatroom_amount
                })
                .then(function () {
                    console.log("profile data upload success");

                    //determine the name of the new chatroom
                    var new_chatroom_name = prompt("Name of The New Chatroom ");
                    
                    database.ref(`profile/${profile_path}/chatroom_available/${chatroom_amount}`).update({
                        chatroom_name: new_chatroom_name,
                        chatroom_idx: chatroom_amount
                    })
                    .then(function () {
                        console.log("profile data upload success");
                    }).catch(e => console.log(e.message));
                }).catch(e => console.log(e.message));
            }).catch(e => console.log(e.message));
        }
        else{
            alert("can't create chatroom due to user not login");
        }
    });
    //----------------------------------------------------
    //Chrome notification
    document.addEventListener('DOMContentLoaded', function() {
        if (!Notification) {
            alert('Desktop notifications not available in your browser. Try Chromium.');
            return;
        }
       
        if (Notification.permission !== 'granted')
            Notification.requestPermission();
    });
       
    function notifyMe() {
        if (Notification.permission !== 'granted')
            Notification.requestPermission();
        else {
            var notification = new Notification('Chatroom Notification', {
                icon: '../img/notification.png',
                body: 'You have successfully added a member to this chatroom',
            });
            notification.onclick = function() {
                window.open('https://software-studio-mid-chatroom.web.app/');
            };
        }
    }
    
    //----------------------------------------------------

    //invite chatroom panel
    invite_chtrm_btm = document.getElementById('invite_chtrm');
    invite_chtrm_btm.addEventListener('click', function() {
        if(current_chatroom == 0)
            alert("🚫can't join new member to public chatroom");
        else{
            var new_user_email = prompt("Add user's email ✉");
            var tmp_profile_path = new_user_email.replace('.', '_');
            var tmp_chtrm_idx;
            var tmp_chtrm_name;
            //get currenct chatroom information
            var chtrm_info_Ref = firebase.database().ref('profile/' + profile_path + '/chatroom_available/' + current_chatroom);
            
            chtrm_info_Ref.once('value')
            .then(function(snapshot) {
                tmp_chtrm_idx = snapshot.val().chatroom_idx;
                tmp_chtrm_name = snapshot.val().chatroom_name;
                
                //update chatroom authority to new user
                database.ref(`profile/${tmp_profile_path}/chatroom_available/${current_chatroom}`).update({
                    chatroom_name: tmp_chtrm_name,
                    chatroom_idx: tmp_chtrm_idx
                })
                .then(function () {
                    console.log("profile data upload success");
                    notifyMe();
                }).catch(e => alert(e.message));
            })
            .catch(e => console.log(e.message));
        }
    });
    //--------------------------------------------------------
    //list item handler
    document.getElementById('li_1').addEventListener('click', function() {
        list_item_handler('profile');
    });
    document.getElementById('li_3').addEventListener('click', function() {
        list_item_handler('add');
    });
    document.getElementById('li_4').addEventListener('click', function() {
        list_item_handler('block');
    });
    
    function list_item_handler(operation){
        if(user!=null){
            if(operation == 'add')
                invite_chtrm_btm.click();
            else if(operation == 'profile')
                window.location.href = "profile.html";
            else if(operation == 'block')
                block();
            else
                console.log('uncaught operation');
        }
        else
            alert('Please login first');
    }

    function block(){
        if(current_chatroom == 0)
            alert("🚫can't block user from public chatroom");
        else{
            var blocked_user_email = prompt("The email of the user you want to block from this chatroom ✉");
            var blocked_user__profile_path = blocked_user_email.replace('.', '_');
            var adaRef = firebase.database().ref('profile/' + blocked_user__profile_path + '/chatroom_available/' + current_chatroom);
            adaRef.remove()
            .then(function() {
                alert("🈲 Block succeeded.")
            })
            .catch(e => console.log(e.message));
        }
    }
    
    //--------------------------------------------------------

    post_btn = document.getElementById('submit');
    post_txt = document.getElementById('message');

    post_btn.addEventListener('click', function() {
        if (post_txt.value != "") {
            /// TODO 6: Push the post to database's "com_list" node
            ///         1. Get the reference of "com_list"
            ///         2. Push user email and post data
            ///         3. Clear text field
            if(user != null){
                var html_result = isHTML(post_txt.value);
                var detect = false;
                var new_str = '';
                var data;
                if(html_result){
                    for(var i=0;i<post_txt.value.length;i++){
                        if(post_txt.value[i] == '<')
                            detect = true;
                        else if(post_txt.value[i] == '>')
                            detect = false;
                        else{
                            if(!detect)
                                new_str += post_txt.value[i];
                        }
                    }
                    
                    data = {
                        data: new_str,
                        email: user_email,
                        name: user_name,
                        photoURL: user_img_src,
                        type: 'text'
                    };
                }
                else{
                    data = {
                        data: post_txt.value,
                        email: user_email,
                        name: user_name,
                        photoURL: user_img_src,
                        type: 'text'
                    };
                }
                Ref.push(data);
                post_txt.value = "";
            }
            else{
                alert("can't post message due to user not login");
                post_txt.value = "";
            }
        }
    });

    //deal with problems when sending code
    function isHTML(str) {
        var a = document.createElement('div');
        a.innerHTML = str;
      
        for (var c = a.childNodes, i = c.length; i--; ) {
            if (c[i].nodeType == 1) return true; 
        }
      
        return false;
    }

    //send image and video
    var upload = document.getElementById('attach');
    var fileInput = document.getElementById('fileInput');
    upload.addEventListener("click", fileInputClick, false);
    fileInput.addEventListener("change", handleImage, false);

    function fileInputClick(e) {
        if(user != null){
            fileInput.click();
            document.getElementsByTagName("body")[0].style.cursor = "pointer";
        }
        else
            alert('Please login first');
    }

    function handleImage(e){
        var file = e.target.files[0];
        var tmp_type;
        if (!file) {
            console.log("No file selected");
        }
        if(file.type.match('image.*'))
            tmp_type = 'image';
        else if(file.type.match('video.*'))
            tmp_type = 'video';
        else{
            alert("only allows image or video");
            return;
        }
          
        //Create a Storage Ref
        var storageRef = firebase.storage().ref(current_chatroom + '/attachments' +'/' + file.name);
        //Upload file
        var task = storageRef.put(file);

        //Update Progress Bar 
        task.on('state_changed', 
            function progress(snapshot){

            },
            function error(err){
                alert(err.message);
            },
            function complete(){
                alert('attachment uploaded successfully');
                storageRef.getDownloadURL().then(function(url)                             {
                    // Once we have the download URL, we set it to our img element
                    
                    var data = {
                        data: url,
                        email: user_email,
                        name: user_name,
                        photoURL: user_img_src,
                        type: tmp_type
                    };
                    Ref.push(data);
                }).catch(function(error) {
                    // If anything goes wrong while getting the download URL, log the error
                    alert(error.message);
                });
            }
        ); 
    }

    //--------------------------------------------------------

    //load chatroom HTML content
    function load_chtrm_content(){
        // List for store posts html
        var total_post = [];
        // Counter for checking history post update complete
        var first_count = 0;
        // Counter for checking when to update new post
        var second_count = 0;
        postsRef.once('value')
        .then(function(snapshot) {
            /// TODO 7: Get all history posts when the web page is loaded and add listener to update new post
            ///         1. Get all history post and push to a list (str_before_username + email + </strong> + data + str_after_content)
            ///         2. Join all post in list to html in once
            ///         4. Add listener for update the new post
            ///         5. Push new post's html to a list
            ///         6. Re-join all post in list to html when update
            ///
            ///         Hint: When history post count is less then new post count, update the new and refresh html
            if(user != null){
                snapshot.forEach(function(childshot) {
                    var childData = childshot.val();
                    var divData;
                    //total_post[total_post.length] = str_before_username + childData.email + "</strong>" /+ childData.data + str_after_content;
                    if(childData.email == user_email){
                        if(childData.type == 'text'){
                            divData = '<div class="d-flex justify-content-end mb-4">\n' +
                            '               <div class="msg_cotainer_send" id="sendDiv" style="font-size:17px">\n' +
                            '               '+ childData.name +'<br>' +  childData.data +
                            '               </div>\n' +
                            '               <div class="img_cont_msg">\n' +
                            '                   <img src="' + user_img_src + '"\n' +
                            '                   class="rounded-circle user_img_msg">\n' +
                            '               </div>\n' +
                            '          </div>';
                        }
                        else if(childData.type == 'image'){
                            divData = '<div class="d-flex justify-content-end mb-4">\n' +
                            '               <div class="msg_cotainer_send" id="sendDiv" style="font-size:17px">\n' +
                            '               '+ childData.name +'<br>' +
                            '                   <img src="' + childData.data + '" width="240" height="180">\n' +
                            '               </div>\n' +
                            '               <div class="img_cont_msg">\n' +
                            '                   <img src="' + user_img_src + '"\n' +
                            '                   class="rounded-circle user_img_msg">\n' +
                            '               </div>\n' +
                            '          </div>';
                        }
                        else if(childData.type == 'video'){
                            divData = '<div class="d-flex justify-content-end mb-4">\n' +
                            '               <div class="msg_cotainer_send" id="sendDiv" style="font-size:17px">\n' +
                            '               '+ childData.name +'<br>' + 
                            '                   <video src="' + childData.data + '" width="240" height="180" controls>\n' +
                            '               </div>\n' +
                            '               <div class="img_cont_msg">\n' +
                            '                   <img src="' + user_img_src + '"\n' +
                            '                   class="rounded-circle user_img_msg">\n' +
                            '               </div>\n' +
                            '          </div>';
                        }
                        else
                            alert("can't present this type of message");
                    }
                    else{
                        if(childData.type == 'text'){
                            divData = '<div class="d-flex justify-content-start mb-4" id="fromDiv">\n' +
                            '               <div class="img_cont_msg">\n' +
                            '                   <img src="' + childData.photoURL + '"\n' +
                            '                   class="rounded-circle user_img_msg">\n' +
                            '               </div>\n' +
                            '               <div class="msg_cotainer" style="font-size:17px">' +
                            '                   '+ childData.name +'<br>' +  childData.data+
                            '               </div>' +
                            '          </div>';
                        }
                        else if(childData.type == 'image'){
                            divData = '<div class="d-flex justify-content-start mb-4" id="fromDiv">\n' +
                            '               <div class="img_cont_msg">\n' +
                            '                   <img src="' + childData.photoURL + '"\n' +
                            '                   class="rounded-circle user_img_msg">\n' +
                            '               </div>\n' +
                            '               <div class="msg_cotainer" style="font-size:17px">' +
                            '                   '+ childData.name +'<br>' +
                            '                   <img src="' + childData.data + '" width="240" height="180">\n' +
                            '               </div>' +
                            '          </div>';
                        }
                        else if(childData.type == 'video'){
                            divData = '<div class="d-flex justify-content-start mb-4" id="fromDiv">\n' +
                            '               <div class="img_cont_msg">\n' +
                            '                   <img src="' + childData.photoURL + '"\n' +
                            '                   class="rounded-circle user_img_msg">\n' +
                            '               </div>\n' +
                            '               <div class="msg_cotainer" style="font-size:17px">' +
                            '                   '+ childData.name +'<br>' + 
                            '                   <video src="' + childData.data + '" width="240" height="180" controls>\n' +
                            '               </div>' +
                            '          </div>';
                        }
                        else
                            alert("can't present this type of message");
                    }
                    total_post[total_post.length] = divData;
                    first_count += 1
                });
    
    
                document.getElementById('bodyContent').innerHTML = total_post.join('');
                
    
                postsRef.on('child_added', function(data) {
                    second_count += 1;
                    if (second_count > first_count) {
                        var childData = data.val();
                        
                        if(childData.type == 'text'){
                            divData = '<div class="d-flex justify-content-end mb-4">\n' +
                            '               <div class="msg_cotainer_send" id="sendDiv" style="font-size:17px">\n' +
                            '               '+ childData.name +'<br>' +  childData.data +
                            '               </div>\n' +
                            '               <div class="img_cont_msg">\n' +
                            '                   <img src="' + user_img_src + '"\n' +
                            '                   class="rounded-circle user_img_msg">\n' +
                            '               </div>\n' +
                            '          </div>';
                        }
                        else if(childData.type == 'image'){
                            divData = '<div class="d-flex justify-content-end mb-4">\n' +
                            '               <div class="msg_cotainer_send" id="sendDiv" style="font-size:17px">\n' +
                            '               '+ childData.name +'<br>' +
                            '                   <img src="' + childData.data + '" width="240" height="180">\n' +
                            '               </div>\n' +
                            '               <div class="img_cont_msg">\n' +
                            '                   <img src="' + user_img_src + '"\n' +
                            '                   class="rounded-circle user_img_msg">\n' +
                            '               </div>\n' +
                            '          </div>';
                        }
                        else if(childData.type == 'video'){
                            divData = '<div class="d-flex justify-content-end mb-4">\n' +
                            '               <div class="msg_cotainer_send" id="sendDiv" style="font-size:17px">\n' +
                            '               '+ childData.name +'<br>' + 
                            '                   <video src="' + childData.data + '" width="240" height="180" controls>\n' +
                            '               </div>\n' +
                            '               <div class="img_cont_msg">\n' +
                            '                   <img src="' + user_img_src + '"\n' +
                            '                   class="rounded-circle user_img_msg">\n' +
                            '               </div>\n' +
                            '          </div>';
                        }
                        else
                            alert("can't present this type of message");
                        total_post[total_post.length] = divData;
                        //var d1 = document.getElementById('bodyContent');
                        //d1.insertAdjacentHTML('beforebegin', divData);
                        document.getElementById('bodyContent').innerHTML = total_post.join('');
                    }
                });
            }
            else{
                console.log("can't upload or update mseeage due to user is not logged in");
            }
        })
        .catch(e => console.log(e.message));
    }
    
    $(document).ready(function(){
        $('#action_menu_btn').click(function(){
            $('.action_menu').toggle();
        });
    });
}

window.onload = function() {
    init();
};
