const config = require('./index');

module.exports = {
        "development": {
          "username": config.DB_USERNAME,
          "password": config.DB_PASSWORD,
          "database": config.DB_DATABASE,
          "host": config.DB_HOST,
          "dialect": config.DB_DIARECT,
          // "dialectOptions": { // for reading
          //   "useUTC": false,
          //   "timezone": 'local'
          // },
          // "pool": {
          //   "max": 5,
          //   "min": 0,
          //   "acquire": 30000,
          //   "idle": 10000
          // },
          "port": config.DB_PORT,
          "charset": 'utf8',
          "collate": 'utf8_general_ci',
          "timezone": '+07:00',
        },
        "test": {
            "username": config.DB_USERNAME_TEST,
            "password": config.DB_PASSWORD_TEST,
            "database": config.DB_DATABASE_TEST,
            "host": config.DB_HOST_TEST,
            "dialect": config.DB_DIARECT_TEST,
            "port": config.DB_PORT_TEST,
            "charset": 'utf8',
            "collate": 'utf8_general_ci', 
            "timezone": '+07:00',
        },
        "production": {
          "username": config.DB_USERNAME_PRODUCTION,
          "password": config.DB_PASSWORD_PRODUCTION,
          "database": config.DB_DATABASE_PRODUCTION,
          "host": config.DB_HOST_PRODUCTION,
          "dialect": config.DB_DIARECT_PRODUCTION,
          // "pool": {
          //   "max": 5,
          //   "min": 0,
          //   "acquire": 30000,
          //   "idle": 10000
          // },
          // // "dialectOptions": { // for reading
          // //   "useUTC": false,
          // //   "timezone": 'local'
          // // },
          "port": config.DB_PORT_PRODUCTION,
          "charset": 'utf8',
          "collate": 'utf8_general_ci', 
          "timezone": '+07:00',
      }


}