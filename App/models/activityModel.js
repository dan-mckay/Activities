var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var activitySchema = new Schema({
    activityID: Number,
    activityName: String,
    description: String,
    beginTime: Number,
    endTime: Number,
    device: String,
    activityParent: String,
    activityType: String,
    eventType: String,
    timeZone: String,
    maxElevation: Number,
    beginLatitude: Number,
    beginLongitude: Number,
    endLatitude: Number,
    endLongitude: Number,
    aveMovingSpeed: Number,
    maxHeartRate: Number,
    aveHeartRate: Number,
    maxSpeed: Number,
    calories: Number,
    duration: Number,
    movingDuration: Number,
    aveSpeed: Number,
    distance: Number,
    minElevation: Number,
    elevationGain: Number,
    elevationLoss: Number
});
 
module.exports = mongoose.model('Activity', activitySchema);