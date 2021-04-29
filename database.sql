-- CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

ALTER TABLE todo
  ADD COLUMN "checked" BOOLEAN DEFAULT FALSE;

-- live
CREATE TABLE folder(
    folder_id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

ALTER TABLE todo ADD COLUMN parent_folder_id INTEGER;

ALTER TABLE todo ALTER COLUMN parent_folder_id SET DEFAULT 0;
ALTER TABLE todo ALTER COLUMN parent_folder_id SET DEFAULT 0;
ALTER TABLE todo ALTER COLUMN parent_folder_id DROP SET DEFAULT 0;

UPDATE todo SET parent_folder_id=0;


ALTER TABLE folder 
RENAME COLUMN name TO folder_name;


INSERT INTO folder (folder_id, folder_name) VALUES (0, 'home');


ALTER TABLE todo 
   ADD CONSTRAINT fk_parent_folder_id
   FOREIGN KEY (parent_folder_id) 
   REFERENCES folder(folder_id);


ALTER TABLE folder ADD COLUMN parent_folder_id INTEGER;

UPDATE folder SET parent_folder_id=null;

ALTER TABLE folder 
   ADD CONSTRAINT fk_parent_folder_id_folder
   FOREIGN KEY (parent_folder_id) 
   REFERENCES folder(folder_id);



/*
todos table

 todo_id |               description               | checked | parent_folder_id
---------+-----------------------------------------+----------------------------
      74 | make orderable                          | f       | null
      85 | fix db delay                            | f       | 1
      38 | add complete by (date)                  | t       | 1


folders table

folder_id|               name                      | parent_folder_id
---------+-----------------------------------------+----------------------------
      1  | personal                                | null
      2  | coding                                  | 1
      3  | cleaning                                | 2

*/



-- dev
