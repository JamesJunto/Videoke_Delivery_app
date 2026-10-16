import { db } from "../db.js";
import bcrypt from "bcrypt";

export const getCustomerAccount = async (email, password) => {
  const [rows] = await db.promise().query(
    "SELECT * FROM customer_acc WHERE email = ?",
    [email]
  );

  if (rows.length === 0) {
    return null
  }

  const account = rows[0]
  const isMatch = await bcrypt.compare(password, account.password_hash)

  if (!isMatch) {
   return null
  }

  return account

};

export const AddAccount = async (email,password) => {
  const connection = db.promise();

  try {

    await connection.beginTransaction();

    const hashPassword = await bcrypt.hash(password, 10)

    await connection.query(
      `INSERT INTO customer_acc
       (email, password_hash)
       VALUES (?, ?)`,
      [ email, hashPassword]
    );

    await connection.commit();
    return customer_id;

  } catch (error) {
    await connection.rollback();
    console.error("AddAccount database error:", error);
    throw error;
  }
};
