import express from 'express'
// import cors from 'cors'
import { productsRouter } from './routes/prduct.routes.js'

const app = express()

// app.use(cors())
app.use(express.json())
app.use('/products', productsRouter)

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})