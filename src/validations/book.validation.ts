import { z } from 'zod';

const CreateBookingSchema = z.object({
  flightId: z.number({ required_error: 'Flight ID is required' }),
  seatClass: z.enum(['ECONOMY', 'BUSINESS', 'FIRST_CLASS'], {
    required_error: 'Seat class is required',
  }),
  amount: z.number().positive({ message: 'Amount must be a positive number' }),
  origin: z.string().nonempty({ message: 'Origin is required' }),
  destination: z.string().nonempty({ message: 'Destination is required' }),
  date: z.string().nonempty({ message: 'Date is required' }),
})



export { CreateBookingSchema };