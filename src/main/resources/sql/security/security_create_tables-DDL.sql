-- --------------------------------------------------------------------------------------------
-- project:      flywise
-- issue:        #74: wire-up spring security
-- trello:       https://trello.com/c/gg95nXuL
-- description:  DDL script creates all tables required
-- database(s):  flywise
-- dependencies: N/A
-- author:       vgorin
-- --------------------------------------------------------------------------------------------

-- USE flywise DB
CREATE DATABASE IF NOT EXISTS flywise;

USE flywise;

-- table for storing user credentials and credentials recovery info
DROP TABLE IF EXISTS user_auth;
CREATE TABLE user_auth (
  account VARCHAR(14) NOT NULL,
  CONSTRAINT PRIMARY KEY PK_user_auth(account),
  password VARCHAR(127) NOT NULL
);

-- table for storing user account data
DROP TABLE IF EXISTS user_account;
CREATE TABLE user_account(
  account VARCHAR(14) NOT NULL,
  CONSTRAINT PRIMARY KEY PK_user_auth(account),
  block_flag BIT NOT NULL DEFAULT 0,
  last_login DATETIME,
  last_logout DATETIME,
  last_ip INT
);

-- table for storing user role definitions
DROP TABLE IF EXISTS user_roles;
CREATE TABLE user_roles (
  id INT NOT NULL,
  CONSTRAINT PRIMARY KEY PK_user_roles(id),
  role VARCHAR(15) NOT NULL,
  description VARCHAR(255)
);

-- table for storing roles, assigned to the user
DROP TABLE IF EXISTS user_role;
CREATE TABLE user_role (
  account VARCHAR(14) NOT NULL,
  role_id INT NOT NULL,
  CONSTRAINT UNIQUE UQ_user_role(account, role_id)
);
