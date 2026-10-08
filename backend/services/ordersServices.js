import { db } from '../db.js'
const price = 222;

export const createOrder = (order_id, customer_id, items, total) => {
  items.forEach((item) => {
    const { product_id, quantity } = item;
    db.query(
      `INSERT INTO orders
      (order_id, customer_id, product_id, total, quantity, price)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [order_id, customer_id, product_id, total, quantity, price],
      (err, result) => {
        if (err) {
          console.error(err);
        }
      }
    );
  });
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
