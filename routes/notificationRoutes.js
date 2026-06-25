const express = require("express");
const router = express.Router();

const controller =
require("../controllers/notificationController");

router.get("/test",controller.testNotification);

module.exports = router;