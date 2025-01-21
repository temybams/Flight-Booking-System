import { z } from 'zod';

const CreateFlightSchema = z.object({
    flightNumber: z.string().min(1, { message: 'Flight number is required' }), 
    departureTime: z.string().min(1, { message: 'Departure time is required' }),
    arrivalTime: z.string().min(1, { message: 'Arrival time is required' }),
    origin: z.string().min(1, { message: 'Origin is required' }),
    destination: z.string().min(1, { message: 'Destination is required' }),
    economySeatsAvailable: z.number().min(0, { message: 'Economy seats must be non-negative' }),
    businessSeatsAvailable: z.number().min(0, { message: 'Business seats must be non-negative' }),
    firstClassSeatsAvailable: z.number().min(0, { message: 'First class seats must be non-negative' }),
    airlineId: z.number({ required_error: 'Airline ID is required' }),
});

export { CreateFlightSchema };
