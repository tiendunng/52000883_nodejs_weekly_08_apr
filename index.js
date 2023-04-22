const express = require('express');
const createError = require('http-errors');
require('express-async-errors');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const { engine } = require('express-handlebars');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit')

dotenv.config();  

const authRouter = require('./routes/auth.route');
const productRouter = require('./routes/product.route');
const orderRouter = require('./routes/order.route');

const app = express();

var uri = 'mongodb://127.0.0.1:27017/ecommerce';
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log('MongoDB connection established sucessfully');
})

app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());
app.use(cors());

app.set('view engine', 'handlebars');
app.engine('handlebars', engine({
  layoutsDir: __dirname + '/views',
}));

app.set('views', path.join(__dirname, '/views'));
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 50, // limit each IP to 50 requests per windowMs
  message: 'Quá nhiều request tới website, vui lòng thử lại sau'
})
app.use(limiter)

app.get('/', (req, res) => {
  if (!req.user) {
    return res.redirect('/auth/login')
  }
  return res.render('home', {layout: false})
})

app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/', (req, res) => {
  res.status(404).json({
    message: 'Endpoint not found'
  })
})

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  console.log(err.stack);
  res.status(err.status || 500).send(err.message);
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${server.address().port}`);
});