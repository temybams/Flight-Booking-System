import {z} from 'zod'


const CreatePaymentSchema = z.object({
    amount: z.number().positive({ message: 'Amount must be a positive number' }),
    bookingId: z.number().positive({ message: 'Booking ID is required' }),
  });
  
  const ConfirmPaymentSchema = z.object({
    paymentIntentId: z.string().min(1, { message: 'Payment Intent ID is required' }), 
  });


export { CreatePaymentSchema, ConfirmPaymentSchema}