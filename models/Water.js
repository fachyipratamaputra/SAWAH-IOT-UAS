const db = require("../config/database");

exports.saveWater = (data, callback) => {

    db.query(
        "INSERT INTO water_logs(water_level,status) VALUES (?,?)",
        [data.water_level, data.status],
        callback
    );

};