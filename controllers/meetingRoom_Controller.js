const axios = require('axios');
const { giveTimeDifferenceInHours } = require("../getTimeDifference");
const removeRoomsFromDaily = () => {
    // get the room details 
    const baseUrl = "https://api.daily.co/v1/rooms"
    const axiosGetRooms = axios.create({
        baseURL: baseUrl,
        headers: {
            "Authorization": `Bearer ${process.env.DAILY_VIDEO_CHAT_API_KEY}`
        }
    })
    axiosGetRooms.get("/")
        .then(response => {
            const rooms = response.data.data;
            // iterate through the rooms and delete the rooms that are older than 6 hours - because DAILY API supports only 50 rooms per APIKEY
            rooms.forEach(room => {
                if (giveTimeDifferenceInHours(room.created_at) > 6) {
                    const axiosDeleteRoom = axios.create({
                        baseURL: baseUrl,
                        headers: {
                            "Authorization": `Bearer ${process.env.DAILY_VIDEO_CHAT_API_KEY}`
                        }
                    })
                    axiosDeleteRoom.delete(`/${room.name}`)
                        .then(response => {
                            console.log("Deleting room ", response.data);
                        }).catch(err => {
                            console.log(err);
                        })
                }
            })
        })
        .catch(err => {
            console.log(err);
        })
}
const getNewRoomFromDaily = (req, res) => {
    // The user requested a room to join
    removeRoomsFromDaily();
    const baseUrl = "https://api.daily.co/v1/rooms/";
    const axiosMeet = axios.create({
        baseURL: baseUrl,
        headers: {
            "Authorization": `Bearer ${process.env.DAILY_VIDEO_CHAT_API_KEY}`
        },
    })
    // add data to the request body
    const data = {
        "properties": { "enable_chat": true }
    }
    // send the request to create a new room
    axiosMeet.post("/", data)
        .then(response => {
            res.json(response.data);
        })
        .catch(err => {
            res.json(err);
        })
}
module.exports = { getNewRoomFromDaily };