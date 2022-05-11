# Tapntable - frontend

## Description

Tapntable is a web app implementing a restaurant Point of Sale (POS). It is a web-based app designed to manage the operations of a restaurant: Employee timeclock, manage checks and orders, track payments, track servers sales &  cash bank, track and manage items sold and availability. This would be used as a terminal or terminals in a restaurant for servers & bartenders to use or with tableside tablets.

At a high level, the app's backend is implemented with a PostgreSQL database and a RESTful API implemented in Javascript and Express. The frontend is implemented in React, using a Redux store and Google’s Material UI for design elements.

## Frontend

* Implemented using React, Redux, and Material UI

## Backend

* Source at <https://github.com/Keparoo/tapntable-backend>

## Deployment

The frontend is currently deployed to surge:
<https://tapntable.surge.sh/>

### Dependencies

* react 17.0.2
* react-dom
* react-redux 7.2.6
* react-router-dom 5.2.1
* redux
* redux-thunk
* redux-devtools-extension
* axios
* jwt-decode
* moment
* formik
* uuid
* @mui/material
* @mui/icons-material
* yup

### Testing Dependencies

* @testing-library/jest-dom
* @testing-library/react
* @testing-library/user-event

----

## Pages

* Homepage
  * Allows a user to enter their pin to clock-in/clock-out or access user's current orders.
    * Servers, Bartenders and Managers are directed to current orders once logged in
    * Otherwise the screen will redirect to the login pin form.

  * Once a day a manger needs to log into a terminal to authorize the terminal to be able to communicate with the backend and function for the employees for that day. Login is with a standard username and password. The token is stored in local storage for 23 hours.
* Welcome
  * Displays a welcome message to user and shows the 86 list (List of items with limited or no availability)
* Servers
  * View the user's current open checks
  * Create new check
  * Create and add orders to an open check
  * Send orders to Kitchen-Hot, Kitchen-Cold, or Bar based on the item's category
  * Send a 'fire course' order to kitchen
  * Calculate and print a check
  * Add a payment to a check
* Payments
  * View a user's open payments
  * Add a tip to a payment
  * Close an open payment
* SplitCheck
  * Move items from an existing check to a newly created one
* ItemDashboard
  * Search for, create, and update item information in the database
  * Search for, create, and update mod information in the database
* ItemCount
  * Manage the current count of items with limited or no availability
* CashOut
  * Reconcile a user's shift and create a user's shift report
  * Calculate the amount owed to user or to the restaurant
  * Declare cash tips if appropriate for user's shift
  * Allow user to clock out once cashout is successfully completed
* ClockOut
  * Clock out from user's shift
* CloseDay
  * Reconcile all checks and payments for the day
  * Reconcile cash drawer
  * Create sales report for the day
* ItemList
  * Display list of all items and related info

----

## Components

### Server Check & Order

* CheckFunctions
* NewCheckForm
* CurrentCheck
* SentItems
* OpenChecks
* ItemNoteForm
* OrderCategories
* OrderTickets
* ModCategories
* ModGroup
* RequiredModGroup

### Check Payment

* PayAmountForm
* Payment
* AddTipForm
* DeclareTipsForm

### Manager Database Management

* DashboardFunctions
* ItemSearchForm
* FilteredItems
* NewItemForm
* EditItemForm
* UpdateItemCount

### Routing and Navigation

* Routes
* ManagerRoute
* UserLoginForm
* UserLogoutForm
* UserPinForm
* Navbar
* KitchenNavbar
* ServiceBarNavbar
* NoUserNavbar

### Common Components

* ModalAlertg
* Spinner
* ItemList
* ItemCardList
* ItemCard

----

### Redux store

* user
* items
* mods
* checks
* payments
* currentCheck
* totals
* types

### Custom Hooks

* **useLocalStorage**: Stores the authorization token in local storage once a day by a manager authorizing the device to access the API.

### Deployment using surge

Install surge globally:

```bash
npm install --global surge
```

In the Tapntable.js and anywhere else there are requests to localhost:3001 use the following:

```javascript
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
```

Define the environment variable for the frontend app. YOUR_HEROKU_BACKEND_URL should be something like <https://YOUR_BACKEND_APP_NAME.herokuapp.com>.

Run the following commands in the jobly-frontend folder

```bash
REACT_APP_BASE_URL=YOUR_HEROKU_BACKEND_URL npm run build
cp build/index.html build/200.html
surge build
```

----

## Create React App Info

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

----

## Author

Kep Kaeppeler is the author of this project, code, documentation, test suite, and test data.

## License

Copyright © February 2022 Kep Kaeppeler
