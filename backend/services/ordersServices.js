import { db } from "../db.js";

const splitName = (value) => {
  const parts = String(value ?? "").trim().split(/\s+/).filter(Boolean);
  const firstName = parts.shift() ?? "";
  return { firstName, lastName: parts.join(" ") || firstName };
};

export const createOrder = async (orderData) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const {
      order_id,
      name,
      contact_num,
      address,
      product_name,
      status = "pending",
    } = orderData;

    if (!order_id || !name || !contact_num || !address || !product_name) {
      throw new Error("Missing required order fields.");
    }

    const [existingCustomers] = await connection.query(
      "SELECT customer_id FROM customer WHERE phone = ? LIMIT 1",
      [contact_num]
    );

    let customerId;
    if (existingCustomers.length > 0) {
      customerId = existingCustomers[0].customer_id;
      await connection.query(
        "UPDATE customer SET address = ? WHERE customer_id = ?",
        [address, customerId]
      );
    } else {
      const { firstName, lastName } = splitName(name);
      const [customerResult] = await connection.query(
        `INSERT INTO customer (first_name, last_name, phone, address)
         VALUES (?, ?, ?, ?)`,
        [firstName, lastName, contact_num, address]
      );
      customerId = customerResult.insertId;
    }

    const [products] = await connection.query(
      `SELECT product_id, price, stock
       FROM product
       WHERE product_name = ?
       LIMIT 1`,
      [product_name]
    );

    if (products.length === 0) {
      throw new Error("Product not found in inventory.");
    }

    const productId = products[0].product_id;
    const price = Number(products[0].price);
    if (!Number.isFinite(price) || price < 0) {
      throw new Error("Invalid product price.");
    }

    const subtotal = price;
    const total = subtotal;
    const [stockResult] = await connection.query(
      `UPDATE product
       SET stock = stock - 1
       WHERE product_id = ? AND stock >= 1`,
      [productId]
    );

    if (stockResult.affectedRows === 0) {
      throw new Error("Insufficient stock.");
    }

    await connection.query(
      `INSERT INTO orders (order_id, customer_id, subtotal, total, status)
       VALUES (?, ?, ?, ?, ?)`,
      [order_id, customerId, subtotal, total, status]
    );

    await connection.query(
      `INSERT INTO order_items (order_id, product_id, quantity, price, subtotal)
       VALUES (?, ?, ?, ?, ?)`,
      [order_id, productId, 1, price, subtotal]
    );

    await connection.commit();
    return { success: true, order_id };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const getOrders = async () => {
  const [results] = await db.query(
    `SELECT
        o.order_id,
        o.status,
        CONCAT(c.first_name, ' ', c.last_name) AS name,
        c.phone,
        p.product_name,
        p.description,
        c.address,
        oi.quantity,
        oi.price,
        oi.subtotal,
        o.total
     FROM orders o
     INNER JOIN order_items oi ON oi.order_id = o.order_id
     INNER JOIN customer c ON o.customer_id = c.customer_id
     INNER JOIN product p ON oi.product_id = p.product_id
     ORDER BY o.created_at DESC`
  );

  return results;
};

export const updateOrder = async (orderId, orderData) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const {
      name,
      contact_num,
      address,
      product_name,
      status = "pending",
    } = orderData;

    const [orderRows] = await connection.query(
      "SELECT customer_id FROM orders WHERE order_id = ?",
      [orderId]
    );
    if (orderRows.length === 0) {
      throw new Error("Order not found.");
    }

    const { firstName, lastName } = splitName(name);
    await connection.query(
      `UPDATE customer
       SET first_name = ?, last_name = ?, phone = ?, address = ?
       WHERE customer_id = ?`,
      [firstName, lastName, contact_num, address, orderRows[0].customer_id]
    );

    const [productRows] = await connection.query(
      "SELECT product_id, price FROM product WHERE product_name = ? LIMIT 1",
      [product_name]
    );
    if (productRows.length === 0) {
      throw new Error("Product not found in inventory.");
    }

    const price = Number(productRows[0].price);
    await connection.query(
      `UPDATE orders
       SET status = ?, subtotal = ?, total = ?
       WHERE order_id = ?`,
      [status, price, price, orderId]
    );
    await connection.query(
      `UPDATE order_items
       SET product_id = ?, price = ?, subtotal = ?
       WHERE order_id = ?`,
      [productRows[0].product_id, price, price, orderId]
    );
    await connection.commit();
    return { success: true, message: "Order updated successfully" };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
