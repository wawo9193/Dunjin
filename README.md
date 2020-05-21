# Dunjin
A financial tracker app using the Plaid API and React/Node/Express.

#### Plans:
- Early stages, the plan is to have this app be a functioning personal finance dashboard using Plaid's sandbox.
- Later stages, the plan involves usability assessment testing, auth., and storing data/sessions.

#### Current:
![screen shot](https://github.com/wawo9193/Dunjin/blob/master/dunjin-app/screenshot.jpg "screen shot 1")

#### To Run:
- move to root directory of app 'dunjin-app' by using 'cd'
- to start server, 'nodemon server/server.js'
- to start react app, in a separate terminal but same position in filepath, 'npm start'
- signup with an email and password (password is hashed before being stored)
- select button, 'Open link and connect your bank!'
- input 'user_good' and 'pass_good' in Plaid Link window, then press 'continue'
- select button, 'get transactions' to view table of sample sandbox transactions
