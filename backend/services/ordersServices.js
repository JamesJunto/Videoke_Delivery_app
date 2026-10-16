import { db } from '../db.js'

export const createOrder = async (orderData) => {
  const conn = db.promise()

  try {
    await conn.beginTransaction();

    let customer_id;
    const [existing] = await conn.query(
      "SELECT customer_id FROM customer WHERE contact_num = ? LIMIT 1",
      [orderData.contact_num]
    );

    if (existing.length > 0) {
      customer_id = existing[0].customer_id;
    } else {
      const [customerResult] = await conn.query(
        `INSERT INTO customer (customer_name, contact_num, address)
         VALUES (?, ?, ?)`,
        [orderData.customer_name, orderData.contact_num, orderData.address]
      );
      customer_id = customerResult.insertId;
    }

    await conn.query(
      `INSERT INTO orders
         (order_id, customer_id, delivery_schedule, delivery_fee, subtotal, total, status, payment_status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderData.order_id,
        customer_id,
        orderData.delivery_schedule,
        orderData.delivery_fee,
        orderData.total,
        orderData.total,
        "pending",
        orderData.payment_status,
      ]
    );

    await conn.commit();

    return {
      success: true,
      order_id: orderData.order_id,
      customer_id,
    };
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};


export const getOrders = (callback) => {
  db.query(
    `SELECT
        o.id,
        o.order_id,
        o.customer_id,
        p.product_name,
        o.total,
        o.quantity,
        o.price
    FROM orders o
    JOIN inventory p
        ON o.product_id = p.product_id`,
    (err, result) => {
      callback(err, result);
    }
  );
};
