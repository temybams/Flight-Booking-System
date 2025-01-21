import { z } from 'zod';
import { CreateFlightSchema} from '../validations/flight.validation';

type CreateFlightDto = z.infer<typeof CreateFlightSchema>;


export { CreateFlightDto };
