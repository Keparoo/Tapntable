# Tapntable

# Description
Tapntable is a web app implementing a restaurant Point of Sale (POS). The backend is a RESTful API implemented in Node.js and Javascript using a Posgresql database.  
The front end is implemented using React and Redux.  

## Front-end
* Implemented using React, Redux, and Material UI

## Back-end
* Source at https://github.com/Keparoo/tapntable-backend

## Deployment
The frontend is currently deployed to surge:
https://tapntable.surge.sh/

## Pages
* / -- Page allows a user to enter their pin to clock-in/clock-out. Entering a correct pin will display a page asking if the user wants to clock-in. If the user clocks in they are greeted by a welcome message. If the user's role indicates that they can create/manager orders, after the welcome page they will be directed to a screen where they can create/manage orders. Otherwise the screen will redirect to the login pin form.

* Once a day a manger needs to log into a terminal to authorize the terminal to be able to communicate with the backend and function for the employees for that day. Login is with a standard username and password. The token is stored in local storage for 23 hours. After 23 hours, a manager must log in to start the next day. This may be done after closing out a day as well. This keeps token expirations short.


----
### Components
* Servers
* OrderCategories
* OpenChecks
* CurrentCheck

* Spinner
* ItemList
* ItemCardList
* ItemCard

### Redux store:
* user
* items
* checks
* payments
* currentCheck
* totals

### Dependencies:
* axios
* jwt-decode
* moment
* react
* react-dom
* react-redux
* react-router-dom
* redux
* redux-thunk
* uuid
* @mui/material
* @mui/icons-material

### Deployment using surge:
Install surge globally:
```
$ npm install --global surge
```

In the Tapntable.js and anywhere else there are requests to localhost:3001 use the following:

```
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
```

Define the environment variable for the frontend app. YOUR_HEROKU_BACKEND_URL should be something like https://YOUR_BACKEND_APP_NAME.herokuapp.com.

Run the following commands in the jobly-frontend folder

```
$ REACT_APP_BASE_URL=YOUR_HEROKU_BACKEND_URL npm run build
$ cp build/index.html build/200.html
$ surge build
```

---

# Create React App Info

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

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
