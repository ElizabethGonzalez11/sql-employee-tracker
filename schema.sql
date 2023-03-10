DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee_role(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAl (10,2) NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Mike', 'Chan', 1, 3 ),
      ('Ashley', 'Rodriguez', 2, null),
      ('Kevin', 'Tupik', 2, 1 ),
      ('Kunal', 'Singh', 3, null),
      ('Malia', 'Brown', 3, 2),
      ('Sarah', 'Lourd', 4, 4 ),
      ('Tom', 'Allen', 4, null);

INSERT INTO employee_role (id, title, salary, department_id)
VALUES (1,'Salesperson', 80000, 1),
      (2,'Lead Engineer', 150000, 2),
      (3,'Software Engineer', 120000, 2),
      (4,'Account Manager', 160000, 3),
      (5,'Accountant', 125000, 3),
      (6,'Legal Team Lead', 250000, 4),
      (7,'Lawyer', 190000, 4);

INSERT INTO department (name)
VALUES ('Sales'),
       ('Engineering'), 
       ('Finance'),
       ('Legal');