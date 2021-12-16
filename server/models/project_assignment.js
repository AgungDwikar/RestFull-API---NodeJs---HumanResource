const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('project_assignment', {
    prass_proj_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    prass_employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    prass_startdate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    pras_nddate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    pras_status: {
      type: DataTypes.STRING(15),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'project_assignment',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "project_assignment_pkey",
        unique: true,
        fields: [
          { name: "prass_proj_id" },
          { name: "prass_employee_id" },
        ]
      },
    ]
  });
};
