import { db } from "../db.js";

export const getInventory = async () => {
  const [rows] = await db.promise().query(
    "SELECT * FROM inventory"
  );

  return rows;
};

export const createInventory = async (productName, category, price, quantity, supplier) => {
  const [result] = await db.promise().query(
    "INSERT INTO inventory (product_name, category, quantity, price, supplier) VALUES (?, ?, ?, ?, ?)",
    [productName, category, quantity, price, supplier]
  );

  return result;
};
