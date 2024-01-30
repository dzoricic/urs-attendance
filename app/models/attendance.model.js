module.exports = (sequelize, Sequelize) => {
    const Attendance = sequelize.define("attendance", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      attended: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    }, {
      timestamps: false,
      freezeTableName: true
    });
  
    return Attendance;
  };
  