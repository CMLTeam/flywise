package com.cmlteam.flywise.services;

import com.cmlteam.flywise.model.User;
import org.springframework.jdbc.core.BeanPropertyRowMapper;

public class RowMappers {
    static final BeanPropertyRowMapper<User> User = new BeanPropertyRowMapper<>(User.class);
}
