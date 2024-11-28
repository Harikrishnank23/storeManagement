# storeManagement
consists of 3 servers where master can create staff and supervisors, supervisors can perform CRUD operation on store management and staff can login and get their respective page .

All logins are authenticated and token is generated using jwt.
All CRUD operations are performed only after authoristion using jwt.
Deletion is softdelete that is not permenently deleted from db.
All api calls are logged in a logger table.
All error messages during api calls are logged in loggerException table to make debugging easy
mvc pattern is used in code structuring.
constants,bycrypting,jwt verification etc... are seperated.
