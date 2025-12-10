import { validationResult } from "express-validator";
import { ApiResponse } from "../utils/api-response.js";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractErrors = [];
  errors.array().map((err) => extractErrors.push({ [err.path]: err.msg }));

  return res
    .status(422)
    .json(
      new ApiResponse(
        422,
        { errors: extractErrors },
        "Received data is not valid",
      ),
    );
};
