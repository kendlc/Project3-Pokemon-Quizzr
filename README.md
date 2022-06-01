# Expense Trackr
Expense Trackr is an application that helps you to organize your finances keeping track of all your expenses and incomes.

## Technologies
Project created with:
* ReactJS
* Ruby on Rails server  ([GitHub repo](https://github.com/Lyndating/expense_tracker)).
* PostgreSQL
* JSON Web Tokens
* bcrpyt (password encryption)
* Cloudinary (image storage and optimisation)
* React Router
* React Bootstrap
* CSS
* Recharts
* Framer Motion


## Try it out
You can access and use this application at: [Expense Trackr](https://expense-trackr0.netlify.app).

### Login
* email: Wyane@ga.co
* password: password

### Back-end server codebase
[Expense-Tracker GitHub repo](https://github.com/Lyndating/expense_tracker)


## Object model associations
![association](/public/images/associations.png)

---------------------------------------------------------------
## Introduction

This was the 3rd project for the General Assembly Software Engineering Immersive bootcamp. 

We were tasked with developing a CRUD application (with at least 3 Models) in ReactJS, linked to a back-end server/database to handle API requests. 

The project was completed in one week by our group of 4.

---------------------------------------------------------------

## Approach

We started by agreeing on the core features of the site and their functionality. We also listed additional features that could be included if time permitted.

We then wireframed the database tables and their relationships. After some research & testing, we decided to use a Rails server / PostgreSQL back-end as we felt that a relational database would better serve our requirements. (Users > Transactions > Categories)

We set up a Trello board to ensure that we were prioritizing tasks effectively and were clear who was working on different parts of the application to avoid merge conflicts.

Development tasks were split across the team; working on Sign In and Sign Up, User Authentication with JWT, Cloudinary image storage requests, Transactions - Display, Create and Edit. 

As soon as the Rails server and database were online we tested the associations with seed data. We then set up routes and tested the api endpoints to ensure that JSON was being returned in a format that would be suitable for the front-end to work with.

The back-end was deployed first to Heroku, and shortly afterwards the React build to Netlify. Configuration and testing was done to ensure the services were able to communicate and env variables were created to allow quick switching between servers.

Towards the end of the week we added functionality such as conditional Navigation (login status), mobile responsiveness, chart visualisation of data and transaction filtering.

Finally we worked on bug testing/fixing, UI refinements, code refactoring / tidy up and installed Framer Motion Library to make smoother page transitions.

This was our first time working on a group dev project. We all gained valuable experience in working collaboratively on GitHub (branching, solving merge conflicts etc), and more generally working on different parts of a larger application without breaking each other's code! It was great to all work together to solve critical bugs & issues that were holding up progress at various points in the week. It was also great practice learning to use ReactJS, which we had only been introduced to in the week prior to this project.

---------------------------------------------------------------
## Features/User Guide

* Users can [Sign In](https://expense-trackr0.netlify.app/) from the Home page or click the button link to the [Sign Up](https://expense-trackr0.netlify.app/signup) page to set up a new user account.
* A password with a minimum of six characters is required when establishing a new account. Email address, first name, last name, password and password confirmation are required.
* The user can access the [Transactions](https://expense-trackr0.netlify.app/transactions) page, which also serves as the user's home page. 
* The 'Add New transaction' button allows the user to create new income/expense entries, and the user can navigate back to the home page by using the 'Cancel' button in the new transaction form. 
* The transaction type (Expense/Income), date, category, title, and amount are required for each new entry. Description and File Upload (e.g. receipt, payment script etc) are optional.
* The category list is set up by default for new users and will change depending on the type of transaction (Income or Expense)
* The file upload widget will block form submission on change.
* Once the new user adds a transaction, the transaction data will be sent and stored in the database. The user's home page will re-render.
* Pie charts for the current year's income and expenses will display at the top of the transaction page, displaying $ totals with a mouse hover.
* The filter dropdown allows the user to filter their transactions by year and/or by month. The Income, Expense and Balance Card amounts will automatically update with new filter conditions. 
* Filtered transactions will be listed (sorted by transaction date) below.  
* A receipt icon will appear if the user had uploaded a receipt for that transaction. Click on the icon to view the receipt image popup, and click the receipt image to close the preview. 
* The User can edit or delete each transaction by clicking the 'Edit' or 'Delete' button on the right.
* The 'Cancel' button is available to close the edit form. The transaction data will only be saved if the user updates field(s) and clicks 'Submit'.
* The user can click on [My Profile](https://expense-trackr0.netlify.app/profile) to edit the profile or change the password. 
* [Edit Profile](https://expense-trackr0.netlify.app/profile/edit) allows the user to change the first name, last name or email address.

---------------------------------------------------------------

## Screenshots

### Web view 

<span><img src="/public/images/w-login.png" width="400" alt="web login">
<img src="/public/images/w-signup.png" width="400" alt="web signup"></span>
<img src="/public/images/w-profile.png" width="400" alt="web profile">
<span><img src="/public/images/w-transaction1.png" width="400" alt="web transaction">
<img src="/public/images/w-transaction2.png" width="400" alt="web transaction">
<img src="/public/images/w-transaction3.png" width="400" alt="web transaction"></span>



### Mobile Web view 

<span><img src="/public/images/m-login.png" width="250" alt="mobile web login">
<img src="/public/images/m-signup2.png" width="250" alt="mobile web signup">
<img src="/public/images/m-profile.png" width="250" alt="mobile web profile"></span>
<span><img src="/public/images/m-transaction1.png" width="250" alt="mobile web transaction">
<img src="/public/images/m-transaction2.png" width="250" alt="mobile web transaction">
<img src="/public/images/m-transaction5.png" width="250" alt="mobile web transaction"></span>

---------------------------------------------------------------
### Possible future feature additions
* Create and link to a Family Shared Account.
* Allow users to create their own custom categories.
* Filter Charts by Year and Month.
* Upload a Profile Photo.
* Show Receipt photos on Profile page.
* Generate pdf summary of monthly transactions and email to user.