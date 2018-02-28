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
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class AppSecurityService {
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JdbcTemplate jdbcTemplate;
    private final MailService mailService;

    @Autowired
    public AppSecurityService(AuthenticationManager authenticationManager, UserService userService, JdbcTemplate jdbcTemplate, MailService mailService) {
        this.authenticationManager = authenticationManager;
        this.jdbcTemplate = jdbcTemplate;
        this.userService = userService;
        this.mailService = mailService;
    }

    public void login(String username, String password) throws BadCredentialsException {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                username, password);

        Authentication auth = authenticationManager.authenticate(token);
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    public void signup(String email, String password) {
        User user = new User(0, true, false, email, false, password, null, null, null, "ROLE_USER");
        userService.saveUser(user);
        String token = UUID.randomUUID().toString();
        jdbcTemplate.update("insert into user_email_verification (token,dateCreated,userID) values (?,?,?)",
                token, new Date(), user.getId());
        mailService.sendEmailVerificationMail(user, token);
        login(email, password);
    }

    public boolean verifyEmail(String token) {
        // TODO validate dateCreated - only allow to verify during 1 day
        List<Long> userId = jdbcTemplate.queryForList("select userId from user_email_verification where token=?", Long.class, token);
        if (!userId.isEmpty()) {
            jdbcTemplate.update("update user set emailVerified=1 where id=?", userId.get(0));
            return true;
        }
        return false;
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
