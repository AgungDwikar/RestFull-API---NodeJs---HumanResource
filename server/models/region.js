const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('region', {
    region_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    region_name: {
      type: DataTypes.STRING(25),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'region',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "region_pkey",
        unique: true,
        fields: [
          { name: "region_id" },
        ]
      },
    ]
  });
};
