import express from 'express'
import BookController from '../book/book.controller'
import { validationMiddleware, authMiddleware } from '../../middlewares'
import { CreateBookingSchema  } from '../../validations/book.validation'

const BookRouter = express.Router();


BookRouter.post('/book', authMiddleware, validationMiddleware(CreateBookingSchema ), BookController.createBoooking);

BookRouter.get('/bookings', authMiddleware, BookController.getUserBookings);



export default BookRouter