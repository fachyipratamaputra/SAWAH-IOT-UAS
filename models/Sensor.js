const db = require("../config/database");

exports.getAllSensorData = (callback) => {

    db.query(
        `
        SELECT
        (SELECT water_level FROM water_logs ORDER BY id DESC LIMIT 1) AS water_level,
        (SELECT pest_detected FROM pest_logs ORDER BY id DESC LIMIT 1) AS pest_detected
        `,
        callback
    );

};