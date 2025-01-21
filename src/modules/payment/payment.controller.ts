import { Request, Response } from "express";
import { catchAsync } from "../../middlewares";
import PaymentService from "./payment.service";
import { RequestWithUser } from "../../types";


const PaymentController = {
    createPayment: catchAsync(async (req: RequestWithUser, res: Response) => {
        const { amount, email, bookingId } = req.body;

        const paymentResult = await PaymentService.createPaymentIntent(amount, email, bookingId);

        if (!paymentResult) {
            return res.status(400).json({
                success: false,
                message: 'Payment initiation failed',
            });
        }
        const { authorizationUrl, payment } = paymentResult;

        res.status(201).json({
            success: true,
            message: 'Payment initiated successfully',
            data: { payment, authorizationUrl },
        });
    }),


    confirmPayment: catchAsync(async (req: Request, res: Response) => {
        const { reference } = req.body;

        const confirmation = await PaymentService.confirmPayment(reference);

        res.status(200).json({
            success: true,
            message: confirmation ? confirmation.message : 'Payment confirmation failed',
        });
    }),
}


