console.log("ENV", process.env.NODE_ENV );

if (process.env.NODE_ENV === "development") {
  module.exports = {
    Port: 3000,
    Settings: {
      host: "cluster0-shard-00-00.o2cps.mongodb.net",
      port: 27017,
      database: "shopping-car",
      user: "test_user",
      password: "qAGhyLr4dARdpNFS",
      replicaSet: "atlas-rmw24f-shard-0", // comentar para docker
      ssl: true, // false para docker
      authSource: "admin",
    },
    Redis: {
      settings: {
        prefix: 'REDIS',
        host: 'localhost',
        port: 6379,
        //password: '****'
      },
      keyName: 'test:condorlabs-npm-helpers:counter'
    },
    Categories : [
      "FOOD", 
      "TECH", 
      "TOYS"
    ],
    Pagination: {
      offset: 0,
      limit: 25
    }
  }
} else {
  module.exports = {
      Port: 3000,
      Settings: {
        host: "shopping-mongo",
        port: 27017,
        database: "shopping-car",
        user: "root",
        password: "pass-root",
        ssl: false, // false para docker
        authSource: "admin",
      },
      Redis: {
        settings: {
          prefix: 'REDIS',
          host: 'shopping-redis',
          port: 6379,
          //password: '****'
        },
        keyName: 'test:condorlabs-npm-helpers:counter'
      },
      Categories : [
        "FOOD", 
        "TECH", 
        "TOYS"
      ],
      Pagination: {
        offset: 0,
        limit: 25
      }
    }
}

