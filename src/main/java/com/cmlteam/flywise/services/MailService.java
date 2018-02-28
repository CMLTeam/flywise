package com.cmlteam.flywise.services;

import com.cmlteam.flywise.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private final JavaMailSender javaMailSender;

    @Autowired
    public MailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendEmailValidationMail(User user) {
        javaMailSender.send(mimeMessage -> {
            MimeMessageHelper m = new MimeMessageHelper(mimeMessage);
            m.setTo(user.getEmail());
            m.setFrom("noreply@flywise.world");
            m.setSubject("FlyWise - Email Validation Request");
            m.setText("<h1>Hi, " + user.getId() + "</h1>" +
                    "Welcome to FlyWise!<br>" +
                    "Please visit the link below to validate your email:<br>", true);
        });
    }
}
