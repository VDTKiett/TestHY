import express from "express";
import { authenticate } from "../auth/verifyToken.js";
import { getCheckoutSession } from "../Controllers/bookingController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: Operations related to doctor bookings
 */

/**
 * @swagger
 * /checkout-session/{doctorId}:
 *   post:
 *     tags:
 *       - Booking
 *     summary: Create a checkout session
 *     description: Create a checkout session for booking a doctor
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         required: true
 *         description: The ID of the doctor
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []  # Token xác thực
 *     responses:
 *       200:
 *         description: Successfully created checkout session
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sessionId:
 *                   type: string
 *                   description: The ID of the checkout session
 *                 url:
 *                   type: string
 *                   description: The URL to the checkout session
 *       401:
 *         description: Unauthorized (Invalid token)
 *       400:
 *         description: Bad request (Invalid doctor ID or other input)
 *       404:
 *         description: Doctor not found
 */
router.post("/checkout-session/:doctorId", authenticate, getCheckoutSession);

export default router;
