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
//@EnableWebSecurity(debug = true)
@EnableGlobalMethodSecurity(
        prePostEnabled = true,
        securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final DataSource dataSource;

    @Autowired
    public SecurityConfig(DataSource dataSource) {
        this.dataSource = dataSource;
    }

//    @Override XXX hmmm wtf
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication().dataSource(dataSource).passwordEncoder(passwordEncoder())
                .usersByUsernameQuery("SELECT username,password,enabled FROM user WHERE username = ?")
                .authoritiesByUsernameQuery("SELECT username,role FROM user WHERE username = ?");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable() // TODO do we need it?
                .authorizeRequests()
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
