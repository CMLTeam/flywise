#!/usr/bin/env bash

echo "
create database flywise CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
grant all privileges on flywise.* to 'flywise'@'%' identified by 'flywise';
flush privileges;
" | mysql -uroot -p
