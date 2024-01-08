# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `Production Deployment`

1) Make sure your firebase.json looks like the following (copy and paste if necessary):

{  "hosting": {    "public": "dist/nchandi-website",    "ignore": [      "firebase.json",      "**/.*",      "**/node_modules/**"    ],    "rewrites": [      {        "source": "**",        "destination": "/index.html"      }    ]  },  "rewrites": [    {      "source": "/api/v1/**",      "function": "webApi"    }  ]}


2) After you build the project with "ng build --prod", please verify that your generated firebase files are in root project folder.

3) Make sure that only one index.html is present in the generated "dist" folder. This index.html folder should be in path ../dist/nchandi-website/index.html.

4) Type “firebase deploy”

#### `Other Notes`

Update Orientation Dates:
Update dates in this file:  app>model>meeting-events.ts
Use same format.  Make sure “id:” value is different for each date.

