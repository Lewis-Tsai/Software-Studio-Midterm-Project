# Software Studio 2022 Spring Midterm Project

### Scoring

| **Basic components**                             | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Membership Mechanism                             | 15%       | Y         |
| Firebase page                                    | 5%        | Y         |
| Database read/write                              | 15%       | Y         |
| RWD                                              | 15%       | Y         |
| Chatroom                                         | 20%       | Y         |

| **Advanced tools**                               | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Using React                                      | 10%       | Y         |
| Third-Party Sign In                              | 1%        | Y         |
| Notification                                     | 5%        | Y         |
| CSS Animation                                    | 2%        | Y         |
| Security                                         | 2%        | Y         |

| **Other useful functions**                         | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Name of functions                                  | 1~10%     | N         |


---

### How to use 

    Describe how to use your web and maybe insert images or gifs to help you explain.

1. Membership Mechanism 
![](https://i.imgur.com/NQyAj73.png)
* click the login button to log in.
* every feature won't be available at this time
![](https://i.imgur.com/bmOX5PE.png)
* you can use either email sign in/ sign up, or simply use an google acount to sign in.
* Facebook sign in and LinkedIn sign in methods are **not** available here.
* If you use an exist email/password to sign in, after you sign in, this page will be **reloaded** again.
* After the reload, retype the email and password, press sign in, and you will be redirect to the loading page.
:::danger
I don't know why the page won't be redirected the first time I press sign in. It always takes two times. I have checked the code several times and still can't solve it. Please feel free to check my code 'signin.js'.
:::

2. **Advanced components** - Use CSS animation
![](https://i.imgur.com/d04xbqX.png)
* After you have successfully signed in, you will be redirected to this loading page.
* After three seconds, you will be redirected to the chatroom.

3. create private chatrooms 
* press this button to create new chatroom.
![](https://i.imgur.com/HtGUFf3.png)
* Name the chatroom.
![](https://i.imgur.com/l6ZDnkr.png)
* Note that to change the chatroom on the left hand side panel, remember to click the red dot area showed below.
* This is because of aesthetic reason. If you click the chatroom panel in the correct spot, you will get an alert notification.
* This also implies to other chatrooms, including public chatroom.
![](https://i.imgur.com/gVGTZr5.png)
4. add member to the current chatroom
* Two ways to add new member to the current chatroom as showned below.
![](https://i.imgur.com/YxUAH49.png)

![](https://i.imgur.com/CXWFID0.png)

5. **Advanced components** - Add Chrome notification
* After you have succesfully added a member to this chatroom, you will be notified.
![](https://i.imgur.com/n2DZqqa.png)

6. **Advanced components** - Deal with problems when sending code
* Fore example, <script>alert(“example”);</script>
will be detected and tranfer to the message as follows.
![](https://i.imgur.com/rPPXu3c.png)

7. **Bonus Components** - User profile 
* There are two ways to access the profile page.
![](https://i.imgur.com/ABz4sqy.png)

![](https://i.imgur.com/NqFWiKc.png)

* In the profile page you can set several attributes, but mind that only user name is useful here. Other data will also be stored in database, but won't make any difference of the web appreance.
![](https://i.imgur.com/P0aJ7Dy.png)

8. **Advanced components** - Profile picture 
* click the button to change the profile picture, a loader is provided.
![](https://i.imgur.com/dIuB51s.png)

9. **Advanced components** - Send image, Send video 
* By clicking the button , you can upload photos or videos.
![](https://i.imgur.com/7kwmOgz.png)
* After you have succesfully uploaded the file, you will get an alert notification as follows.
![](https://i.imgur.com/LzPER9b.png)

10. **Advanced components** - Block User 
* click this button to block users.
![](https://i.imgur.com/63yuhCe.png)
* Enter the email of the user you want to block.
![](https://i.imgur.com/WiWTQkb.png)
* If success, you will get an alert notification as well.
![](https://i.imgur.com/xkmTKyr.png)

* Mind that you can't block any user in public chatroom.

### Function description

    Describe your bonus function and how to use it.
* I have accomplished all the basic components.
* I have provided detailed description of advanced and bonus components above.
* Here's a list of what I have done.
* **Advanced components**
1. Sign Up/In with Google or other third-party accounts 
2. Add Chrome notification 
3. Use CSS animation 
4. Deal with problems when sending code 

* **Bonus components**
1. User profile 
2. Profile picture 
3. Send image 
4. Send video 
5. Block User 

### Firebase page link

    Your web page URL
    
[my web link](https://software-studio-mid-chatroom.web.app/)

### Others (Optional)

    Anything you want to say to TAs.
Please feel free to contact me if anything goes wrong with my website. I'll be glad to explain.

<style>
table th{
    width: 100%;
}
</style>