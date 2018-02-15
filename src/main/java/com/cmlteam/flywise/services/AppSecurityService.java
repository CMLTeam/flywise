package com.cmlteam.flywise.services;

import com.cmlteam.flywise.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AppSecurityService {
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AppSecurityService(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    public void login(String login, String password) throws BadCredentialsException {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                login, password);

        Authentication auth = authenticationManager.authenticate(token);
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null ||
                authentication.getAuthorities().size()==1 && "ROLE_ANONYMOUS".equals(authentication.getAuthorities().iterator().next().getAuthority()))
            return new User();

        User user = new User();

        Object principal = authentication.getPrincipal();
        org.springframework.security.core.userdetails.User principalUser = (org.springframework.security.core.userdetails.User) principal;
        user.setUsername(principalUser.getUsername());
        user.setRole(authentication.getAuthorities().iterator().next().getAuthority());

        return user;
    }
}
