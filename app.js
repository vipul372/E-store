//environment varibales are used to hide internal ports and paths
require("dotenv").config() //this code is taken from env docs

var mongoose = require("mongoose")
const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const path = require("path")
const app = express()

//My routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")
const paymentBRoutes = require("./routes/paymentBraintree") //Braintree payment gateway

//DB connection
const DB_URI =
  process.env.NODE_ENV == "production"
    ? process.env.DATABASE_PROD
    : process.env.DATABASE_DEV
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB Connected")
  })

//our routes will be processed through these middlewares
//Document dependent code
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//we are creating an api here so it must be prefixed with every routes eg. localhost/8000/api/signout
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", categoryRoutes)
app.use("/api", productRoutes)
app.use("/api", orderRoutes)
app.use("/api", paymentBRoutes)

//serve static asset if in production
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/client/build")))
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "client", "build", "index.html")
    )
  })
}
//defining port
const port = process.env.PORT || 8000

//starting a express server
app.listen(port, () => {
  console.log(`app is running at ${port}`)
})
