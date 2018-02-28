package com.cmlteam.flywise.services;

import com.cmlteam.flywise.configs.Conf;
import com.cmlteam.flywise.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private final JavaMailSender javaMailSender;
    private final Conf conf;

    @Autowired
    public MailService(JavaMailSender javaMailSender, Conf conf) {
        this.javaMailSender = javaMailSender;
        this.conf = conf;
    }

    public void sendEmailVerificationMail(User user, String token) {
        javaMailSender.send(mimeMessage -> {
            MimeMessageHelper m = new MimeMessageHelper(mimeMessage);
            m.setTo(user.getEmail());
            m.setFrom("noreply@flywise.world");
            m.setSubject("FlyWise - Email Verification Request");
            String verifyLink = conf.getAppBaseUrl() + "/verifyEmail/" + token;
            m.setText("<h1>Hi, " + user.getId() + "</h1>" +
                    "Welcome to FlyWise!<br>" +
                    "Please visit the link below to confirm your email:<br>" +
                    "<a href=\"" + verifyLink + "\">" + verifyLink + "</a>", true);
        });
    }
}
