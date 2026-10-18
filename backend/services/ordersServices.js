
import { db } from "../db.js";

export const createOrder = async (orderData) => {
  const conn = db.promise();

  try {
    await conn.beginTransaction();

    const {
      order_id,
      name,
      contact_num,
      address,
      product_name,
      delivery_schedule,
      delivery_fee,
      status,
    } = orderData;

    const [existing] = await conn.query(
      `SELECT customer_id
       FROM customer
       WHERE phone = ?
       LIMIT 1`,
      [contact_num]
    );

    let customer_id;

    if (existing.length > 0) {
      customer_id = existing[0].customer_id;
    } else {
      const [customer] = await conn.query(
        `INSERT INTO customer (name, phone, address)
         VALUES (?, ?, ?)`,
        [name, contact_num, address]
      );

      customer_id = customer.insertId;
    }

    const [products] = await conn.query(
      `SELECT product_id, price, stock
       FROM product
       WHERE product_name = ?
       LIMIT 1`,
      [product_name]
    );

    if (products.length === 0) {
      throw new Error("Product not found in inventory.");
    }

    const product_id = products[0].product_id;
    const price = Number(products[0].price);
    const quantity = 1;
    const stock = Number(products[0].stock);
    const AvailableStock = stock - quantity;


    const fee = Number(delivery_fee ?? 0);

    if (
      !Number.isFinite(price) ||
      price < 0 ||
      !Number.isFinite(fee) ||
      fee < 0
    ) {
      throw new Error("Invalid product price or delivery fee.");
    }

    if (!Number.isInteger(stock) || stock < quantity) {
      throw new Error("Insufficient stock.");
    }

    const itemSubtotal = price * quantity;
    const total = itemSubtotal + fee;

    const [stockResult] = await conn.query(
      `UPDATE product
       SET stock = ?
       WHERE product_id = ?
         AND stock >= ?`,
      [AvailableStock, product_id, quantity]
    );

    if (stockResult.affectedRows === 0) {
      throw new Error("Insufficient stock.");
    }

    await conn.query(
      `INSERT INTO orders
       (order_id, customer_id, subtotal, status, delivery_fee, total, delivery_schedule)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        order_id,
        customer_id,
        itemSubtotal,
        status || "pending",
        fee,
        total,
        delivery_schedule,
      ]
    );

    await conn.query(
      `INSERT INTO order_items
       (order_id, product_id, quantity, price, subtotal)
       VALUES (?, ?, ?, ?, ?)`,
      [order_id, product_id, quantity, price, itemSubtotal]
    );

    await conn.commit();

    return {
      success: true,
      order_id,
    };
  } catch (error) {
    await conn.rollback();
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const [results] = await db.promise().query(
      `SELECT
          o.order_id,
          o.status,
          c.name,
          c.phone,
          p.product_name,
          p.description,
          o.delivery_schedule,
          c.address,
          oi.quantity,
          oi.price,
          oi.subtotal,
          o.delivery_fee,
          o.total
       FROM order_items oi
       INNER JOIN orders o
          ON oi.order_id = o.order_id
       INNER JOIN customer c
          ON o.customer_id = c.customer_id
       INNER JOIN product p
          ON oi.product_id = p.product_id`
    );

    return results;
  } catch (error) {
    console.log("Error fetching orders from database:", error);
    throw error;
  }
};

export const updateOrder = async (order_id, orderData) => {
  const conn = db.promise();

  try {
    await conn.beginTransaction();

    const {
      name,
      contact_num,
      address,
      product_name,
      delivery_schedule,
      delivery_fee,
      total,
      status,
    } = orderData;

    await conn.query(
      `UPDATE orders
       SET status = ?,
           delivery_schedule = ?,
           delivery_fee = ?,
           total = ?
       WHERE order_id = ?`,
      [status, delivery_schedule, delivery_fee, total, order_id]
    );

    await conn.query(
      `UPDATE customer c
       INNER JOIN orders o ON o.customer_id = c.customer_id
       SET c.name = ?,
           c.phone = ?,
           c.address = ?
       WHERE o.order_id = ?`,
      [name, contact_num, address, order_id]
    );

    await conn.query(
      `UPDATE order_items oi
       INNER JOIN product p ON p.product_name = ?
       SET oi.product_id = p.product_id
       WHERE oi.order_id = ?`,
      [product_name, order_id]
    );

    await conn.commit();

    return {
      success: true,
      message: "Order updated successfully",
    };
  } catch (error) {
    await conn.rollback();
    console.error("Error updating order:", error);
    throw error;
  }
};
