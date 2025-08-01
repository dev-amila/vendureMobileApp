import { z } from "zod";

export const logInSchema = z.object({
    username: z.string().email("Please enter a valid email address").nonempty("Account email required"),
    password: z.string().min(4, "The password must be at least 4 characters long").nonempty("Please enter the login password\n"),
  });

  export const registerSchema = z.object({
    emailAddress: z.string().email("Please enter a valid email address").nonempty("Email address required"),
    firstName: z.string().min(3, "At least three characters").nonempty("First name required"),
    lastName: z.string().min(3, "At least three characters").nonempty("Last name required"),
    password: z.string().min(4, "The password must be at least 4 characters long").nonempty("Login password required"),
    confirmPassword: z.string().nonempty("Password confirmation required\n"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Password confirmation is incorrect",
    path: ["confirmPassword"],
  });
  
  export const updateCustomerSchema = z.object({
    firstName: z.string().min(3, "At least three characters").nonempty("First name required"),
    lastName: z.string().min(3, "At least three characters").nonempty("Last name required"),
    phoneNumber: z.string().optional(),
  });

  export const changePasswordSchema = z.object({
    currentPassword: z.string().nonempty("Password required"),
    newPassword: z.string().min(4, "The password must be at least 4 characters long").nonempty("Please enter the new password\n"),
    confirmPassword: z.string().nonempty("Password confirmation required\n"),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password confirmation is incorrect",
    path: ["confirmPassword"],
  });

  export const addressSchema = z.object({
    id: z.string().optional(),
    fullName: z.string().nonempty("First name required"),
    company: z.string().optional(),
    streetLine1: z.string().nonempty("Please enter the street where you live"),
    city: z.string().nonempty("Please select the city where you live"),
    province: z.string().nonempty("Please select the area where you live"),
    postalCode: z.string()
      .min(8, "The zip code is wrong")
      .max(8, "The zip code is wrong")
      .nonempty("Please enter your zip code"),
    countryCode: z.string().nonempty("Please enter your country code"),
    phoneNumber: z.string().nonempty("Phone number required"),
  });