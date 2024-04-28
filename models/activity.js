'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Activity.init({
    userId: DataTypes.UUID,
    activity: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'name should be in request body'
        },
        notEmpty: {
          msg: `name can't contain empty string`
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'name should be in request body'
        },
        notEmpty: {
          msg: `name can't contain empty string`
        }
      }
    },
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Activity',
  });
  return Activity;
};