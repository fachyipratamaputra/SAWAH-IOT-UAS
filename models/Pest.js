const db = require("../config/database");

exports.savePest = (data, callback) => {

    db.query(
        `INSERT INTO pest_logs
        (pir_detected,vibration_detected,pest_detected)
        VALUES (?,?,?)`,
        [
            data.pir_detected,
            data.vibration_detected,
            data.pest_detected
        ],
        callback
    );

};