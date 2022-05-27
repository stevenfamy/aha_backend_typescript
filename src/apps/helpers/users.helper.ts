import PassVal from "password-validator";
import db from "../models";

const Users = db.users;
export const checkPasswordRequirement = async (password: string) => {
  const passReq = new PassVal();

  passReq
    .is()
    .min(8, "Password minimum should have 8 characters.")
    .is()
    .max(50, "Password should not exceed 50 characters.")
    .has()
    .uppercase(
      1,
      "Password should have at least 3 uppercase letters. (e.g ABCD)"
    )
    .has()
    .lowercase(
      1,
      "Password should have at least 3 lowercase letters. (e.g abcd)"
    )
    .has()
    .digits(1, "Password should have at least 1 digits or numbers. (e.g 0123)")
    .has()
    .symbols(
      1,
      "Password should have at least 1 symbols or special characters. (e.g !@#$)"
    );

  // check password agains basic requirement
  const result = passReq.validate(password, { details: true });

  return result;
};

export const getUserByEmail = async (email: string) =>
  Users.findOne({ where: { email } });
