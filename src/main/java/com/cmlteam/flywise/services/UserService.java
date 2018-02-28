package com.cmlteam.flywise.services;

import com.cmlteam.flywise.aux.RowMappers;
import com.cmlteam.flywise.model.User;
import com.cmlteam.flywise.util.UpdateBuilder;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {
    private final JdbcTemplate jdbcTemplate;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(JdbcTemplate jdbcTemplate, PasswordEncoder passwordEncoder) {
        this.jdbcTemplate = jdbcTemplate;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return jdbcTemplate.queryForObject("select * from user where username=? and deleted=0", RowMappers.User, username);
    }

    // TODO pagination
    public List<User> listUsers() {
        return jdbcTemplate.query("select * from user where deleted=0", RowMappers.User);
    }

    public User loadUser(long id) {
        return jdbcTemplate.queryForObject("select * from user where id=? and deleted=0", RowMappers.User, id);
    }

    @PreAuthorize("hasRole('ADMIN') || #user.id == 0 || #user.id == authentication.principal.id")
    public void saveUser(User user) {
        String password = user.getPassword();
        if (user.getId() == 0) { // add
            int count = jdbcTemplate.queryForObject("select count(*) from user where deleted=0 and username=?", Integer.class, user.getUsername());
            if (count > 0) {
                throw new RuntimeException("This username is already taken");
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            long id = new SimpleJdbcInsert(jdbcTemplate)
                    .withTableName("user")
                    .usingGeneratedKeyColumns("id")
                    .executeAndReturnKey(new BeanPropertySqlParameterSource(user)).longValue();
            user.setId(id);
        } else { // update
            UpdateBuilder updateBuilder = new UpdateBuilder("user")
                    .whereId(user.getId())
                    .set("username", user.getUsername())
                    .set("enabled", user.isEnabled())
                    .set("firstName", user.getFirstName())
                    .set("lastName", user.getLastName())
                    .set("email", user.getEmail())
                    .set("phone", user.getPhone())
                    .set("role", user.getRole());
            if (StringUtils.isNotEmpty(password)) {
                updateBuilder.set("password", passwordEncoder.encode(password));
            }
            updateBuilder.execute(jdbcTemplate);
        }
    }

    @PreAuthorize("hasRole('ADMIN') || #id == authentication.principal.id")
    public void deleteUser(long id) {
        jdbcTemplate.update("update user set deleted=1 where id=?", id);
    }
}
