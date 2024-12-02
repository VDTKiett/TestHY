import express from "express";
import { authenticate } from "../auth/verifyToken.js";
import { getAllDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor } from "../Controllers/doctorController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Doctor
 *   description: API for managing doctors
 */

/**
 * @swagger
 * /doctors:
 *   get:
 *     tags:
 *       - Doctor
 *     summary: Get all doctors
 *     description: Retrieve a list of all doctors
 *     responses:
 *       200:
 *         description: List of doctors retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   specialty:
 *                     type: string
 *                   availability:
 *                     type: string
 */
router.get("/doctors", getAllDoctors);

/**
 * @swagger
 * /doctors/{doctorId}:
 *   get:
 *     tags:
 *       - Doctor
 *     summary: Get doctor by ID
 *     description: Retrieve details of a specific doctor using their ID
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         required: true
 *         description: The ID of the doctor
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor details retrieved successfully
 *       404:
 *         description: Doctor not found
 */
router.get("/doctors/:doctorId", getDoctorById);

/**
 * @swagger
 * /doctors:
 *   post:
 *     tags:
 *       - Doctor
 *     summary: Add a new doctor
 *     description: Create a new doctor entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               specialty:
 *                 type: string
 *               availability:
 *                 type: string
 *     responses:
 *       201:
 *         description: Doctor created successfully
 *       400:
 *         description: Invalid input data
 */
router.post("/doctors", authenticate, createDoctor);

/**
 * @swagger
 * /doctors/{doctorId}:
 *   put:
 *     tags:
 *       - Doctor
 *     summary: Update doctor details
 *     description: Update information for an existing doctor
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         required: true
 *         description: The ID of the doctor to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               specialty:
 *                 type: string
 *               availability:
 *                 type: string
 *     responses:
 *       200:
 *         description: Doctor updated successfully
 *       404:
 *         description: Doctor not found
 *       400:
 *         description: Invalid input data
 */
router.put("/doctors/:doctorId", authenticate, updateDoctor);

/**
 * @swagger
 * /doctors/{doctorId}:
 *   delete:
 *     tags:
 *       - Doctor
 *     summary: Delete a doctor
 *     description: Remove a doctor from the system
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         required: true
 *         description: The ID of the doctor to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor deleted successfully
 *       404:
 *         description: Doctor not found
 */
router.delete("/doctors/:doctorId", authenticate, deleteDoctor);

export default router;
