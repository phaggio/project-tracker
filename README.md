# Project tracker

A web application where users can track the progress of their projects.

Application link: https://phaggio-project-tracker.herokuapp.com/

screenshot:

<img src="https://raw.githubusercontent.com/phaggio/project-tracker/master/screenshot/project-tracker-screenshot-01.png" width="360">

demo on mobile device

<img src="https://raw.githubusercontent.com/phaggio/project-tracker/master/screenshot/project-tracker-demo.gif" height="250">


## Table of contents
* [Setup](#setup)
* [File structure](#file-structure)
* [App item design](#app-design)
* [Features](#features)
* [Tech stack](#tech-stack)


## Setup
To run the appllication locally in dev mode:

1. fork this repo
2. open your terminal and navigate to the repo directory on your local device
3. install required dependencies
<code>npm install</code>
4. once dependencies are installed, you can run the dev mode
<code>npm run dev</code>


## File structure
The development of the application is divided into two parts - client and server directories.
The client side is built using React. 

Client side src directory is organized as follows:
* charts - functionarl chart component
* components - display components are stored here. Components such as a Button, Input, Badge, etc. Most components do not hold any utility function in them. They simply take data/properties and render them. 
* httpRequests - all HTTP requests made from client (browser) side are stored here. HTTP requests are made using Axios.
* pages - all full page files are stored here. Each sub-directory represents a page template. Component layout, HTTP requests, and state management are managed on page level.
* util - all custom functions, calculations, data type definitions are stored here. Functions such as manipulation of data from API response, type checks, and various data type declaration.

Server side src directory is organized as follows:
* controller - files that controls the communication between API request and response and database. The controllers are built using express.js. Depending on the request (GET/PUT/POST/DELETE), controllers will execute the respective CRUD operation to database.
* models - database collection schemas are defined here.
* routes - files that take API routes and send them to the respective controller and operations.
* seeds - sample data 

## App design
In this application, user can create various 'items' to divide and distribute the workload/reponsibilities of a project. 

The highest unit of workload is 'project'. The lowest unit are 'work' and 'bug'.

The workload of a project item can divided into other items such as 'feature', 'work', or 'bug'.
The workload of a feature item can divided into other items such as 'work' or 'bug'.
Both 'work' and 'bug' items are the lowest item unit, which means they cannot be further divided into other items. 

This is parent to children relationship, where:
- a project can have features, works, bugs as its children.
- a feature can have works and bugs as its children.

Furthermore, once a feature/work/bug is assigned in a project, it cannot change project. Item's project is assigned when it is assigned to a parent. 


## Features
* snapshot and chart by item type on the project page. user can filter the chart by type. 
  
  <img src="https://raw.githubusercontent.com/phaggio/project-tracker/master/screenshot/filter-chart.png" height="220">
* user can edit the assignee of an item. the selection dropbox also offers a search function, where user can search for assignees by name. 
  
  <img src="https://raw.githubusercontent.com/phaggio/project-tracker/master/screenshot/search-user-filter.png" height="180">
* on work or bug item page level, a relationship tree is shown to the user 
  
  <img src="https://raw.githubusercontent.com/phaggio/project-tracker/master/screenshot/item-relationship.png" height="180">
* on the Search page, there's a search filter where user can filter the list of items by their assigned project, type, status. User can also search for items by matching name in the item name input 
  
  <img src="https://raw.githubusercontent.com/phaggio/project-tracker/master/screenshot/search-filter.png" height="180">

* on the Setting page, user can add new user to the database. User can also toggle between debug mode of the application. Debug mode shows all the relevant console log buttons for users to see what is being store in each state of the page.

  <img src="https://raw.githubusercontent.com/phaggio/project-tracker/master/screenshot/setting-page.png" height="180">


## Tech stack
Client
* typescript
* react.js
* bootstrap
* chart.js
* react-router-dom.js
* axios.js

Server
* typescript
* mongoose
* express.js
* node.js


## Contributors
Feel free leave me any feedbacks.
- [Richard Wang](https://github.com/phaggio)
[Github](https://github.com/phaggio) ,
[LinkedIn](https://www.linkedin.com/in/richard-c-wang/)