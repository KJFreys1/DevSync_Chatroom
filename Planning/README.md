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
-   User will be able to sign in as guest. Their messages will be saved on databse so other users will still see them, but the guest will not be able to message other users or retain any other profile-based information. (BONUS: guest will be able to edit his own messages until he exits the page)

