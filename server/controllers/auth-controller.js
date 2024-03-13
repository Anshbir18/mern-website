// controllers.js

// In an Express.js application, a "controller" refers to a part of your code that is responsible for handling the application's logic. 
// Controllers are typically used to process incoming requests that come from router, interact with models (data sources), and send responses back to clients. 
// They help organize your application by separating concerns and following the MVC (Model-View-Controller) design pattern.

import bcrypt from "bcrypt";
import User from "../models/user.model.js";

// Controller for the home route
export const home = async (req, res) => {
    try {
        res.status(200).send("Welcome to router using controllers");
    } catch (e) {
        console.log("Error in Home Page:", e);
    }
}

// Controller for user registration
export const register = async (req, res) => {
    try {
        // Step 1: Get Registration Data
        const { username, email, phone, password } = req.body; // Destructure request body

        // Step 2: Check Email Existence
        const userExists = await User.findOne({ email: email });

        if (userExists) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Step 3: Hash Password
        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password, saltRound);

        // Step 4: Create User
        // const userCreation = await User.create({ username, email, phone, hash_password });

        const userCreation = await User.create({ username, email, phone, password });

        // Step 6: Respond
        res.status(200).json({ msg:"registration successful" ,
            token: await userCreation.generateToken(),
            userId: userCreation._id.toString(),
        }); // Send JSON response directly

        // In most cases, converting_id to a string is a good practice because it ensures consistency and compatibility across different JWT libraries and systems. It also aligns with the expectation that claims in a JWT are represented as strings.


    } catch (error) {
        console.log("Error in Register Page:", error);
        res.status(500).send("Internal Server Error");
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExists = await User.findOne({ email: email });

        if (!userExists) {
            return res.status(400).json({ msg: "Invalid Credential" });
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(password, userExists.password);

        if (passwordMatch) {
            // If password matches, generate token
            const token = await userExists.generateToken();
            res.status(200).json({
                msg: "Login successful",
                token: token,
                userId: userExists._id.toString(),
            });
        } else {
            return res.status(400).json({ msg: "Invalid email or password" });
        }
    } catch (error) {
        console.log("Error in login Page:", error);
        // res.status(500).send("Internal Server Error");
        next(error);
    }
};


