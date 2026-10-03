import express from 'express'
import { db } from '../db.js'

const router = express.Router()

router.get('/', (req, res) => {
    db.query("SELECT customer_id, CONCAT(first_name, ' ', last_name) AS FullName, phone, address, status FROM customers", (err, results) => {
        if (err) {
            console.error('Error fetching customers:', err)
            res.status(500).json({ error: 'Internal server error' })
        } else {
            console.log('Fetched customers:', results)
            res.json(results)
        }
    })
})

export default router