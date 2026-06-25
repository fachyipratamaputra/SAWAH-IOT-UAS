const express = require("express");
const router = express.Router();

const controller =
require("../controllers/pestController");

router.post("/",controller.storePestData);

module.exports = router;