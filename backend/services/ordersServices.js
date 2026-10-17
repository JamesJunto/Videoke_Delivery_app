import { db } from "../db.js";

export const createOrder = async (orderData) => {
  const conn = db.promise();

  try {
    await conn.beginTransaction();

    const [existing] = await conn.query(
      `SELECT customer_id
       FROM customer
       WHERE phone = ?
       LIMIT 1`,
      [orderData.contact_num]
    );

    let customer_id;

    if (existing.length > 0) {
      customer_id = existing[0].customer_id;
    } else {
      const [customer] = await conn.query(
        `INSERT INTO customer
         (name, phone, address)
         VALUES (?, ?, ?)`,
        [
          orderData.name,
          orderData.contact_num,
          orderData.address,
        ]
      );

      customer_id = customer.insertId;
    }

    const [products] = await conn.query(
      `SELECT product_id, price
       FROM product
       WHERE product_name = ?
       LIMIT 1`,
      [orderData.product_name]
    );

    if (products.length === 0) {
      throw new Error("Product not found in inventory.");
    }

    const product_id = products[0].product_id;
    const price = Number(products[0].price);
    const quantity = 1;

    const delivery_fee = Number(orderData.delivery_fee) || 0;
    const total = Number(orderData.total);
    const subtotal = total - delivery_fee;

    if (
      !Number.isFinite(total) ||
      !Number.isFinite(delivery_fee) ||
      subtotal < 0
    ) {
      throw new Error("Invalid order amount.");
    }

    await conn.query(
      `INSERT INTO orders
       (order_id, customer_id, subtotal, total, status)
       VALUES (?, ?, ?, ?, ?)`,
      [
        orderData.order_id,
        customer_id,
        subtotal,
        total,
        orderData.status || "pending",
      ]
    );

    await conn.query(
      `INSERT INTO order_items
       (order_id, product_id, quantity, price, subtotal)
       VALUES (?, ?, ?, ?, ?)`,
      [
        orderData.order_id,
        product_id,
        quantity,
        price,
        price * quantity,
      ]
    );

    await conn.commit();

    return {
      success: true,
    };
  } catch (error) {
    await conn.rollback();
    throw error;
  }
};
