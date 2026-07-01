*** steps to complete a project: ***
    1. project planning to to completion.
    2. Brainstorm & requirement analysis, ERD design.
    3. Project setup & prisma and DB connection.
    4. Prisma schema & model creation.
    5. Multi file prisma schema technique.
    6. Prisma Migration & client generation.
    7. Server & app setup. Demo API check & DB check

*** process to add access and refresh token for login user:
    In the service file, when the email and password match complete,
    then we will send an access and refresh token to the user.

*** send access and refresh token in cookie

*** Transaction & Rollback ***

# A transaction groups several database steps into one all_or_nothing unit.
# If all steps succeed --> changes are saved
# Any step fails --> everything undone

# A Rollback is the `undo button` of database, if a something goes wrong in mid-transaction, every changes made so far is reversed - like nothing happened.

*** ACID(`Atomic`, `Consistent`, `Isolated`, `Durable`) ***
# Its is set of 4 promises that every reliable database transaction makes
# Atomic  --> all steps happen, or none do,
# Consistent --> Money is never created or lost,
# Isolated --> Transaction do not interfere with one another 
# Durable --> Once saved! it saved for good