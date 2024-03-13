import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import router from './routes/auth-router.js';
const app = express();

import Connection from './database/db.js';
import errorMiddleware from './middware/validate-middleware.js';

// middleware

app.use(express.json()); // parse incoming requests with JSON payloads
app.use(errorMiddleware)

app.use("/api/auth",router);

Connection().then(()=>{
    app.get("/", (req, res) => {
        res.status(200).send("Welcome");
    });
    
    const PORT = 8000;
    
    app.listen(PORT, () => {
        console.log("Server is listening on port 8000");
    });
    
})

