const db = require("../config/database");

exports.saveImage = (path, result, callback) => {

    db.query(
        "INSERT INTO images(image_path,result) VALUES (?,?)",
        [path,result],
        callback
    );

};