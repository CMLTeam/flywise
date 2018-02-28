package com.cmlteam.flywise.services;

import com.cmlteam.flywise.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private final JavaMailSender javaMailSender;

    @Autowired
    public MailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendEmailValidationMail(User user) {
        SimpleMailMessage simpleMessage = new SimpleMailMessage();
        simpleMessage.setTo(user.getEmail());
        simpleMessage.setFrom("noreply@flywise.world");
        simpleMessage.setSubject("FlyWise - Email Validation Request");
        simpleMessage.setText("Hi, " + user.getId());
        javaMailSender.send(simpleMessage);
    }
}
