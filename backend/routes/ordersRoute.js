import express from 'express'
import { db } from '../db.js'

const router = express.Router()
//FAKE DATA PA
const price = 222
router.post('/', (req, res) => {
  const { order_id, customer_id, items, total } = req.body

  items.forEach((item) => {
    const { product_id, quantity } = item

    db.query(
      'INSERT INTO orders (order_id, customer_id, product_id, total, quantity, price) VALUES (?, ?, ?, ?, ?, ?)',
      [order_id, customer_id, product_id, total, quantity, price],
      (err, result) => {
        if (err) {
          console.error(err)
        }
      }
    )
  })

  res.status(201).send('Order created successfully')
})

router.get('/', (req, res) => {
  db.query(
    `SELECT
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
      if (err) {
        console.error(err);
        return res.status(500).send('Error fetching orders');
      }

      res.json(result);
    }
  );
});

export default router
