# online-chess
chess game server (html-css-js front end/node.js backend)

-the server runs on port 8080

-to connect to the server once you run it, go to http://[local ip of your server]:8080/ on your browser 

-when a user connects to the server, he will be transfered to the waiting room. If a player is already in the waiting room, a game will start between the both of them with a player ID being assigned to each of them. (warning⚠: running the server while files connected to it are still open may cause overlap in assigned game IDs for each pair of players. It is therefore better to close all connections to the server before running it)

PS: the app in its current form is a local network application and has no domain on the web. Any attempt to connect to the server from a router other than the one your server is connected to will fail. 
