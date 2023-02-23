require("dotenv").config();
const Redis = require("redis");
const DEFAULT_EXPIRATION = 3600;

const redisClient = Redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
})

/**
 * @dev This function will check if the data is in the cache \
 * If it is, it will return the data from the cache \
 * Else it will fetch the data from the API and store it in the cache
 * @param {String} key - The key to check in the cache 
 * @param {Function} cb - The callback function to fetch the data from the API
 * @returns {Promise} - A promise that resolves to the data from the cache or the API
 *
 */
const getOrSetCache = (key, cb) => {
    return new Promise((resolve, reject) => {
        redisClient.exists(key)
        .then(exists => {
            if(exists){
                redisClient.get(key)
                .then((data) => {
                    console.log("Cache Hit");
                    resolve(JSON.parse(data))
                })
            }else{
                console.log("Cache Miss");
                cb()
                .then(freshData => {
                    redisClient.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(freshData))
                    resolve(freshData)
                })
            }
        })
    })
    .catch(err => {
        reject(err)
    })

}

module.exports = {
    redisClient,
    DEFAULT_EXPIRATION,
    getOrSetCache
}