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

export const updateInventory = async (product_id, updatedInventory) => {
  const { product_name, description, price, stock, status } = updatedInventory;

  const [result] = await db.promise().query(
    `UPDATE product
     SET product_name = ?, description = ?, price = ?, stock = ?, status = ?
     WHERE product_id = ?`,
    [product_name, description, price, stock, status, product_id]
  );

  return result;
};
