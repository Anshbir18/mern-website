import { z } from "zod";

// Creating a schema for signup data
export const signupSchema = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters long" }).max(20, { message: "Username cannot exceed 20 characters" }).trim(),
    email: z.string().min(3, { message: "Email must be at least 3 characters long" }).max(20, { message: "Email cannot exceed 20 characters" }).trim(),
    phone: z.string().min(3, { message: "Phone number must be at least 3 characters long" }).max(20, { message: "Phone number cannot exceed 20 characters" }).trim(),
    password: z.string().min(3, { message: "Password must be at least 3 characters long" }).max(20, { message: "Password cannot exceed 20 characters" }).trim(),
});
