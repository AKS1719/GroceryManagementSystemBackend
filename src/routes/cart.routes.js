import {Router} from 'express'
import {getCart} from '../controllers/cart.controller.js'

const router = new Router()


router.route('/getCart').get(getCart)

export default router;