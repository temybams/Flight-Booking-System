import { z } from 'zod';
import { SignupSchema, LoginSchema } from '../validations/auth.validation';


type SignupDto = z.infer<typeof SignupSchema>
type LoginDto = z.infer<typeof LoginSchema>

export {SignupDto, LoginDto}