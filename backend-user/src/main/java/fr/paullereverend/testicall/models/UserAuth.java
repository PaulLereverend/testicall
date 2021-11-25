package fr.paullereverend.testicall.models;

import fr.paullereverend.testicall.entities.Users;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class UserAuth {

    private Users user;

    private String token;
}
