package com.cmlteam.flywise.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.sql.DataSource;

/**
 * @author vgorin
 * file created on 2/11/18 5:22 PM
 */


@Configuration
@EnableGlobalMethodSecurity(
        prePostEnabled = true,
        securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final DataSource dataSource;

    @Autowired
    public SecurityConfig(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication().dataSource(dataSource).passwordEncoder(passwordEncoder())
                .usersByUsernameQuery("SELECT\n" +
                        "  a.account AS username,\n" +
                        "  a.password AS password,\n" +
                        "  1 ^ c.block_flag AS enabled\n" +
                        "FROM user_auth a\n" +
                        "INNER JOIN user_account c ON a.account = c.account\n" +
                        "WHERE a.account = ?")
                .authoritiesByUsernameQuery("SELECT\n" +
                        "  u.account AS username,\n" +
                        "  r.role AS role\n" +
                        "FROM user_role u\n" +
                        "INNER JOIN user_roles r ON u.role_id = r.id\n" +
                        "WHERE u.account = ?"
                );
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .anyRequest().permitAll()
				.antMatchers("/api/**").authenticated()
                .and().formLogin().loginPage("/login")
                .and().exceptionHandling().accessDeniedPage("/403");
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}