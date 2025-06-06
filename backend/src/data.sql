CREATE TABLE expenses (
  ID SERIAL PRIMARY KEY,
  Date DATE NOT NULL,         
  Category VARCHAR(50) NOT NULL,
  Payment VARCHAR(50) NOT NULL,
  Amount INT NOT NULL,
  Note TEXT                     
);

SELECT * FROM expenses;