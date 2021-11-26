package fr.paullereverend.testicall.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class Users implements Serializable {

	
	@Id
	@Column(columnDefinition = "BINARY(16)")
	@GeneratedValue
	private UUID id;
	
	@Column(name = "email")
	private String email;
	
	
	@Column(name = "password", nullable = false)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;
	
}
