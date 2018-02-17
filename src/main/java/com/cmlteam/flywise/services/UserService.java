package com.cmlteam.flywise.services;

import com.cmlteam.flywise.model.User;
import com.cmlteam.flywise.util.UpdateBuilder;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final JdbcTemplate jdbcTemplate;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(JdbcTemplate jdbcTemplate, PasswordEncoder passwordEncoder) {
        this.jdbcTemplate = jdbcTemplate;
        this.passwordEncoder = passwordEncoder;
    }

    // TODO pagination
    public List<User> listUsers() {
        return jdbcTemplate.query("select * from user", RowMappers.User);
    }

    public User loadUser(long id) {
        return jdbcTemplate.queryForObject("select * from user where id=?", RowMappers.User, id);
    }

    public void saveUser(User user) {
        String password = user.getPassword();
        if (user.getId() == 0) { // add
            GeneratedKeyHolder holder = new GeneratedKeyHolder();
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

    public void deleteUser(long id) {
        jdbcTemplate.update("delete from user where id=?", id);
    }
}
