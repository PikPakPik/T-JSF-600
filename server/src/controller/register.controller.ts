import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { RegisterDTO } from "../dto/register.dto";
import User from "../entity/User.entity";
import { ValidationErrorException } from "../exception/ValidationError.exception";
import { validationPipe } from "../util/validationPipe.util";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await validationPipe(RegisterDTO, { ...req.body });
  if (result instanceof ValidationErrorException) {
    return res
      .status(400)
      .json({
        success: false,
        message: result.message,
        errors: result.getErrors(),
      });
  }

  const user = new User();
  user.username = result.username;
  user.password = bcrypt.hashSync(result.password, 10);
  user.email = result.email;
  try {
    await user.save();
    await User.findOneAndUpdate(
      { _id: user._id },
      { lastLogin: new Date().toISOString() }
    );

    let token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ success: true, token: token });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      token: null,
      message: "An account already exists with this email address or username",
    });
  }
};
