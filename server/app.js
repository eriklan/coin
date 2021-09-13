// Import Koa framework
const koa = require('koa');
const cors = require('@koa/cors');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport')
// Import Mongoose
const mongoose = require('mongoose');

// Instantion Koa app
const app = new koa();
app.use(cors());
app.use(bodyParser());
app.use(passport.initialize())
app.use(passport.session())

require('./tools/passport')(passport)

// Enable the routes
const router = new Router();
const users = require('./router/users')

// Connect to database
mongoose
.connect("mongodb+srv://erik:erik@cluster0.vwttf.mongodb.net/coin", { useNewUrlParser: true})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.log(err)
})

// Configure router
router.use('/users', users)
app.use(router.routes()).use(router.allowedMethods());

// Configure port
const port = process.emitWarning.PORT || 8000;
app.listen(port, () => {
  console.log(`server started on ${port}`);
})