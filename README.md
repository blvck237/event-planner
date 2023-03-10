# Event Planner

This is a simple event planner app that allows you to create events and invite people to them. It is built using the Express framework and uses MongoDB as the database.

## Installation

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `npm start` to start the server
4. Head over to `localhost:8000` to view the app

## Functionalities
1. Login and signup as host user
2. Login as guest user
3. Create events and invite people to them (host user)
4. RSVP to events (guest user)
5. Select a meal option for events (guest user)

## Seed the database

1. Go to the file `data.js` at the root of the project
2. Add the data you want to seed the database with. Example the meals data is already there
3. Export the data as a module
4. Go to `models/db.js`, import the related model and data to be seeded, then update the `seedDb` function to seed the data you want. 
5. Restart your server and the data will be seeded