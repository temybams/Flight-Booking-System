import z from 'zod'
import { CreatePaymentSchema, ConfirmPaymentSchema } from '../validations/payment.validation';


type CreatePaymentDto = z.infer<typeof CreatePaymentSchema>;
type ConfirmPaymentDto = z.infer<typeof ConfirmPaymentSchema>;