# Outfitted
An e-commerce website for clothes.

## Technology Stack

### Requirements
* npm
* angular cli
* mongodb 3.6

#### 1. Frontend
* Angular 4
* Bootstrap 4

#### 2. Backend
* Node.js
* MongoDB 3.6

## Build Instructions

Angular App is in Final-project folder.       --------- Folder 1\
Express server is in gifted-server folder.    --------- Folder 2

**Steps**

Install dependencies by running the following command in Folder 1 and Folder 2

`npm install`

Execute the following commands in order to avoid any errors

1) Extract data from the zip file in the same folder
2) Run the following command\
  `mongod --dbpath ./data/db`
3) Go to Folder 2 and execute:\
  `DEBUG=gifted-server:* npm start`
4) Go to Folder 1 and execute:\
  `npm start`

Browse the app on http://localhost:4200
