module.exports = app => {
    const attendance = require("../controllers/attendance.controller.js");
  
    var router = require("express").Router();
  
    router.get("/:studentUuid", attendance.newEntry);

    router.post("/test", attendance.test);
  
    app.use("/api/attendance", router);
  };
  