// Purpose of this file

// This file validates the user's input before it reaches the controller or database.

// Its responsibilities are:

// Validate registration data.
// Validate login data.
// Return meaningful error messages if the input is invalid.

// It prevents invalid data from entering your application.

import Joi from "joi"


const registerSchema= Joi.object({
    username:Joi.string()
     .min(2)
     .max(50)
     .required()
     .messages({
        "string.min":"Name must bea at least 2 characters",
        "string.max":"Name cannot exceed 50 characters",
        "any.required":"Name is required",
     }),

     email:Joi.string()
      .email()
      .required()
      .messages({
        "string.email":"Please enter a valid email",
        "any.required":"Email is required",
      }),

      password:Joi.string()
        .min(6)
        .required()
        .messages({
            "string.min":"Password must be at least 6 characters",
            "any.required":"Password is required",
        })
});


const loginSchema = Joi.object({
    email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Please enter a valid email",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .required()
    .messages({
      "any.required": "Password is required",
    }),
})

export {
    registerSchema,
    loginSchema
}