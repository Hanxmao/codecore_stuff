- Types of Databases
  Databases are generally categorized in two primary categories:

  - Relational (or SQL) Databases
     SQLite
     MySQL / MariaDB
     Postgres
     MSSQL
     Oracle

  - NoSQL Databases

- Data Types
  When creating tables you must provide the data type for each column, here are the most popular data types:

    INTEGER: signed four-byte integer
    VARCHAR: Variable Character String field. Maximum length is 255 characters.
    TEXT: variable-length character string
    FLOAT: Decimal point number
    BOOLEAN: True or false
    DATETIME: Timestamp that stores the date and time
  
  Note that the details above are specific to Postgresql which is the database we will use most often in this course.   
  There may be slight differences with other databaes. Also, the naming of the types may differ a bit as well.

- Creating Tables
  To create a table you can use CREATE TABLE command as in:

      CREATE TABLE students (
       id INTEGER PRIMARY KEY AUTOINCREMENT,        
       first_name VARCHAR(50), 
       last_name VARCHAR(50), 
       email VARCHAR(255), 
       phone_number VARCHAR(25),
       bio TEXT);
  
  The code above creates a table called students with the following fields: id, first_name, last_name, email,    phone_number and bio.

- Altering Tables
  You can alter tables by adding / removing columns by running queries like:

      ALTER TABLE students ADD COLUMN age integer;

- CRUD：Create, Read, Update and Delete
    -Create using INSERT
      To add a row to a table in the database you can use INSERT as in:

          INSERT INTO students(first_name, last_name, email, phone_number) VALUES ('Tam', 'Kbeili', 'tam@codecore.ca', '778.994.8776');

      This will create a row in the database unless you have constraints that prevents that. In that case you will get an exception.

    - Read using SELECT
      Selecting Specific Columns
      You can select specific columns by listing them instead of the * as in:

          SELECT first_name, last_name FROM students;
      
      This will only select the first_name and last_name fields of the students table.

      WHERE
        In most circumstances you will need to filter the rows you fetch from the database to get a subset of them. You do that by adding WHERE clause as in:

            SELECT * FROM students WHERE id=1;
        This selects one row from the students with id 1 assuming id is the primary key so we only have one student record with that id.

        Operators
          In your WHERE clause you can use the following operators:

            = equals!
            = not equals
            > greater than
            < less than
            >= greater than or equal to
            <= less than or equal to
          For example you can do:

              SELECT * FROM students WHERE age > 20;

      AND / OR
        You can combine multiple conditions in the WHERE clause using AND and OR. For instance:

            SELECT * FROM students WHERE age > 40 AND age < 60;
        
        This will select students whose ages are more than 40 and less than 60.

    - three-valued logic (3VL)
        In SQL the absence of value is represented by NULL so if you have a Boolean field your options will be TRUE, FALSE and NULL. This is why in SQL we say it's three-valued logic. Note that if you want to check if a given column is NULL or not, you will have to use special syntax: IS NULL and IS NOT NULL as in:

            SELECT * FROM students WHERE age IS NULL;
        
        This will select all students who age is NULL. 
        Note that the following will give you an unexpected results:

            SELECT * FROM students WHERE age = NULL;
        This will give you an empty set even when you have students whose age is NULL

    - LIKE
        Like can be used for pattern matching within SQL queries so you can construct queries such as:

            SELECT * FROM students WHERE first_name LIKE '%aa%';
        Which finds all the students whose first names contain the pattern nn.

        Note that in Postgres you can use ILIKE instead of LIKE for case insensitive search.

    - BETWEEN
        If you want to find a record whose column value is between one value and another, you can use BETWEEN clause which is more convenient than using two > and < operators. Here is an example:

            SELECT * FROM students WHERE age BETWEEN 20 and 40;
      
    - ORDER BY
        You can sort the SQL result by a specific field using ORDER BY as in:

            SELECT * FROM students ORDER BY first_name DESC/ASC;

        You can sort the result by multiple fields by separating them with commas, for instance:

            SELECT * FROM students ORDER BY first_name, last_name ASC;

        This will return all students sorted with their first name but if there are students with the same first_name they will be sorted with their last_name value.

    - LIMIT
        You can limit the number of results you get back using LIMIT as in:

            SELECT * FROM students ORDER BY first_name ASC LIMIT 10;
        This fetches a maximum of 10 students ordered by their first names;

    - OFFSET
      You can use OFFSET to skip certain number of results. For example:

        SELECT * FROM students ORDER BY first_name ASC OFFSET 10; 
      
      This will skip the first 10 results and start displaying students starting from the 11th row. It's generally used in combination with LIMIT to implement pagination with the database.

