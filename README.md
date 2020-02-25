# DevSync - Asynchronous chat room


## Overview

This app is desgined to be an asynchronous chat room where users are free to leave and join new rooms, post messages into those rooms, and comment on other posts. Anytime a user posts or comments something into the room, the room is updated on everyone elses screens immediately without them having to refresh the page. The design was inspired by the popular communication platform 'Slack' and was built using my own hand-made CSS. A link to the deployed client-side of the project is in the description. I'll also leave another link to my portfolio down below.

## How Long it took me (Total: 8 days)

Planning & Researching (~ 2 days):
-   I didn't know anything about websockets before this project so I had to take sometime learning about it before I started. You can read more about this process in the /Planning directory if interested.

Functionality (~ 4 days):
-   Many challenges came up during the making of this project, but I learned a lot from it all and am very happy with where it is now with the amount of time that I had. You can read more about the challenges I faced in the /Planning directory if interested.

Styling (~ 2 days):
-   This took a while because in the past I have struggled in the CSS area of development and for this project wanted to greatly improve upon my styling abilities. You can read more about the styling process in the /Planning driectory if interested.

## What I've Accomplished So Far

User Functionality:
-   Users can create a new account or login to an existing one that stores their information, such as what rooms they're currently apart of.
-   Users cannot join rooms or view the Dashboard unless they are logged in.
-   All axios requests use a custom middleware to obtain that user's id to retrieve the rest of their data as well as verify they are logged in and can execute the request.

Room Functionality:
-   Active rooms connected to the user are displayed on the left side of the page.
-   All users join the Lobby room on registration by default, which is the only room in which the user is unable to leave.
-   User has the ability to list all rooms in the database and join whichever ones they want, immediately directing them to that room's information.
-   All buttons are responsive, and show animations for hovering and selecting.
-   Selected rooms obtain a blue background and a white color.
-   Rooms connected to the user that have been updated since they have last been in there gain a color of white to notify the user.

Post & Comment Functionality:
-   User can post messages into the room they are currently viewing, displaying their name, post, and an option to view comments.
-   Upon clicking 'View Comments', a new section will expand the parent section, displaying all existing comments and a new textbox for any user to write a new comment.
-   Users can only view the comments for one post at a time to avoid cluttering the page.

## What Still Needs To Be Done

Private Messaging Concept:
-   User will have the ability to send messages to other users that are private to those users.
-   These groups of messages will be treated like rooms and displayed on the left side of the page underneath the other rooms.
-   User will have ability to favorite/pin message groups to keep them at the top of the page and not get lost.

Friending Concept:
-   Users will have an option to send friend requests to other users to allow easy access for PMing in the future.
-   Users will also have to the option to accept or deny friend requests as well as block users entirely.
-   Users can search for other users in addition to getting their information from shared rooms.

Room Functionality:
-   *BUG*: User is only notified of one updated room at a time. If two rooms are updated, user is only notified of the last one rather than both.
-   Rooms should have option to be favorited/pinned like PMs.
-   User should have ability to view all the other users in the room.
-   User could see a message pop up when they join a room introducing them to that room while all other users are notified when the user joins and leaves the room. (This wouldn't be hard to implement, I was just considering how important it would actually be.)

Post & Comment Functionality:
-   User should have the ability to edit their own posts and comments.

Reactivity:
-   At it's current state, the app is not super mobile friendly. It looks great on tablets, but on phones it requires the user to scroll horizontally to see the whole page.
-   I would like the app to look entirely different on mobile, as it currently has a horizontal-heavy style where a more vertical style would look much better on a phone.

## About The Developer

My name is Kyle Freyermuth and I am an up-and-coming software developer who specializes in the React framework. If you liked this project, feel free to contribute to it, leave a star, and take a look at my other projects on GitHub. My portfolio and LinkedIn, which have all my contact info if you want to get in touch, are linked below:

-   [Portfolio](https://www.kylefrey.dev/)
-   [LinkedIn](https://www.linkedin.com/in/kylefreyermuth/)