import express from 'express'
import customerRoute from './routes/customerRoute.js'
import cors from "cors";

const app = express()

app.use(cors());
app.use(express.json());

app.use('/api/customers', customerRoute)


app.listen(3000, () => {
    console.log('Server is running on port 3000')
})