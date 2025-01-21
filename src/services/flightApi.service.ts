import axios from 'axios';



const FlightApiService = {
  getFlights: async (origin: string, destination: string, date: string) => {
    try {
      const response = await axios.get(`${ process.env.BASE_URL}/flights`, {
        params: {
          access_key: process.env.API_KEY,
          dep_iata: origin,
          arr_iata: destination,
          flight_date: date,
        },
      });

      return response.data.data; 
    } catch (error:any) {
      console.error('Error fetching flights from AviationStack:', error.response?.data || error.message);
      throw new Error('Failed to fetch flights');
    }
  },
};
