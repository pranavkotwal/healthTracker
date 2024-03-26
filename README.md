# Medical Report Tracking System

Welcome to the Medical Report Tracking System! This project is built using the MERN (MongoDB, Express.js, React.js, Node.js) stack and is designed to help users manage their blood reports effectively.

## Features

- **Authentication**: Users can sign up and log in securely to access the system.
- **Add Reports**: Users can add new blood reports to their profile.
- **Delete Reports**: Users can delete existing reports from their profile.
- **Chart Reports**: Users can visualize their blood reports using charts to track changes over time.


 ## Technologies Used

- **MongoDB** : NoSQL database used to store user information and blood reports.
- **Express.js**: Web application framework for building APIs.
- **React.js**: JavaScript library for building user interfaces.
- **Node.js**: JavaScript runtime environment for executing server-side code.
- **JWT Authentication**: JSON Web Token-based authentication for securing user sessions.
- **Recharts**: JavaScript library for creating charts to visualize blood report data.


## Installation
1. Create .env file

```js
    PORT = 3000

    MONGO_URI = 'YOUR_MONGO_URI'
    JWT_SECRET = 'YOUR_SECRETKEY'


```

2. Install dependencies
```bash
    cd server
    npm install
    cd ../client
    npm install
```
3. Start backend server

```bash 
    cd backend
    nodemon index.js
```

4. Start frontend dev server

```bash
    cd client
    npm run dev
```





