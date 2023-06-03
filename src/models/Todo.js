const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Todo = sequelize.define('todo', {

  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});

module.exports = Todo;