'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class users_artists extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    users_artists.init({
        userId: DataTypes.INTEGER,
        artistId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'users_artists',
    });
    return users_artists;
};