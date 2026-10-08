import { db } from "../db.js"

export const getInventory = (callback) => {
  db.query("SELECT * FROM inventory", (err, result) => {
      callback(err,result)
   })
}
export const createInventory = (productName, category, price, quantity, supplier) => {
  db.query(
      "INSERT INTO inventory (product_name, category, quantity, price, supplier) VALUES (?, ?, ?, ?, ?)",
      [productName, category, quantity, price, supplier],
      (err, results) => {
          if (err) {
              console.error('Error adding inventory item:', err)
          } else {
              console.log('Added inventory item:', results)
          }
      }
  )
}
