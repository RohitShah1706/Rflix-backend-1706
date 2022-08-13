const axios = require('axios');

const getNewRoomFromDaily = (req, res) => {
    // The user requested a room to join
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