import { prisma } from '../../services';
import httpStatus from 'http-status'
import { RequestUser } from '../../types';
import { CreateBookingDto } from '../../dto/book.dto';
import { throwError } from '../../utils'
import { SeatClass } from '@prisma/client';
import FlightApiService from '../../services/flightApi.service';


const BookService = {

  createBooking: async (user: RequestUser, dto: CreateBookingDto) => {
    const { flightId, seatClass, amount, origin, destination, date } = dto;

    const flights = await FlightApiService.getFlights(origin, destination, date);
    const flight = flights.find((f: any) => f.flightId === flightId);


    if (!flight) {
      throwError('Flight not found', httpStatus.NOT_FOUND);
    }

    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        flightId: flight.id || null,
        seatClass,
        totalAmount: amount,
      },
    });

    return booking;
  },



  getUserBookings: async (userId: number) => {
    const bookings = await  prisma.booking.findMany({
      where: { userId },
    });

    if (!bookings.length) {
      throwError('No bookings found for this user', httpStatus.NOT_FOUND);
    }

    return bookings;
  }

}


export default BookService;