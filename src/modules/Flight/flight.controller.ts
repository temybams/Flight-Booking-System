import { Request, Response } from "express";
import { catchAsync } from "../../middlewares";
import { CreateFlightDto } from "../../dto";
import FlightService from './flight.service'
import { RequestWithUser } from "../../types";

const FlightController = {
    searchFlights: catchAsync(async (req: RequestWithUser, res: Response) => {
        const { origin, destination, date } = req.query;
    
        const flights = await FlightService.searchFlights(
          origin as string,
          destination as string,
          date as string
        );
    
        res.status(200).json({
          success: true,
          message: 'Flights fetched successfully',
          data: flights,
        });
      }),


}

export default FlightController