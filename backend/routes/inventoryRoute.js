import express from 'express'
import { db } from '../db.js'

const router = express.Router()

router.get('/', (req, res) => {
    db.query("SELECT * FROM inventory", (err, results) => {
        if (err) {
            console.error('Error fetching inventory:', err)
            res.status(500).json({ error: 'Internal server error' })
        } else {
            res.json(results)
        }
    })
})

router.post('/', (req, res) => {
    console.log('Received request body:', req.body);
    const { productName, category,price, quantity, supplier } = req.body;
    db.query(
        "INSERT INTO inventory (product_name, category, quantity, price, supplier) VALUES (?, ?, ?, ?, ?)",
        [productName, category, quantity, price, supplier],
        (err, results) => {
            if (err) {
                console.error('Error adding inventory item:', err)
                res.status(500).json({ error: 'Internal server error' })
            } else {
                console.log('Added inventory item:', results)
                res.status(201).json({ message: 'Inventory item added successfully' })
            }
        }
    )
}
)

export default router
