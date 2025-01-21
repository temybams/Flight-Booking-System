import FlightApiService from '../../services/flightApi.service';
import { throwError } from '../../utils';
import httpStatus from 'http-status';

const FlightService = {
  searchFlights: async (origin: string, destination: string, date: string) => {
    const flights = await FlightApiService.getFlights(origin, destination, date);

    if (!origin || !destination || !date) {
      throwError('Missing required query parameters', httpStatus.BAD_REQUEST);
    }
    if (!flights || !flights.length) {
      throwError('No flights found matching the search criteria', httpStatus.NOT_FOUND);
    }

    return flights.map((flight: any) => ({
      flightNumber: flight.flight.iata,
      departureTime: flight.departure.scheduled,
      arrivalTime: flight.arrival.scheduled,
      origin: flight.departure.iata,
      destination: flight.arrival.iata,
      airline: flight.airline.name,
    }));
  },
};

export default FlightService;
