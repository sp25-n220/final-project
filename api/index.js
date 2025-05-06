const router = require("express").Router();
const {
  getAllFestivals,
  getFestivalById,
  getTicketInventoryByFestivalId,
  createSchedule,
  updateSchedule,
  getAllSchedules,
  deleteSchedule,
} = require("../database");

router.get("/test/:userId", (req, res) => {
  res.status(200).json({ msg: "Success", userId: req.params.userId });
});

router.get("/festivals", async (req, res, next) => {
  try {
    const festivals = await getAllFestivals();

    //The connection to our endpoint was succesful
    res.status(200).json({
      total: festivals.length,
      festivals,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/festivals/:festivalId", async (req, res, next) => {
  try {
    const festivalId = parseInt(req.params.festivalId, 10);
    const festival = await getFestivalById(festivalId);
    if (!festival) {
      return res.status(404).json({ error: "Festival not found" });
    }

    const inventory = await getTicketInventoryByFestivalId(festivalId);
    res.status(200).json({
      festival,
      ticketInventory: inventory,
    });
  } catch (err) {
    next(err);
  }
});

// READ (GET) all schedules
router.get("/schedules", async (req, res, next) => {

    try {
        const schedules = await getAllSchedules();
        res.status(200).json({ schedules });
    } catch (err) {
        next(err);
    }
});

// Create a new shedule 
// lollaSchedule
router.post("/schedules", async (req, res, next) => {

    console.log("POST /api/schedules hit");
    console.log("Request body:", req.body);

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
  
        if (!userName) {
            return res.status(400).json({ error: "Missing required fields" });
        }
  
        const newSchedule = await createSchedule(
            userName,
            userEmail,
            startDate,
            endDate,
            activities,
            ticketType,
            ticketQuantity
        );
  
        console.log("New schedule created:", newSchedule);
        res.status(201).json(newSchedule);
    } catch (err) {
        console.error("Error in POST /api/schedules:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// // UPDATE schedule
// router.put("/schedules/:id", async (req, res, next) => {
//   try {
//     const scheduleId = parseInt(req.params.scheduleId, 10);
//     const { eventName, startTime, endTime } = req.body;
//     const updated = await updateSchedule(scheduleId, eventName, startTime, endTime);
//     res.status(200).json(updated);
//   } catch (err) {
//     next(err);
//   }
// });


// Delete a Schedule 

router.delete("/schedules/:id", async (req, res, next) => {
  
  // Get the id and store it in scheduleID
  const scheduleId = req.params.id;
  
  try {
      await deleteSchedule(scheduleId);
      res.status(204).send();
  } catch (err) {
      next(err);
  }

});
  

module.exports = router;
