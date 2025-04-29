const router = require("express").Router();
const {
    getAllSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule
} = require("../database");

// GET all schedules
router.get("/schedules", async (req, res, next) => {

    try {
        const schedules = await getAllSchedules();
        res.status(200).json({ schedules });
    } catch (err) {
        next(err);
    }
});

// Create a new schedule
router.post("/schedules", async (req, res, next) => {
    try {
        const {
            userName,
            userEmail,
            startDate,
            endDate,
            activities,
            ticketType,
            ticketQuantity
        } = req.body;
  
        if (!userName || !userEmail || !startDate || !endDate || !ticketQuantity) {
            return res.status(400).json({ error: "Missing required fields" });
        }
  
        const newSchedule = await createSchedule({
            userName,
            userEmail,
            startDate,
            endDate,
            activities,
            ticketType,
            ticketQuantity
        });
  
        res.status(201).json(newSchedule);
    } catch (err) {
        next(err);
    }
});

// Update schedule
router.put("/schedules/:scheduleId", async (req, res, next) => {
    try {
        const scheduleId = parseInt(req.params.scheduleId, 10);
        const updated = await updateSchedule(scheduleId, req.body);
        res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
});

// DELETE a schedule
router.delete("/schedules/:scheduleId", async (req, res, next) => {
    try {
        const scheduleId = parseInt(req.params.scheduleId, 10);
        await deleteSchedule(scheduleId);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});
  