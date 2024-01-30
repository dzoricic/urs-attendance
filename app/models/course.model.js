module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define("course", {
    name: {
      type: Sequelize.STRING
    },
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return Course;
};
