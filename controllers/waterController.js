const Water = require("../models/Water");
const monitor = require("../services/waterMonitoringService");
const notify = require("../services/notificationService");

exports.storeWaterData = (req,res) => {

    const level = req.body.water_level;

    const status = monitor.checkWaterLevel(level);

    Water.saveWater(
        {
            water_level: level,
            status
        },
        async(err)=>{

            if(err){
                return res.status(500).json(err);
            }

            if(status==="LOW"){

                await notify.sendTelegram(
                    `⚠ Air Sawah Rendah : ${level} cm`
                );

            }

            res.json({
                success:true,
                status
            });

        }
    );
};