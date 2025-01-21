const calculateSeatPrice = (seatClass: 'ECONOMY' | 'BUSINESS' | 'FIRST_CLASS'): number => {
  const prices = {
    ECONOMY: 100,
    BUSINESS: 300,
    FIRST_CLASS: 500,
  };

  return prices[seatClass];
};

export default calculateSeatPrice;
