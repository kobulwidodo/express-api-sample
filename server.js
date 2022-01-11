const express = require('express')
const cors = require('cors')
const productRouter = require('./routes/productRouter')
const authRouter = require('./routes/authRouter')

const app = express()

const corOptions = {
  origin: '*'
}

app.use(cors(corOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({ message: 'hello from api' })
})

app.use('/api/product', productRouter)
app.use('/api/auth', authRouter)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`)
})
