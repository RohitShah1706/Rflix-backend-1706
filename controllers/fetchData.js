const axios = require('axios');
const fetchData = (url) => {
    return axios(url)
        .then(response => {
            // console.log("response mila", response.data);
            return response.data;
        })
        .catch(err => {
            console.log(err);
            return { results: [] };
        })
}
module.exports = { fetchData }