const db = require("../config/database");

exports.saveLog = (activity, callback) => {

    db.query(
        "INSERT INTO activity_logs(activity) VALUES(?)",
        [activity],
        callback
    );

};