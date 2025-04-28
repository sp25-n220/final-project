const router = require("express").Router();
const {
  getAllFestivals,
  getFestivalById,
  getTicketInventoryByFestivalId,
} = require("../database");

router.get("/test/:userId", (req, res) => {
  res.status(200).json({ msg: "Success", userId: req.params.userId });
});

router.get("/festivals", async (req, res, next) => {
  try {
    const festivals = await getAllFestivals();
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
module.exports = router;
