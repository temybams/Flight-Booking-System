import express from 'express'
import AuthRouter from '../modules/auth/auth.route'
import FlightRouter from '../modules/Flight/flight.route'
import BookRouter from '../modules/book/book.route'



const router = express.Router()


router.use('/auth', AuthRouter)
router.use('/flight', FlightRouter)
router.use('/book', BookRouter)

export default router
