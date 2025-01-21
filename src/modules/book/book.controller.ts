import { Request, Response, NextFunction } from 'express';
import BookService from '../book/book.services';
import httpStatus from 'http-status';
import { CreateBookingDto } from '../../dto/book.dto';
import { RequestWithUser } from '../../types';
import { catchAsync } from '../../middlewares';


const BookController = {
    createBoooking: catchAsync(async (req: RequestWithUser, res: Response) => {

        const booking = await BookService.createBooking(req.user!, req.body as CreateBookingDto);
        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            data: {
                booking
            },
        })
    }),

    getUserBookings: catchAsync(async (req: RequestWithUser, res: Response) => {

        const bookings = await BookService.getUserBookings(req.user!.id)
        res.status(201).json({
            success: true,
            message: 'Booking fetched successfully',
            data: {
                bookings
            },
        })
    })

}

export default BookController