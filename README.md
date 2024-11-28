# storeManagement
consists of 3 servers where master can create staff and supervisors, supervisors can perform CRUD operation on store management and staff can login and get their respective page .

All logins are authenticated and token is generated using jwt.
All CRUD operations are performed only after authoristion using jwt.
Deletion is softdelete that is not permenently deleted from db.
All api calls are logged in a logger table.
All error messages during api calls are logged in loggerException table to make debugging easy
mvc pattern is used in code structuring.
constants,bycrypting,jwt verification etc... are seperated.


db schema has been added to src/db/schema.sql file

-----------apis with payload for testing------
http://localhost:9001/master/login/masterLogin ---------post----------jwt
{
    "empUserName":"44444",
    "password":"44444",
    "userType":"admin"
}


http://localhost:9001/master/register/createStaff ---post-------jwt

{
    "empUserName":"11111",
    "password":"11111",
    "userType":"staff"
}



http://localhost:9001/supervisor/login/supervisorLogin-------post-----jwt
{
    "empUserName":"22222",
    "password":"22222",
    "userType":"supervisor"
}


http://localhost:9001/staff/login/staffLogin---post----jwt
{
    "empUserName":"11111",
    "password":"11111",
    "userType":"staff"
}


http://localhost:9001/supervisor/store/createStore----post---  jwt

{
    "storeNo":"s1",
    "storeName":"zudio",
    "area":"dubai"
}

http://localhost:9001/supervisor/store/updateStore----post---  jwt

{
    "storeNo":"s1",
    "storeName":"zudio",
    "area":"dubai"
}

http://localhost:9001/supervisor/store/listallStore---get---jwt