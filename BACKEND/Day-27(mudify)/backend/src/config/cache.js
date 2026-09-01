let redis = require("ioredis").default
redis = new redis.Redis({
       host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT,
    password:process.env.REDIS_PASSWORD
})
redis.on("connect", () => {
    console.log("Redis TCP connection established");
});

redis.on("ready", () => {
    console.log("Redis is ready");
});

redis.on("error", (err) => {
    console.log("Redis error:", err.message);
});
module.exports = redis