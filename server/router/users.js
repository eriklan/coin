const Router = require('koa-router')
const User = require('../model/User')
const encryption = require('../tools/hash')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('koa-passport')
const validator = require('../tools/validator')


const router = new Router()

/**
 * @route POST users/register
 * @desc Register a user
 * @access public
 */
router.post('/register', async ctx => {
  const { errors, isValid } = validator.validateRegisterInput(ctx.request.body)
  if (!isValid) {
    ctx.status = 400;
    ctx.body = errors
    return
  }

  const findResult = await User.find({ email: ctx.request.body.email })
  if (findResult.length > 0) {
    ctx.status = 500;
    ctx.body = {email: "You have already registered!"}
  } else {
    const newUser = new User({
      name: ctx.request.body.name,
      email: ctx.request.body.email,
      password: encryption.enbcrypt(ctx.request.body.password)
    })

    await newUser.save().then(user => {
      ctx.body = user
    })
    .catch(err => {
      console.log(err)
    })
    ctx.body = newUser
  }
})

/**
 * @router POST users/login
 * @desc Login a user and return a token
 * @access public
 */
router.post('/login', async ctx => {
  const { errors, isValid } = validator.validateLoginInput(ctx.request.body)
  if (!isValid) {
    ctx.status = 400;
    ctx.body = errors
    return
  }

  const findResult = await User.find({ email: ctx.request.body.email})
  const user = findResult[0]
  const password = ctx.request.body.password

  if (findResult.length == 0){
    ctx.status = 404;
    ctx.body = { email: 'You have not registered!'}
  } else {

    var result = await bcrypt.compareSync(password, user.password)

    if (result) {
      // Generate JWT token which expires in 1 hour
      const payload = { id: user.id, email: user.email}
      const token = jwt.sign(payload, 'secret', {expiresIn: 3600})

      ctx.status = 200
      ctx.body = {success: true, token: "Bearer " + token}

    } else {
      ctx.status = 400
      ctx.body = { password: 'Your password is wrong!'}
    }
  }
})

/**
 * @router GET users/current
 * @desc Check current user information
 * @access private
 */
router.get('/current', 
  passport.authenticate('jwt', {session: false}), 
  async ctx => {
  ctx.body = ctx.state.user
  }
)

module.exports = router.routes()