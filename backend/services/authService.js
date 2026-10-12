import { db } from "../db.js";

export const getCustomerAccount = async (email) => {
  const [result] = await db.promise().query(
    "SELECT * FROM customer_acc WHERE email = ?",
    [email]
  );

  return result[0] || null;
};


export const AddAccount = async (
  first_name,
  last_name,
  phone,
  address,
  email,
  password
) => {
  const connection = db.promise();

  try {
    await connection.beginTransaction();

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
      [customer_id, email, password]
    );

    await connection.commit();

    return customer_id;
  } catch (error) {
    await connection.rollback();
    console.error("AddAccount database error:", error);
    throw error;
  }
};
