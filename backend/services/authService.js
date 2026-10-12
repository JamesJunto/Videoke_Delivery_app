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

export const AddAccount = async (first_name,last_name, phone,address, email,password) => {
  const connection = db.promise();

  try {

    await connection.beginTransaction();

    const hashPassword = await bcrypt.hash(password, 10)

    const [customerResult] = await connection.query(
      `INSERT INTO customers
       (first_name, last_name, phone, address)
       VALUES (?, ?, ?, ?)`,
      [first_name, last_name, phone, address]
    );

    const customer_id = customerResult.insertId;

    await connection.query(
      `INSERT INTO customer_acc
       (customer_id, email, password_hash)
       VALUES (?, ?, ?)`,
      [customer_id, email, hashPassword]
    );

    await connection.commit();
    return customer_id;

  } catch (error) {
    await connection.rollback();
    console.error("AddAccount database error:", error);
    throw error;
  }
};
