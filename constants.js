module.exports = {
    Port: 3000,
    Settings: {
      host: "cluster0-shard-00-00.o2cps.mongodb.net",
      port: 27017,
      database: "shopping-car",
      user: "test_user",
      password: "qAGhyLr4dARdpNFS",
      replicaSet: "atlas-rmw24f-shard-0",
      ssl: true,
      authSource: "admin",
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