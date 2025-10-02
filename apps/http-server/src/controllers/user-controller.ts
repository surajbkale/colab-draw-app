import { UserServices } from "../services";
import { Request, Response } from "express";

const userServices = new UserServices();

export const SignUp = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const user = await userServices.SignUp(data);
    res.status(200).json({
      message: "User signed up successfully",
      user,
    })
  } catch (error) {
    res.status(500).json({
      message: "Can't Signup",
      err: error
    })
  }
}

export const SignIn = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const user = await userServices.SignIn(data);
    res.status(200).json({
      message: "User Signed in successfully",
      user,
    })
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error
    })
  }
}