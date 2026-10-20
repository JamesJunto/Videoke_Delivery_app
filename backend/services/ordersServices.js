import { db } from "../db.js";

const splitName = (value) => {
  const parts = String(value ?? "").trim().split(/\s+/).filter(Boolean);
  const firstName = parts.shift() ?? "";

  return {
    firstName,
    lastName: parts.join(" ") || firstName,
  };
};

const validateDeliverySchedule = (value) => {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(String(value))) {
    throw new Error("Invalid delivery schedule. Use YYYY-MM-DD.");
  }

  return String(value);
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
      delivery_fee,
      delivery_schedule,
      payment_status = "Unpaid",
      status = "pending",
    } = orderData;

    if (!order_id || !name || !contact_num || !address || !product_name) {
      throw new Error("Missing required order fields.");
    }

    const deliverySchedule = validateDeliverySchedule(delivery_schedule);

    const deliveryFee = Number(delivery_fee);

    if (
      delivery_fee === undefined ||
      delivery_fee === null ||
      delivery_fee === "" ||
      !Number.isFinite(deliveryFee) ||
      deliveryFee < 0
    ) {
      throw new Error("Invalid delivery fee.");
    }

    const validPaymentStatuses = ["Unpaid", "50% paid", "Paid"];

    if (!validPaymentStatuses.includes(payment_status)) {
      throw new Error("Invalid payment status.");
    }

    const [existingCustomers] = await connection.query(
      "SELECT customer_id FROM customer WHERE phone = ? LIMIT 1",
      [contact_num]
    );

    let customerId;

    if (existingCustomers.length > 0) {
      customerId = existingCustomers[0].customer_id;
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
    const total = subtotal + deliveryFee;

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
      `INSERT INTO orders
       (
         order_id,
         customer_id,
         subtotal,
         delivery_fee,
         total,
         payment_status,
         delivery_schedule,
         status
       )
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        order_id,
        customerId,
        subtotal,
        deliveryFee,
        total,
        payment_status,
        deliverySchedule,
        status,
      ]
    );

    await connection.query(
      `INSERT INTO order_items
       (order_id, product_id, quantity, price, subtotal)
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
        CONCAT(c.first_name, ' ', c.last_name) AS name,
        c.phone,
        c.address,
        p.product_name,
        p.description,
        oi.quantity,
        oi.price,
        oi.subtotal,
        o.delivery_fee,
        o.total,
        o.payment_status,
        o.status,
        o.delivery_schedule
    FROM orders o
    INNER JOIN customer c
        ON o.customer_id = c.customer_id
    INNER JOIN order_items oi
        ON oi.order_id = o.order_id
    INNER JOIN product p
        ON oi.product_id = p.product_id
    ORDER BY o.created_at DESC;`
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
      delivery_fee,
      delivery_schedule,
      payment_status = "Unpaid",
      status = "pending",
    } = orderData;

    const deliverySchedule = validateDeliverySchedule(delivery_schedule);

    const deliveryFee = Number(delivery_fee);

    if (
      delivery_fee === undefined ||
      delivery_fee === null ||
      delivery_fee === "" ||
      !Number.isFinite(deliveryFee) ||
      deliveryFee < 0
    ) {
      throw new Error("Invalid delivery fee.");
    }

    const validPaymentStatuses = ["Unpaid", "50% paid", "Paid"];

    if (!validPaymentStatuses.includes(payment_status)) {
      throw new Error("Invalid payment status.");
    }

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
      [
        firstName,
        lastName,
        contact_num,
        address,
        orderRows[0].customer_id,
      ]
    );

    const [productRows] = await connection.query(
      `SELECT product_id, price
       FROM product
       WHERE product_name = ?
       LIMIT 1`,
      [product_name]
    );

    if (productRows.length === 0) {
      throw new Error("Product not found in inventory.");
    }

    const price = Number(productRows[0].price);

    if (!Number.isFinite(price) || price < 0) {
      throw new Error("Invalid product price.");
    }

    const subtotal = price;
    const total = subtotal + deliveryFee;

    await connection.query(
      `UPDATE orders
       SET status = ?,
           subtotal = ?,
           delivery_fee = ?,
           total = ?,
           payment_status = ?,
           delivery_schedule = ?
       WHERE order_id = ?`,
      [
        status,
        subtotal,
        deliveryFee,
        total,
        payment_status,
        deliverySchedule,
        orderId,
      ]
    );

    await connection.query(
      `UPDATE order_items
       SET product_id = ?, price = ?, subtotal = ?
       WHERE order_id = ?`,
      [productRows[0].product_id, price, subtotal, orderId]
    );

    await connection.commit();

    return {
      success: true,
      message: "Order updated successfully",
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const deleteOrder = async (orderId) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const [orders] = await connection.query(
      "SELECT order_id FROM orders WHERE order_id = ?",
      [orderId]
    );

    if (orders.length === 0) {
      throw new Error("Order not found.");
    }

    await connection.query(
      "DELETE FROM order_items WHERE order_id = ?",
      [orderId]
    );

    await connection.query(
      "DELETE FROM orders WHERE order_id = ?",
      [orderId]
    );

    await connection.commit();

    return {
      success: true,
      message: "Order deleted successfully",
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
