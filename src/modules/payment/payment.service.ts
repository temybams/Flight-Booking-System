import axios from 'axios';
import { prisma } from '../../services';
import { throwError } from '../../utils';
import httpStatus from 'http-status';
import { PaymentStatus } from '@prisma/client';


const PaymentService = {
    createPaymentIntent: async (amount: number, email: string, bookingId: number) => {
        
        try {
            const response = await axios.post(
                `${process.env.PAYSTACK_BASE_URL}/transaction/initialize`,
                {
                    email,
                    amount: Math.round(amount * 100), 
                    metadata: { bookingId },
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    },
                }
            );

            const payment = await prisma.payment.create({
                data: {
                    amount,
                    status: PaymentStatus.PENDING,
                    bookingId,
                },
            });

            return { payment, authorizationUrl: response.data.data.authorization_url };
        } catch (error: any) {
            console.error('Paystack Error:', error.response?.data || error.message);
            throwError('Payment creation failed', httpStatus.INTERNAL_SERVER_ERROR);
        }
    },

    confirmPayment: async (reference: string) => {
        try {
            const response = await axios.get(`${process.env.PAYSTACK_BASE_URL}/transaction/verify/${reference}`, {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            });

            const paymentData = response.data.data;

            if (paymentData.status === 'success') {
                const bookingId = parseInt(paymentData.metadata.bookingId);

                await prisma.payment.updateMany({
                    where: { bookingId },
                    data: { status: PaymentStatus.COMPLETED},
                });

                return { status: 'success', message: 'Payment completed successfully' };
            } else {
                throwError('Payment not completed', httpStatus.BAD_REQUEST);
            }
        } catch (error:any) {
            console.error('Paystack Error:', error.response?.data || error.message);
            throwError('Payment verification failed', httpStatus.INTERNAL_SERVER_ERROR);
        }
    },
};

export default PaymentService;
