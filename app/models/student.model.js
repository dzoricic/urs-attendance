const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("student", {
    uuid: {
      type: Sequelize.STRING,
      defaultValue: () => uuidv4()
    },
    name: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return Student;
};
