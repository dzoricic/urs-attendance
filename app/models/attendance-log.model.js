module.exports = (sequelize, Sequelize) => {
    const AttendanceLog = sequelize.define("attendanceLog", {
      action: {
        type: Sequelize.STRING
      },
    }, {
      freezeTableName: true,
      timestamps: true,
    });
  
    return AttendanceLog;
  };
  