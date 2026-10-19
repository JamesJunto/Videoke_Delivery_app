import { db } from "../db.js";

export const getCustomer = async () => {
  const [rows] = await db.promise().query(
    "SELECT customer_id, CONCAT(first_name, ' ', last_name) AS FullName, phone, address, status FROM customer"
  );

  return rows;
};
