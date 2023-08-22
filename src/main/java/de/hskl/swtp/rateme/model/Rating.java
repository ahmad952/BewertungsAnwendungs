package de.hskl.swtp.rateme.model;


import java.sql.Date;

public class Rating {
private long rating_id;
private int user_id;
private long osm_id;
private String rating_type;
private int grade;
private String txt;
private String  image_path;
private Date create_dt;
private Date modify_dt;

public Rating() {
	
}

public Rating(long rating_id, int user_id, long osm_id, String rating_type, int grade, String txt, String image_path,
		Date create_dt, Date modify_dt) {
	super();
	this.rating_id = rating_id;
	this.user_id = user_id;
	this.osm_id = osm_id;
	this.rating_type = rating_type;
	this.grade = grade;
	this.txt = txt;
	this.image_path = image_path;
	this.create_dt = create_dt;
	this.modify_dt = modify_dt;
}
public Rating( int user_id, long osm_id, 
		String rating_type, int grade, String txt, String image_path) {
	this.user_id = user_id;
	this.osm_id = osm_id;
	this.rating_type = rating_type;
	this.grade = grade;
	this.txt = txt;
	this.image_path = image_path;
	
}
public long getRating_id() {
	return rating_id;
}
public long getUser_id() {
	return user_id;
}
public long getOsm_id() {
	return osm_id;
}
public String getRating_type() {
	return rating_type;
}
public int getGrade() {
	return grade;
}
public String getTxt() {
	return txt;
}
public String getImage_path() {
	return image_path;
}
public Date getCreate_dt() {
	return create_dt;
}
public Date getModify_dt() {
	return modify_dt;
}
@Override
public String toString() {
	return "Rating [rating_id=" + rating_id + ", user_id=" + user_id + ", osm_id=" + osm_id + ", rating_type="
			+ rating_type + ", grade=" + grade + ", txt=" + txt + ", image_path=" + image_path + ", create_dt="
			+ create_dt + ", modify_dt=" + modify_dt + "]";
}

}
