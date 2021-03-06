const constants = require("./../conf/config");
const { settings, keyName } = constants.Redis;

const redis = settings.host === 'redis-mock' ? require('redis-mock') : require('@condor-labs/redis')(settings);

//const redis = require('@condor-labs/redis')(settings);

const redisConnection = async () => {
    var client = null;
    try {
        if (settings.host === 'redis-mock') {
            client = await redis.createClient();
            const redisBatch = client.batch();
            await redisBatch.incr(keyName);
            await redisBatch.expire(keyName, 1);
            //const resolve = await redisBatch.execAsync();
            // validate response
            console.log(`REDIS Mock connected OK!!!`);

        } else {
            client = await redis.getClient();
            const redisBatch = client.batch();
            await redisBatch.incr(keyName);
            await redisBatch.expire(keyName, 1);
            const resolve = await redisBatch.execAsync();
            // validate response
            console.log((resolve && resolve.length > 0 && resolve[0] > 0) ? `REDIS Client connected OK!!!` : `REDIS Client connection failed :(`);

        }
        // close app
        //process.exit(1);
        return client;
    } catch (err) {
        console.log(err);
    }

}

const get = async(key, readProducts) => {
    const client = await redisConnection();
    client.get(key, async(err, products) => {
        if (err) {
            throw err;
        }

        if (products) {
            readProducts(products);
        } else {
            readProducts(null);
        }
    });
}

const set = async (key, data) => {
    const client = await redisConnection();
    client.set(key, JSON.stringify(data));
}

const del = async (key) => {
    const client = await redisConnection();
    client.del(key);
}


module.exports = {
    redisConnection,
    get,
    set,
    del,
}
