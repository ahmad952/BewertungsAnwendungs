package de.hskl.swtp.rateme.model;

import java.sql.Date;

public class User {
	private int user_id;
	private String username;
	private String E_Mail;
	private String firstname;
	private String lastname;
	private String street;
	private String streetNr;
	private String zip;
	private String city;
	private String password;
	private Date  create_dt;//auto
	private Date  modify_dt;//auto
	
	public User () {
		
	}
	
	public User( String username, String e_Mail, String firstname, String lastname, String street,
			String streetNr, String zip, String city, String password) {
		this.username = username;
		E_Mail = e_Mail;
		this.firstname = firstname;
		this.lastname = lastname;
		this.street = street;
		this.streetNr = streetNr;
		this.zip = zip;
		this.city = city;
		this.password = password;
		
	}
	
	public User( int user_id,String username, String e_Mail, String firstname, String lastname, String street,
			String streetNr, String zip, String city, String password,Date createDate, Date modifyDate) {
		super();
		this.user_id = user_id;

		this.username = username;
		E_Mail = e_Mail;
		this.firstname = firstname;
		this.lastname = lastname;
		this.street = street;
		this.streetNr = streetNr;
		this.zip = zip;
		this.city = city;
		this.password = password;
		this.create_dt = createDate;
		this.modify_dt = modifyDate;
		
	}
	public int getUser_id() {
		return user_id;
	}
	public String getUsername() {
		return username;
	}
	public String getE_Mail() {
		return E_Mail;
	}
	public String getFirstname() {
		return firstname;
	}
	public String getLastname() {
		return lastname;
	}
	public String getStreet() {
		return street;
	}
	public String getStreetNr() {
		return streetNr;
	}
	public String getZip() {
		return zip;
	}
	public String getCity() {
		return city;
	}
	public String getPassword() {
		return password;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public Date getModify_dt() {
		return modify_dt;
	}
	
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setE_Mail(String e_Mail) {
		E_Mail = e_Mail;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public void setStreetNr(String streetNr) {
		this.streetNr = streetNr;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}

	public void setModify_dt(Date modify_dt) {
		this.modify_dt = modify_dt;
	}

	

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (E_Mail == null) {
			if (other.E_Mail != null)
				return false;
		} else if (!E_Mail.equals(other.E_Mail))
			return false;
		if (city == null) {
			if (other.city != null)
				return false;
		} else if (!city.equals(other.city))
			return false;
		if (create_dt == null) {
			if (other.create_dt != null)
				return false;
		} else if (!create_dt.equals(other.create_dt))
			return false;
		if (firstname == null) {
			if (other.firstname != null)
				return false;
		} else if (!firstname.equals(other.firstname))
			return false;
		if (lastname == null) {
			if (other.lastname != null)
				return false;
		} else if (!lastname.equals(other.lastname))
			return false;
		if (modify_dt == null) {
			if (other.modify_dt != null)
				return false;
		} else if (!modify_dt.equals(other.modify_dt))
			return false;
		if (password == null) {
			if (other.password != null)
				return false;
		} else if (!password.equals(other.password))
			return false;
		if (street == null) {
			if (other.street != null)
				return false;
		} else if (!street.equals(other.street))
			return false;
		if (streetNr != other.streetNr)
			return false;
		if (user_id != other.user_id)
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		if (zip == null) {
			if (other.zip != null)
				return false;
		} else if (!zip.equals(other.zip))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "User [user_id=" + user_id + ", username=" + username + ", E_Mail=" + E_Mail + ", firstname=" + firstname
				+ ", lastname=" + lastname + ", street=" + street + ", streetNr=" + streetNr + ", zip=" + zip
				+ ", city=" + city + ", password=" + password + ", create_dt=" + create_dt + ", modify_dt=" + modify_dt
				+ "]";
	}
	

}
