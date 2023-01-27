-- second source tables --
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  department VARCHAR(30) NOT NULL


);


CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  dept_id INT,
  salary DECIMAL NOT NULL,

  FOREIGN KEY (dept_id)
    REFERENCES department(id)
    ON DELETE CASCADE
);


CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  is_manager BOOLEAN NOT NULL,

  FOREIGN KEY (manager_id)
    REFERENCES employee(id),

  FOREIGN KEY (role_id)
    REFERENCES role(id)
);