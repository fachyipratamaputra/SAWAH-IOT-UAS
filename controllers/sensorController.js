const Sensor = require("../models/Sensor");

exports.getLatestSensor = (req,res)=>{

    Sensor.getAllSensorData((err,result)=>{

        if(err){
            return res.status(500).json(err);
        }

        res.json(result[0]);

    });

};