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
* [App design](#app-design)
* [Features](#features)
* [Tech stack](#tech-stack)
* [Future update](#future-update)


## Setup
To run the appllication locally in dev mode:

1. fork this repo
2. open your terminal and navigate to the repo directory on your local device
3. install required dependencies
<code>npm install</code>
4. once dependencies are installed, you can run the dev mode locally on your machine. You will need to have MongoDB on your local machine.
<code>npm run dev</code>


## File structure
The development of the application is divided into two parts - client and server directories.
The client side is built using React. 

Client side src directory is organized as follows:
* charts - functionarl chart component
* components - display components are stored here. Components such as a Button, Input, Badge, etc. Most components do not hold any utility function in them. They simply take data/properties and render them. 
* httpRequests - all HTTP requests made from client (browser) side are stored here. HTTP requests are made using Axios.
* pages - page files are stored here. Each sub-directory represents a page template. Component layout, HTTP requests, data/UI manipulations with respect to user input, and state management are on the page level.
* util - custom functions, calculations, data type definitions are stored here. Functions such as manipulation of data from API response, type checks, and various data type declaration.

Server side src directory is organized as follows:
* controller - files that controls the communication between API request and response and database. The controllers are built using express.js. Depending on the request (GET/PUT/POST/DELETE), controllers will execute the respective CRUD operation to database.
* models - database collection schemas are defined here.
* routes - files that take API routes and send them to the respective controller and operations.
* seeds - sample data 

## App design
In this application, user can create various 'items' to divide and distribute the workload and reponsibilities of a project to your team.

Within a project, the highest unit of workload is 'project'. The lowest units are 'work' and 'bug' in the hierarchy.

A project can consist of multiple 'feature', 'work', or 'bug' items.
A feature item can consist of other 'work' or 'bug' items.
Both 'work' and 'bug' items are the lowest item unit, which means they cannot be further divided into other items and should not consist other items.

This is parent to children relationship, such:
- a project can have features, works, bugs as its children.
- a feature can have works and bugs as its children.
- a feature can only have project as its parent.
- a work or bug item can have a feature or a project as its parent.

Furthermore, once a feature/work/bug is assigned in a project, it cannot change project. An item's project is assigned when it is assigned to a parent that belongs to a project or it is assigned to a project directly. 


## Features
* snapshot and progress charts by item type on the project page, where user can filter the chart by type.
* upon clicking on the small cards (features, work items, bugs) on the project page, it takes the user to the filtered search page, where a list of relevant items are displayed to the user.
  
  <img src="https://raw.githubusercontent.com/phaggio/project-tracker/master/screenshot/filter-chart.png" height="220">
* user can edit the assignee of an item. the selection dropbox also offers a search function, where user can search for assignees by name. 
  
  <img src="https://raw.githubusercontent.com/phaggio/project-tracker/master/screenshot/search-user-filter.png" height="180">
* on work or bug item page level, a relationship tree is shown to the user 
  
  <img src="https://raw.githubusercontent.com/phaggio/project-tracker/master/screenshot/item-relationship.png" height="180">
* on the Search page, there's a search filter where user can filter the list of items by their assigned project, type, status. User can also search for items by matching name in the item name input 
  
  <img src="https://raw.githubusercontent.com/phaggio/project-tracker/master/screenshot/search-filter.png" height="180">

* on the Setting page, user can add new user to the database. User can also toggle between debug mode of the application. Debug mode shows all the relevant console log buttons for users to see what is being stored in each state of the page.

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


## Future update
* filter the items by assignee on the Search page
* limit the project list on the Homepage to a scrollable div, preventing unnecessary long page when there are many projects
* a more intuitive relationship diagram on work and bug page

## Contributors
Feel free leave me any feedbacks.

Richard Wang
[Github](https://github.com/phaggio) ,
[LinkedIn](https://www.linkedin.com/in/richard-c-wang/)