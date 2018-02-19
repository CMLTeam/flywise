package com.cmlteam.flywise.aux;

import com.cmlteam.flywise.model.User;
import org.springframework.jdbc.core.BeanPropertyRowMapper;

public class RowMappers {
    public static final BeanPropertyRowMapper<User> User = new BeanPropertyRowMapper<>(User.class);
}
