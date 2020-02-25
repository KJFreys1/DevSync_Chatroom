# Planning

## Process

The first thing I had to do was decide which technology I wanted to implement. I reseached many different methods, including Socket.io, GraphQL, and Django Channels. In the end, I decided to go with Socket.io for two reasons: (1) I wanted to better familiarize myself with the MERN stack as that's something I feel really comfortable with and would like to specialize in, and (2) it was the easiest to understand from its documentation and seemed to be the fastest to implement, and since I had just over a week to complete the project this was very important. In addition to studying the documentation, I wacthced and followed along to video tutorials on YouTube that went over how to implement it from a basic level as well as with the MERN stack.

The second step was to create wireframes that displayed how I wanted my project to look. My main inspirations for design came from Slack, and this directly affected my component layout. I also took inspiration from Twitter and their Login page for my own Login and Register pages.

Next was the functionality of the project. I started by getting my server up and running with basic controllers and models, then my client with a barebone structure. I next implemented user authorization referencing my past work with that subject. After that, it was just impoving my routes, connecting them to the client side, and implementing Socket.io to broadcast to other users when a post of comment was submitted. Once I had the main User, Room, Post, and comment functionality down, I chose to focus on adding little UI features to boost their responisveness and the users experience and leave the private messenging system for a later date. I'm happy with this decision, as although my app doesn't do everything I wanted it to do initially, what it actually does do it does really well.

Finally, it was time to style the product. I chose to avoid using CSS libraries so that I could better my understanding of CSS since that is something I typically struggle with. I'm very happy with this decision as I learned a LOT from this experience, and was able to focus on implementing a lot of UI/UX features. This included a background color change when the mouse hovered over a room or post, colors lighting up when text was selected, buttons having different effects for at rest, hovered, and focused, and whole containers getting affected when the user selects an input box or textarea. Although I wish I had more time to make the app more mobile friendly, I am very proud of where my app is today and llok forward to improving upon it in the future.

## Wireframes

Images: All images will be posted separately in this folder.

Components:
-   App: Defined the routes for the page.
-   Login: Stored form for user to login and link to Register page.
-   Register: Stored form for user to sign up and link to Login page.
-   Dashboard: The main hub for functions that are used throughout its children components. This is where all the axios requests are made and data manipulation is done.
-   Modal: Displayed a modal for the user to create a new room.
-   SideBar: Container for the left side of the page, listing the app name, logout button, user's name, and all rooms connected to the user.
-   Room: Child component for each rendered room on the SideBar.
-   Main: Display for room information as well as all rooms in the database.

Structure:
-   App
    -   Login
    -   Register
    -   Dashboard
        -   Modal
        -   SideBar
            -   Room
        -   Main

## Initial Goals

Bronze:
-   The user can enter a name and a room name and start messaging other users. 
-   Messages will be stored locally.
-   Style will be static in this stage for now.

Silver:
-   The user will be able to sign up for an account for the app and have their messages created by them be stored in a database.
-   User auth will be developed during this stage.
-   New user that signs up will automatically be logged in.
-   Messages will initially be pulled RESTfully until I implement websockets. 
-   App is essentially a basic MERN app at this point still.

Gold:
-   Implement websockets using Socket.io.
-   Have messages be pulled down restfully on page reload as well as asyncronously as other users write messages.
-   Messages created will be sent to both Socket.io and the database in parallel so messages aren't lost on page reload.
-   Style will be dynamic and be mobile friendly.

Platinum/Optional Ideas:
*   User will be able to create a profile for themselves as well as send friend requests and personal messages other users.
*   Style will ressemble Slack with my own twist.
*   User will be able to search for existing rooms and users.
-   Created rooms have the option to make public or private with the ability to send invites to other users or allow other users to enter with a password.
-   User will have option to login with 3rd party sites (ie. Google, Facebook, Github, etc.)

## Issues & Challenges

### Error

I was getting a server error for one of my axios requests that posted a comment to the page. The error only showed after I tried to implement functionality below the request that rendered the updated info on the client side immediately without having to wait for the request to finish.

### Solution

I found that I was actually manipulating the data being sent to the database underneath the request which was interfering with what the model would accept on the server side. Because of the asynchronous nature of the axios request, even though the data was being manipulated below the request, it was still manipulating the body, causing the error. The solution was to assign the value of the body to a new variable, manipulate that varaibale instead, and assign it to my client side data, that way I was never directly manipulating the body sent to the database.

```Dashboard.js
const addComment = (post, text) => {
        const comment = { message: text }
        axios.post(dataURL + '/comment/' + post._id, comment, header).then(() => {
            socket.emit('sendPost', display.room)
        }).catch(err => console.log(err))
        const data = { ...display }
        const newPost = { ...post }
        // comment.user = { name}   <-- Caused the error
        const newComment = { ...comment } //    <-- Solution
        newComment.user = { name }
        newPost.comments.push(newComment)
        data.posts.splice(data.posts.indexOf(post), 1, newPost)
        setDisplay(data)
    }
```