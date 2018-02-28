package com.cmlteam.flywise.controllers;

import com.cmlteam.flywise.aux.ForbiddenException;
import com.cmlteam.flywise.services.AppSecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * @author vgorin
 * file created on 2/11/18 5:04 PM
 */


@Controller
public class WebController {

	private final AppSecurityService appSecurityService;

	@Autowired
	public WebController(AppSecurityService appSecurityService) {
		this.appSecurityService = appSecurityService;
	}

	@RequestMapping(value="/403")
	@ResponseBody
	public void accessDenied(){
		throw new ForbiddenException("Forbidden");
	}

	@RequestMapping(value = "/verifyEmail/{token}", method = GET)
	@ResponseBody
	public String verifyEmail(@PathVariable String token) {
		if (appSecurityService.verifyEmail(token)) {
			return "Email verified!";
		} else {
			return "Hmmmm, we can't confirm your email =(";
		}
	}

	@RequestMapping(value = {"/user/**"})
	public String index() {
		return "forward:/";
	}
}
