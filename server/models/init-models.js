import Sequelize from 'sequelize'
import config  from "../../config/config";

const sequelize = new Sequelize(
  config.db_name,
  config.db_username,
  config.db_password,
  {
    dialect : "postgres",
    pool : {
      max : 5,
      min : 0,
      acquire : 30000,
      idle : 10000
    }
  }
)
const DataTypes = require("sequelize").DataTypes;
const _countries = require("./countries");
const _departments = require("./departments");
const _dependents = require("./dependents");
const _employees = require("./employees");
const _jobs = require("./jobs");
const _locations = require("./locations");
const _project_assignment = require("./project_assignment");
const _projects = require("./projects");
const _region = require("./region");

function initModels(sequelize) {
  const countries = _countries(sequelize, DataTypes);
  const departments = _departments(sequelize, DataTypes);
  const dependents = _dependents(sequelize, DataTypes);
  const employees = _employees(sequelize, DataTypes);
  const jobs = _jobs(sequelize, DataTypes);
  const locations = _locations(sequelize, DataTypes);
  const project_assignment = _project_assignment(sequelize, DataTypes);
  const projects = _projects(sequelize, DataTypes);
  const region = _region(sequelize, DataTypes);

  locations.belongsTo(countries, { as: "country", foreignKey: "country_id"});
  countries.hasMany(locations, { as: "locations", foreignKey: "country_id"});
  employees.belongsTo(departments, { as: "department", foreignKey: "department_id"});
  departments.hasMany(employees, { as: "employees", foreignKey: "department_id"});
  dependents.belongsTo(employees, { as: "employee", foreignKey: "employee_id"});
  employees.hasMany(dependents, { as: "dependents", foreignKey: "employee_id"});
  employees.belongsTo(employees, { as: "manager", foreignKey: "manager_id"});
  employees.hasMany(employees, { as: "employees", foreignKey: "manager_id"});
  employees.belongsTo(jobs, { as: "job", foreignKey: "job_id"});
  jobs.hasMany(employees, { as: "employees", foreignKey: "job_id"});
  departments.belongsTo(locations, { as: "location", foreignKey: "location_id"});
  locations.hasMany(departments, { as: "departments", foreignKey: "location_id"});
  countries.belongsTo(region, { as: "region", foreignKey: "region_id"});
  region.hasMany(countries, { as: "countries", foreignKey: "region_id"});

  return {
    countries,
    departments,
    dependents,
    employees,
    jobs,
    locations,
    project_assignment,
    projects,
    region,
  };
}
const models = initModels(sequelize);

export default models;
export {sequelize};
// module.exports = initModels;
// module.exports.initModels = initModels;
// module.exports.default = initModels;
