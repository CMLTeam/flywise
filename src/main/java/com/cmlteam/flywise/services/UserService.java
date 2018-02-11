package com.cmlteam.flywise.services;

import com.cmlteam.flywise.model.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class UserService {
    private List<User> USERS = Arrays.asList(
            new User(1, "Ivan", "Ivanov"),
            new User(2, "Peter", "Petrov"),
            new User(3, "Sidor", "Sidorov")
    );

    public List<User> listUsers() {
        return USERS;
    }

    public User loadUser(long id) {
        for (User user : USERS) {
            if (id == user.getId()) {
                return user;
            }
        }
        return null;
    }
    public void saveUser(User user) {
        if (user.getId() == 0) { // add
            USERS.add(user);
        } else { // update
            List<User> uu = new ArrayList<>(USERS.size());
            for (User u : USERS) {
                if (u.getId() == user.getId())
                    uu.add(user);
                else
                    uu.add(u);
            }
            USERS = uu;
        }
    }
}
