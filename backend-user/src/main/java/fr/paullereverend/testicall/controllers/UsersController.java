package fr.paullereverend.testicall.controllers;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import fr.paullereverend.testicall.entities.Users;
import fr.paullereverend.testicall.models.UserAuth;
import fr.paullereverend.testicall.services.UsersService;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("user")
public class UsersController {
	@Autowired
	UsersService service;
	
	@RequestMapping(value = "/loggedUser", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
	public Users get(Authentication authentication) {
		return service.getById(authentication.getName());
	}
	@RequestMapping(value = "", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Users> getAll() {
		return service.getAll();
	}
	@RequestMapping(value = "", method = RequestMethod.PATCH,
            produces = MediaType.APPLICATION_JSON_VALUE)
	public Users update(@RequestBody Users user) {
		return service.update(user);
	}
	@RequestMapping(value = "", method = RequestMethod.DELETE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public Users delete(Authentication authentication) {
		Users user = service.getById(authentication.getName());
		return service.delete(user.getId());
	}

	@RequestMapping(value = "/sign-up", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public UserAuth signUp(HttpServletResponse response, @RequestBody Users user) {
		return  service.create(response, user);
	}
	
}
