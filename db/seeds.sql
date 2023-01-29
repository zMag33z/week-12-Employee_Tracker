-- third SOURCE db/seeds.sql; --
INSERT INTO department (department)
VALUES
  ('Engineering'),
  ('Finance'),
  ('Legal'),
  ('Sales');

  
INSERT INTO role (title, dept_id, salary)
VALUES
  ('Lead Engineer', 1, 150000),
  ('Software Engineer', 1, 120000),
  ('Account Manager', 2, 160000),
  ('Accountant', 2, 125000),
  ('Head of Legal', 3, 250000),
  ('Corporate Attorney', 3, 190000),
  ('Sales Manager', 4, 100000),
  ('Sales Associate', 4, 80000);

INSERT INTO employee 
(first_name,
 last_name,
 role_id,
 manager_id,
 is_manager)
    
VALUES
  ('Ashley', 'Rodriguez', 1, NULL, 1),
  ('Kevin', 'Tupik', 2, 1, 0),
  ('Kunal', 'Singh', 3, NULL, 1),
  ('Malia', 'Brown', 4, 3, 0),
  ('Sarah', 'Lourd', 5, NULL, 1),
  ('Tom', 'Allen', 6, 5, 0),
  ('John', 'Doe', 7, NULL, 1),
  ('Mike', 'Chan', 8, 7, 0);