package com.cmlteam.flywise.services;

import com.cmlteam.flywise.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service
public class AppSecurityService {
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public AppSecurityService(AuthenticationManager authenticationManager, UserService userService, JdbcTemplate jdbcTemplate) {
        this.authenticationManager = authenticationManager;
        this.jdbcTemplate = jdbcTemplate;
        this.userService = userService;
    }

    public void login(String username, String password) throws BadCredentialsException {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                username, password);

        Authentication auth = authenticationManager.authenticate(token);
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    public void signup(String email, String password) {
        User user = new User(0, true, false, null, null, email, null, "ROLE_USER");
        userService.saveUser(user);
        login(email, password);
    }

    /**
     * XXX see https://github.com/spring-projects/spring-security/issues/4760
     */
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        new SecurityContextLogoutHandler().logout(request, response, authentication);
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null ||
                authentication.getAuthorities().size() == 1 && "ROLE_ANONYMOUS".equals(authentication.getAuthorities().iterator().next().getAuthority()))
            return new User();

        User user = (User) authentication.getPrincipal();
        return user;
    }
}
