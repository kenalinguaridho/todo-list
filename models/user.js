'use strict';
const { hashSync } = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {
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
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'email is already used'
      },
      validate: {
        notNull: {
          msg: 'email should be in request body'
        },
        isEmail: {
          msg: `email field must contain valid email`
        },
        notContains: {
          args: ' ',
          msg: `email can't contain spaces`
        },
        notEmpty: {
          msg: `email can't contain empty string`
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'phone number is already used'
      },
      validate: {
        notNull: {
          msg: 'phone number should be in request body'
        },
        notContains: {
          args: ' ',
          msg: `phone number can't contain spaces`
        },
        notEmpty: {
          msg: `phone number can't contain empty string`
        }
      }
    },
    pin: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'pin should be in request body'
        },
        notEmpty: {
          msg: `pin can't contain empty string`
        },
        len: {
          args: [6],
          msg: 'pin must be 6 char length'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(user => {
    const hashPin = hashSync(user.pin, 10)
    user.pin = hashPin
    user.email = user.email.toLowerCase()
  })

  User.beforeUpdate(user => {
    const hashPin = hashSync(user.pin, 10)
    user.pin = hashPin
    user.email = user.email.toLowerCase()
  })

  return User;
};