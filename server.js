const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

require("./app/routes/attendance.routes")(app);

app.get('/', () => {
  console.log("Testing default route");
  // return so request doesn't time out
  return;
});

const PORT = process.env.PORT || 8080;
// IPv4 same as the one on micro controller, update on day of presentation
app.listen(PORT, '192.168.225.97', () => {
  console.log(`Server is running on port ${PORT}.`);
});
