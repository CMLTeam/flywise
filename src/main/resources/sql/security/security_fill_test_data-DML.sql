-- --------------------------------------------------------------------------------------------
-- project:      flywise
-- issue:        #74: wire-up spring security
-- trello:       https://trello.com/c/gg95nXuL
-- description:  DML script creates test data
-- database(s):  flywise
-- dependencies: security_create_tables-DDL.sql
-- author:       vgorin
-- --------------------------------------------------------------------------------------------

-- USE flywise DB
CREATE DATABASE IF NOT EXISTS flywise;

USE flywise;

-- insert users admin:admin and user:user
TRUNCATE TABLE user_auth;
INSERT INTO user_auth(account, password)
VALUES('admin', '$2a$10$feOMGZ60/NPAO2fsDw/By.tA03F.yaggfiqtd9cluPqDSr7y0bSrG');
INSERT INTO user_auth(account, password)
VALUES('user', '$2a$10$yOdxUyBD6.Wyl8usvs2kp.NHnIfx9O6sXsZH36YMQVHWtFFz9Qcwe');

-- insert user accounts for admin and user users
TRUNCATE TABLE user_account;
INSERT INTO user_account(account)
VALUES('admin');
INSERT INTO user_account(account)
VALUES('user');

-- grant permission 0x1 to user admin and permission 0x100 to user user
TRUNCATE TABLE user_roles;
INSERT INTO user_roles(id, role, description)
VALUES(0x1, 'ROLE_ADMIN', 'User with the highest privileges');
INSERT INTO user_roles(id, role, description)
VALUES(0x100, 'ROLE_USER', 'User with the middle privileges');
INSERT INTO user_roles(id, role, description)
VALUES(0x10000, 'ROLE_GUEST', 'User with the lowest privileges');

-- grant permission 0x1 to user admin and permission 0x100 to user user
TRUNCATE TABLE user_role;
INSERT INTO user_role(account, role_id)
VALUES('admin', 0x1);
INSERT INTO user_role(account, role_id)
VALUES('user', 0x100);
