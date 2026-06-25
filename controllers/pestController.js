const Pest = require("../models/Pest");
const detector = require("../services/pestDetectionService");

exports.storePestData = (req,res)=>{

    const {
        pir_detected,
        vibration_detected
    } = req.body;

    const pest_detected =
        detector.detectPest(
            pir_detected,
            vibration_detected
        );

    Pest.savePest(
        {
            pir_detected,
            vibration_detected,
            pest_detected
        },
        (err)=>{

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                success:true,
                pest_detected
            });

        }
    );
};