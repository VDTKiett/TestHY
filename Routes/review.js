import express from "express";
import {
  getAllReviews,
  createReview,
} from "../Controllers/reviewController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: API for managing reviews
 */

/**
 * @swagger
 * /reviews:
 *   get:
 *     tags:
 *       - Reviews
 *     summary: Get all reviews
 *     description: Retrieve all reviews for a specific resource
 *     responses:
 *       200:
 *         description: Successfully retrieved all reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   reviewId:
 *                     type: string
 *                     description: Unique identifier of the review
 *                   userId:
 *                     type: string
 *                     description: ID of the user who left the review
 *                   rating:
 *                     type: number
 *                     description: Rating given by the user
 *                   comment:
 *                     type: string
 *                     description: Comment provided by the user
 *   post:
 *     tags:
 *       - Reviews
 *     summary: Create a new review
 *     description: Allows a patient to create a new review
 *     security:
 *       - bearerAuth: []  # Token xác thực
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 description: Rating for the service (e.g., 1-5)
 *               comment:
 *                 type: string
 *                 description: Additional feedback about the service
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reviewId:
 *                   type: string
 *                   description: Unique identifier for the created review
 *       401:
 *         description: Unauthorized (Invalid token)
 *       403:
 *         description: Forbidden (User not authorized)
 */
router
  .route("/")
  .get(getAllReviews) // Lấy tất cả các đánh giá
  .post(authenticate, restrict(["patient"]), createReview); // Tạo đánh giá mới, chỉ dành cho bệnh nhân

export default router;
