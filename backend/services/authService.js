
import { db } from "../db.js";
import bcrypt from "bcrypt";

export const getAdminAccount = async (email, password) => {
  const [rows] = await db.query(
    "SELECT * FROM admin_acc WHERE email = ?",
    [email]
  );

  if (rows.length === 0) {
    return null;
  }

  const account = rows[0];
  const isMatch = await bcrypt.compare(
    password,
    account.password_hash
  );

  if (!isMatch) {
    return null;
  }

  return account;
};

export const addAdminAccount = async (email, password) => {
  try {
    const hashPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO admin_acc
       (email, password_hash)
       VALUES (?, ?)`,
      [email, hashPassword]
    );

    return result.insertId;
  } catch (error) {
    console.error("AddAccount database error:", error);
    throw error;
  }
};
