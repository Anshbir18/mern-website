import express from 'express';
import { home, register,login } from '../controllers/auth-controller.js';
import { signupSchema } from '../validations/auth-validation.js';
import validate from "../middware/validate-middleware.js"

const router = express.Router();

router.get("/", home)

router.route("/register").post(validate(signupSchema),register);

router.route("/login").post(login);

export default router;
 