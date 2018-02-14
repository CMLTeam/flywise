package com.cmlteam.flywise.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author vgorin
 * file created on 2/11/18 5:04 PM
 */


@Controller
public class WebController {

	/*@RequestMapping(value={"/","home"})
	public String home(){
		return "home";
	}

	@PreAuthorize("hasRole('USER')")
	@RequestMapping(value={"/welcome"})
	public String welcome(){
		return "welcome";
	}

	@PreAuthorize("hasRole('ADMIN')")
	@RequestMapping(value="/admin")
	public String admin(){
		return "admin";
	}

	@RequestMapping(value={"/login"})
	public String login(){
		return "login";
	}

	@RequestMapping(value="/403")
	public String Error403(){
		return "403";
	}*/

	@RequestMapping(value = {"/user/**"})
	public String index() {
		return "forward:/";
	}
}
