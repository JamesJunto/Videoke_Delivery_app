import express from 'express'
import customerRoute from './routes/customerRoute.js'
import inventoryRoute from './routes/inventoryRoute.js'
import cors from "cors";

const app = express()

app.use(cors());
app.use(express.json());

app.use('/api/customers', customerRoute)
app.use('/api/inventory', inventoryRoute)


app.listen(3000, () => {
    console.log('Server is running on port 3000')
})