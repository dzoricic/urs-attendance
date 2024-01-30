module.exports = {
  url: "postgres://jbwjztab:Fh85RkX9DIDXUuxfK6Pwz70lEaA_iByY@dumbo.db.elephantsql.com/jbwjztab",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

// url is from elephantsql free DB, I do not mind exposing credentials...
