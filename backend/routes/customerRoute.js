import express from 'express'
import { getCustomer } from '../services/customerServices.js'

const router = express.Router()

router.get('/', (req, res) => {
  getCustomer((err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching orders");
    }
    res.json(result);
 })
})

export default router
