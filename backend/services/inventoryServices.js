import { db } from "../db.js";

export const getInventory = async () => {
  const [rows] = await db.promise().query(
    "SELECT * FROM product"
  );

  return rows;
};

export const createInventory = async (product_name, description, price, stock) => {
  const [result] = await db.promise().query(
    `INSERT INTO product (product_name, description, price, stock)
     VALUES (?, ?, ?, ?) AS new
     ON DUPLICATE KEY UPDATE stock = product.stock + new.stock`,
    [product_name, description, price, stock]
  );

  return result;
};
