-- third SOURCE db/seeds.sql; --
INSERT INTO department (department)
VALUES
  ('Engineering'),
  ('Finance'),
  ('Legal'),
  ('Sales');

  
INSERT INTO role (title, dept_id, salary, manager_role)
VALUES
  ('Lead Engineer', 1, 150000, 1),
  ('Software Engineer', 1, 120000, 0),
  ('Account Manager', 2, 160000, 1),
  ('Accountant', 2, 125000, 0),
  ('Head of Legal', 3, 250000, 1),
  ('Corporate Attorney', 3, 190000, 0),
  ('Sales Manager', 4, 100000, 1),
  ('Sales Associate', 4, 80000, 0);

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