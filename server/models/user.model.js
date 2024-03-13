// Model: Acts as a higher-level abstraction that interacts with the database based
// on the defined schema. It represents a collection and provides an interface for
// querying, creating, updating, and deleting documents in that collection.
// Models are created from schemas and enable you to work with MongoDB
// data in a more structured manner in your application.

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
});

// Secure the password with bcrypt

//pre method is used to do something before savinf the data in the database and the next is used to go back to the controller
userSchema.pre("save", async function (next) {
    const user = this; // current user that is being saved
    if (!user.isModified("password")) {
        return next();
    }
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, saltRound);
        user.password = hashPassword; // Update the password with the hashed one
        next();
    } catch (error) {
        return next(error);
    }
});


// **What is JWT?**
//JSON Web Tokens (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way
// for secure transmitting information between parties as a JSON object.
// ?  are often used for authentication and authorization in web applications.
// 1. **Authentication:** Verifying the identity of a user or client.
// 2. Authorization:** Determining what actions a user or client is allowed to perform.

// **Components of a JWT:**
// Header: Contains metadata about the token, such as the type of taken and the signing algorithm being used.
// Payload: Contains claims or statements about an entity (typically, the user) and additional data. Common claims include user ID, username, and expiration time.
// Signature: To verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way, a signature is included.

// Tokens, such as JWTs (JSON Web Tokens), are typically not stored in the database along with other user details. Instead, they are issued by the server during the authentication process and then stored on the client-side (e.g., in cookies or local storage) for later use.




userSchema.methods.generateToken = async function() {
    try {
        return jwt.sign({
            // Payload
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin
        },
        // Signature
        process.env.JWT_SIGNATURE,
        {
            expiresIn: "3h",
        });
    } catch (error) {
        console.log(error);
    }
};




const User = mongoose.model("User", userSchema);

export default User;
