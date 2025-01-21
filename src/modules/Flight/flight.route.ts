import express from 'express'
import FlightController from './flight.controller';
import { validationMiddleware } from '../../middlewares';
import { CreateFlightSchema } from '../../validations/flight.validation';
import {authMiddleware} from '../../middlewares';


const FlightRouter = express.Router()

// FlightRouter.post(
//     '/',
//     authMiddleware,
//     validationMiddleware(CreateFlightSchema),
//     FlightController.createFlight
// );


FlightRouter.get('/search', authMiddleware, FlightController.searchFlights);

export default FlightRouter;