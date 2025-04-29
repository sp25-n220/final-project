// const router = require("express").Router();

// const {
//   getAllFestivals,
//   getFestivalById,
//   getTicketInventoryByFestivalId,
//   createSchedule,
//   updateSchedule,
//   getAllSchedules,
//   deleteSchedule,
// } = require("../database");

// // Scheduling endpoints 

// // Display all schedules (READ)  
// router.get("/festivals/:festivalId", async (req, res, next) => {
//     try {
//         const festivalId = parseInt(req.params.festivalId, 10);
//         const festival = await getFestivalById(festivalId);

//         if (!festival) {
//             return res.status(404).json({error: "festival not found"})
//         }

//         const inventory = await getTicketInventoryByFestivalId(festivalId);
//         res.status(200).json({
//             festival, 
//             ticketInventory: inventory,
//         });

//     } catch (error) {
//         next(error)
//     }
// })

// // READ (GET) all schedules
// router.get("/schedules", async (req, res, next) => {
//     try {
//       const schedules = await getAllSchedules();
//       res.status(200).json({ schedules });
//     } catch (err) {
//       next(err);
//     }
// });

// // Create a new shedule 
// // lollaSchedule
// router.post("/schedules", async (req, res, next) => {
//     try {
//       const { festivalId, eventName, startTime, endTime } = req.body;  // Adjusted fields

//       const newSchedule = await createSchedule(festivalId, eventName, startTime, endTime);

//       res.status(201).json(newSchedule);
//     } catch (err) {
//       next(err);
//     }
// });

// // UPDATE schedule
// router.put("/schedules/:scheduleId", async (req, res, next) => {
//     try {
//       const scheduleId = parseInt(req.params.scheduleId, 10);
//       const { eventName, startTime, endTime } = req.body;
//       const updated = await updateSchedule(scheduleId, eventName, startTime, endTime);
//       res.status(200).json(updated);
//     } catch (err) {
//       next(err);
//     }
// });


// // Delete a Schedule 

// router.delete("/schedules/:scheduleId", async (req, res, next) => {
//     try {
//       const scheduleId = parseInt(req.params.scheduleId, 10);
//       await deleteSchedule(scheduleId);
//       res.status(204).send(); // 204 = No Content
//     } catch (err) {
//       next(err);
//     }
// });