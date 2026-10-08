import { db } from "../db.js"

export const getCustomer = (callback) => {
  db.query("SELECT customer_id, CONCAT(first_name, ' ', last_name) AS FullName, phone, address, status FROM customers", (err, results) => {
     callback(err,results)
  })
}
