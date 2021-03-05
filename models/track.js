'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class track extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.track.belongsToMany(models.user)
        }
    };
    track.init({
        idTrack: DataTypes.INTEGER,
        idArtist: DataTypes.INTEGER,
        idAlbum: DataTypes.INTEGER,
        userId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'track',
    });
    return track;
};