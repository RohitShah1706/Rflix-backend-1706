const giveTimeDifferenceInSeconds = (UTCTimeString) => {
    let today = new Date();
    let expireTime = new Date(UTCTimeString);
    let minutes = (today - expireTime) / (1000);
    return minutes
}
const giveTimeDifferenceInMinutes = (UTCTimeString) => {
    let minutes = giveTimeDifferenceInSeconds(UTCTimeString) / 60;
    return minutes;
}
const giveTimeDifferenceInHours = (UTCTimeString) => {
    let hours = giveTimeDifferenceInMinutes(UTCTimeString) / 60;
    return hours;
}
const giveTimeDifferenceInDays = (UTCTimeString) => {
    let days = giveTimeDifferenceInHours(UTCTimeString) / 24;
    return days;
}
module.exports = { giveTimeDifferenceInSeconds, giveTimeDifferenceInMinutes, giveTimeDifferenceInHours, giveTimeDifferenceInDays };