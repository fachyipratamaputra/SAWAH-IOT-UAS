exports.checkWaterLevel = (level) => {

    if(level < 3){
        return "LOW";
    }

    if(level > 15){
        return "HIGH";
    }

    return "NORMAL";
};