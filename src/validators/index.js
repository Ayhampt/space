import { body } from "express-validator";

const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email Is Required")
      .isEmail()
      .withMessage("Email Is Invalid"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("username is Required")
      .isLowercase()
      .withMessage("Username must be in isLowercase")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 char"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
    body("fullName").optional().trim(),
  ];
};

const loginValidation = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email Is Required")
      .isEmail()
      .withMessage("Email Is Invalid"),
    ,
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ];
};
export { userRegisterValidator, loginValidation };
