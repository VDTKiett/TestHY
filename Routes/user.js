import express from "express";
import {
  updateUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  getUserProfile,
  getMyAppointments,
} from "../Controllers/userController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user details by ID
 *     description: Retrieve detailed information of a specific user by ID (patient only).
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: [] # Token xác thực
 *     responses:
 *       200:
 *         description: Successfully retrieved user details
 *         content:
 *           application/json:
 *             example: { "id": "1", "name": "John Doe", "role": "patient" }
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: User not found
 */
router.get("/:id", authenticate, restrict(["patient"]), getSingleUser);

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     description: Retrieve a list of all users (admin only).
 *     security:
 *       - bearerAuth: [] # Token xác thực
 *     responses:
 *       200:
 *         description: Successfully retrieved user list
 *         content:
 *           application/json:
 *             example: [{ "id": "1", "name": "John Doe", "role": "admin" }]
 *       401:
 *         description: Unauthorized access
 */
router.get("/", authenticate, restrict(["admin"]), getAllUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update user details by ID
 *     description: Update information for a specific user by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: [] # Token xác thực
 *     requestBody:
 *       description: User details to update
 *       required: true
 *       content:
 *         application/json:
 *           example: { "name": "New Name", "email": "newemail@example.com" }
 *     responses:
 *       200:
 *         description: Successfully updated user details
 *       400:
 *         description: Invalid data
 *       404:
 *         description: User not found
 */
router.put("/:id", authenticate, restrict(["patient"]), updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete user by ID
 *     description: Remove a specific user by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: [] # Token xác thực
 *     responses:
 *       200:
 *         description: Successfully deleted user
 *       404:
 *         description: User not found
 */
router.delete("/:id", authenticate, restrict(["patient"]), deleteUser);

/**
 * @swagger
 * /users/profile/me:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get current user's profile
 *     description: Retrieve the profile of the currently authenticated user (patient only).
 *     security:
 *       - bearerAuth: [] # Token xác thực
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             example: { "id": "1", "name": "John Doe", "role": "patient" }
 *       401:
 *         description: Unauthorized access
 */
router.get("/profile/me", authenticate, restrict(["patient"]), getUserProfile);

/**
 * @swagger
 * /users/appointments/my-appointments:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get current user's appointments
 *     description: Retrieve a list of all appointments of the currently authenticated user (patient only).
 *     security:
 *       - bearerAuth: [] # Token xác thực
 *     responses:
 *       200:
 *         description: Successfully retrieved appointments
 *         content:
 *           application/json:
 *             example: [{ "appointmentId": "1", "date": "2024-12-01", "status": "confirmed" }]
 *       401:
 *         description: Unauthorized access
 */
router.get(
  "/appointments/my-appointments",
  authenticate,
  restrict(["patient"]),
  getMyAppointments
);

export default router;
