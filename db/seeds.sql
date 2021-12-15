use employees_db;

INSERT INTO department (department_name) VALUES
('Customer Service'),
('Sales'),
('Finance')
('Engineering');


INSERT INTO job (job_title, salary, department_id) VALUES
('Call Center Rep', 50000, 1),
('Application Support', 70000, 1),
('Account Manager', 110000, 2),
('Financaial Analyst', 80000, 3),
('Software Engineer', 105000, 4),
('Principle Software Engineer', 135000, 4);


INSERT INTO employees (first_name, last_name, manager_id, job_id) VALUES
('Micheal', 'Richards', 34, 2 )
('Sean', 'Wright', 21, 1 )
('Charles', 'Brown', 46, 4 )
('John', 'Kirby', 15, 3 )
('Sarah', 'Light', 02, 3 )
('Tina', 'Godwin', 42, 4 )
('Lizz', 'Ruby', 16, 6 )
('Kenny', 'Fothergill', 91, 5 )
