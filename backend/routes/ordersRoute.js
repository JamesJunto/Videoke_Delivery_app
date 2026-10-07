import express from 'express'
import { db } from '../db.js'

const router = express.Router()
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

export default router
