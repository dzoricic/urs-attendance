module.exports = (sequelize, Sequelize) => {
    const Class = sequelize.define("class", {
      startTime: {
        type: Sequelize.DATE
      },
      endTime: {
        type: Sequelize.DATE
      }
    }, {
      timestamps: false,
      freezeTableName: true
    });
  
    return Class;
  };
  