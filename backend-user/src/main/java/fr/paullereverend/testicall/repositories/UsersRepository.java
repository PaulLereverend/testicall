package fr.paullereverend.testicall.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import fr.paullereverend.testicall.entities.Users;


@Repository
public interface UsersRepository extends JpaRepository<Users, Long>{
	public Users findByEmail(String email);
}