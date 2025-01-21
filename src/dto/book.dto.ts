import {z} from 'zod';
import { CreateBookingSchema } from '../validations/book.validation';

type CreateBookingDto = z.infer<typeof CreateBookingSchema>;

export { CreateBookingDto};