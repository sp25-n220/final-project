const router = require("express").Router();
const {
  getAllGemCharacters,
  getSavedGemsByUserId,
  addNewGem,
} = require("../database");

router.get("/test/:userId", function (req, res) {
  res.status(200).json({ msg: "Success", userId: req.params.userId });
});

router.post("/gems/new", async function (req, res) {
  const newGem = await addNewGem({ name: req.body.name });
  res.status(200).json({ newId: newGem, inputData: req.body });
});

router.get("/gems/all", async function (req, res) {
  const allGems = await getAllGemCharacters();
  res.status(200).json({ gems: allGems, total: allGems.length });
});

router.get("/gems/user/:userId", async function (req, res) {
  const userSavedGems = await getSavedGemsByUserId(req.params.userId);
  res.status(200).json({
    total: userSavedGems.length,
    userId: req.params.userId,
    gems: userSavedGems,
  });
});

module.exports = router;
