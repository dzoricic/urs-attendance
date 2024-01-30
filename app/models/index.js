const dbConfig = require("../config/db.config.js");

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(dbConfig.url, {
  dialect: dbConfig.dialect,
  logging: console.log,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Student = require("./student.model.js")(sequelize, Sequelize);
db.Course = require("./course.model.js")(sequelize, Sequelize);
db.Class = require("./class.model.js")(sequelize, Sequelize);

db.Attendance = require("./attendance.model.js")(sequelize, Sequelize);
db.AttendanceLog = require("./attendance-log.model.js")(sequelize, Sequelize);
db.Enrollment = require("./enrollment.model.js")(sequelize, Sequelize);

db.Class.belongsTo(db.Course);
db.AttendanceLog.belongsTo(db.Student);
db.AttendanceLog.belongsTo(db.Class);

db.Student.belongsToMany(db.Class, { through: 'attendance' });
db.Class.belongsToMany(db.Student, { through: 'attendance' });

db.Student.belongsToMany(db.Course, { through: 'enrollment' });
db.Course.belongsToMany(db.Student, { through: 'enrollment' });

module.exports = db;
