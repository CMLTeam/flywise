-- spring security: usersByUsernameQuery
SELECT
  a.account AS username,
  a.password AS password,
  1 ^ c.block_flag AS enabled
FROM user_auth a
INNER JOIN user_account c ON a.account = c.account
WHERE a.account = 'admin';


-- spring security: authoritiesByUsernameQuery
SELECT
  u.account AS username,
  r.role AS role
FROM user_role u
INNER JOIN user_roles r ON u.role_id = r.id
WHERE u.account = 'admin';
