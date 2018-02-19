package com.cmlteam.flywise.controllers;

import com.cmlteam.flywise.aux.ForbiddenException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author vgorin
 * file created on 2/11/18 5:04 PM
 */


@Controller
public class WebController {

	@RequestMapping(value="/403")
	@ResponseBody
	public void accessDenied(){
		throw new ForbiddenException("Forbidden");
	}

	@RequestMapping(value = {"/user/**"})
	public String index() {
		return "forward:/";
	}
}