- Aggregate Functions
  - COUNT
      COUNT functions gives the number of returns records. For example:

          SELECT COUNT(*) FROM students;
      This returns the number of students in the database. 
      
      You can change the label of the return count using AS:

          SELECT count(*) AS student_count FROM students;

  - SUM adds up the result for a given query.

  - AVG returns the average value of a given column.

  - MAX returns the maximum value of a given colum.

  - GROUP BY
      You can use GROUP BY if you want to aggregate your date into groups with similar condition. For example:

          SELECT COUNT(first_name) AS first_name_count, first_name FROM students GROUP BY first_name;
      
      This will return all first names (only once) and it will also return the number of occurances of each name. So we grouped the results in this case by the first name.

- Associating Records
  - One to Many
      We can associate records in a one to many fashion with other records by including a new column that references the original row's primary key. The row can be in the same table on a different table. We call that new column foreign key. For example if we have table students that stores students' information and we have a second table projects that stores information about projects created by students, we can have a column student_id in the projects table to store the id, or reference, the student who created the project. So if a project is created by a student with an id value of 10 we can store the student_id in the project row as 10 to reference the student who created the project.

  - One to One
      Implementing one to one association is the same as implementing one to many. The only differnce is that there should be only one record reference a specific record which can be enforced with code or a constraint.

  - Many to Many
      The most common way to implement many to many association is to have a third table, called the join table, to associate the records together. So if you have a courses table that stores information about courses, by nature the courses to students relationship is many to many because a student can be enroled in many course and each course can have many students enroled in it.

      We can have a third table, and can call it enrolments for instance that include references for both courses and students. The enrolments table will have course_id and student_id. The enrolments table can contain other columns such as score as well.

- Joins:
  - INNER JOIN
      If you want to find the data that is associated between two tables you can do use INNER JOIN. For example if you want to find all students and their projects you can write:

          SELECT * FROM students INNER JOIN projects ON projects.student_id = students.id;
      
      This will fetch all the students who have at least one project and it will fetch all the projects associated with those students. If the student has multiple projects, you will see multiple rows with the same student id in them.

  - LEFT JOIN      
      If, for instance, you want to select all students whether they have projects associted with them or not then you can use LEFT JOIN instead of using INNER JOIN. This fetches all studenst and the projects associated with them:

          SELECT * FROM students LEFT JOIN projects ON projects.student_id = students.id;

  - RIGHT JOIN

  - FULL OUTER JOIN

- Constraints
  add contraints to add validation at the database level to prevent adding, updating or removing data from your database.
  
  - NOT NULL
    When creating a table you can add NOT NULL after defining the type of the column, this way the database will    prevent you from creating a record without entering a value for the field. for example:

        CREATE TABLE students (
          id SERIAL PRIMARY KEY,
          first_name VARCHAR(50) NOT NULL, 
          ...
    
    This way the database won't allow to create a student without a first_name.
  
  - UNIQUE
      You can use the UNIQUE contraint to ensure that the value entered in the column is unique.

  - PRIMARY KEY
      Primary key constraint is simply a combination of a unique constraint and a not-null constraint. It's advisable that every table contains a primary key. In Rails the convention is to call it id and have it as an INTEGER data type.

  - Foreign Key
      Adding a foreign key contraint ensures that when you create a record which references another record that the record being referenced exists. It will also prevents you from deleting a record that has other records associated with it. Here is how you add a foreign key contraint to an existing table:

          ALTER TABLE projects 
          ADD CONSTRAINT projects_students_fk 
          FOREIGN KEY (student_id) 
          REFERENCES students;
      
      You also write it as:

          ALTER TABLE projects 
          ADD CONSTRAINT projects_students_fk 
          FOREIGN KEY (student_id) 
          REFERENCES students
          ON DELETE CASCADE;
      
      This way if you delete a student record and there are project records associted with it, they will be deleted as well.

- Database Normalization
      Database Normalization is the process of reorganizing the columns in your database to avoid redudndency. To noramlize your database you can reorganize your database so that the value that can be calculated don't have to be stored.

      In some scenarios we may want to have redundant data to speed up the application by avoiding queries that may time time to execute.

  Database Transactions
      If you have a group of queries that you want to either have them all execute successfully or none of them at all, you can use transactions. You can start your queries with the keyword BEGIN and then if you want the transactions to take effect you can run COMMIT, otherwise you can run ROLLBACK.

  Database Indexing
      To speed up fetching data from databases, you can use indexes. It asks the database to store an extra data structure that helps you fetch data quickly. Keep in mind that having an index means extra storage and extra work when inserting data to update stroage.

  Unique vs. Non-Unique
      You can create the index as unique or non-unique depending on what you're expecting to store in that column. Note that unique index will add a unique contraint that prevents you from inserting another record. You can create an index by:

          CREATE UNIQUE INDEX email ON students (email);
  
  Composite Indexes
      If you're doing lots of queries that involve seaching with multiple fields at the same time then it makes more sense to have a composite index which is an index on multiple fields.