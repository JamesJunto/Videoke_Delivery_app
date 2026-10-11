import { db } from "../db.js"
export const getCustomerAccount = (email, callback) => {
  db.query(
    "SELECT * FROM customer_acc WHERE email = ?",
    [email],
    (err, result) => {
      if (err) return callback(err, null);

      callback(null, result[0] || null);
    },
  );
};
