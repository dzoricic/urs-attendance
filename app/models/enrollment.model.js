module.exports = (sequelize, Sequelize) => {
    const Enrollment = sequelize.define("enrollment", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      year: {
        type: Sequelize.STRING
      }
    }, {
      timestamps: false,
      freezeTableName: true
    });
  
    return Enrollment;
  };
  