-- CREATE DATABASE perntodo;

CREATE TABLE todo(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    checked BOOLEAN DEFAULT FALSE,
    parentFolderId INTEGER
);


-- live
CREATE TABLE folder(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    parentFolderId INTEGER
);




INSERT INTO folder (id, name, parentFolderId) VALUES (0, 'home', null);

ALTER TABLE todo 
   ADD CONSTRAINT fkParentFolderIdTodo
   FOREIGN KEY (parentFolderId) 
   REFERENCES folder(id);

ALTER TABLE folder 
   ADD CONSTRAINT fkParentFolderIdFolder
   FOREIGN KEY (parentFolderId) 
   REFERENCES folder(id);


CREATE TABLE ip (ip VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY, lat double precision, lon double precision);
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
