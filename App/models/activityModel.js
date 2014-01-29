var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var activitySchema = new Schema({
    activityID: Number,
    activityName: String,
    description: String,
    beginTime: String,
    beginTimeRaw: Number,
    endTime: String,
    endTimeRaw: Number,
    device: String,
    activityParent: String,
    activityType: String,
    eventType: String,
    timeZone: String,
    maxElevation: String,
    maxElevationRaw: Number,
    beginLatitude: Number,
    beginLongitude: Number,
    endLatitude: Number,
    endLongitude: Number,
    aveMovingSpeed: String,
    aveMovingSpeedRaw: Number,
    maxHeartRate: Number,
    aveHeartRate: Number,
    maxSpeed: String,
    maxSpeedRaw: Number,
    calories: String,
    caloriesRaw: Number,
    duration: String,
    durationRaw: Number,
    movingDuration: String,
    movingDurationRaw: Number,
    aveSpeed: String,
    aveSpeedRaw: Number,
    distance: String,
    distanceRaw: Number,
    maxHeartRateDuplicate: Number,
    minElevation: String,
    minElevationRaw: Number,
    elevationGain: String,
    elevationGainRaw: Number,
    elevationLoss: String,
    elevationLossRaw: Number
});
 
module.exports = {
  createModel: function() {
    return mongoose.model('Activity', activitySchema);
  },
  getSchema: function() {
    return activitySchema;
  }
}