import { db } from "../db.js";

export const getInventory = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM product");
    return rows;
  } catch (error) {
    console.error("Error getting inventory:", error);
    throw error;
  }
};

export const createInventory = async (product_name, description, price, stock) => {
  try {
    const [result] = await db.query(
      `INSERT INTO product (product_name, description, price, stock)
       VALUES (?, ?, ?, ?) AS new
       ON DUPLICATE KEY UPDATE stock = product.stock + new.stock`,
      [product_name, description, price, stock]
    );
    return result;
  } catch (error) {
    console.error("Error creating inventory:", error);
    throw error;
  }
};

export const updateInventory = async (product_id, updatedInventory) => {
  const { product_name, description, price, stock, status } = updatedInventory;

  try {
    const [result] = await db.query(
      `UPDATE product
       SET product_name = ?, description = ?, price = ?, stock = ?, status = ?
       WHERE product_id = ?`,
      [product_name, description, price, stock, status, product_id]
    );
    return result;
  } catch (error) {
    console.error("Error updating inventory:", error);
    throw error;
  }
};

export const deleteInventory = async (product_id) => {
  try {
    const [result] = await db.query(
      "DELETE FROM product WHERE product_id = ?",
      [product_id]
    );

    if (result.affectedRows === 0) {
      throw new Error("Inventory item not found.");
    }

    return result;
  } catch (error) {
    console.error("Error deleting inventory:", error);
    throw error;
  }
};
