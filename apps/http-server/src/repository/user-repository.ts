import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prismaClient } from "@repo/db/prismaClient";
import {
  NotFoundError,
  UnauthorizedError,
} from "../errorhandlers/client-error";

class UserRepository {
  constructor() {}

  async SignUp(data: any) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = await prismaClient.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
        },
      });
      const jwtToken = jwt.sign({ id: user.id }, "mysecret");
      console.log(`token: ${jwtToken}`);
      console.log(`User: ${user}`);
      return jwtToken;
    } catch (error) {
      throw new Error("Error signing up user");
      throw error;
    }
  }

  async SignIn(data: any) {
    try {
      const user = await prismaClient.user.findUnique({
        where: { email: data.email },
      });
      if (!user) {
        throw new NotFoundError("User not found");
      }
      const isMatchedPassword = await bcrypt.compare(
        data.password,
        user.password
      );
      if (!isMatchedPassword) {
        throw new UnauthorizedError("Invalid password");
      }
      const jwtToken = jwt.sign({ id: user?.id }, "mysecret");
      return jwtToken;
    } catch (error) {
      console.log(`Error has occurred while signing in: ${error}`);
      throw error;
    }
  }
}

export { UserRepository };
