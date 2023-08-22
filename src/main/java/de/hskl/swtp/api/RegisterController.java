package de.hskl.swtp.api;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Optional;
import java.util.UUID;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.NewCookie;
import javax.ws.rs.core.Response;

import de.hskl.swtp.rateme.db.UserDB;
import de.hskl.swtp.rateme.model.User;
import demo.api.security.AccessManager;

@Path("/register")
@Singleton
public class RegisterController
{
   @Inject
   UserDB userManager;

  @Inject
   AccessManager accessController;

   @POST
   @Consumes(MediaType.APPLICATION_JSON)

// public Response register(User user)
//{     
//    
//	   System.out.println(user);
//    if(userManager.loadUser(user.getUsername())==null) {
//    	
//    	return Response.status(200).build();
//    }else
//    {
//    	this.userManager.createUser(user);
//    	return Response.status(201).build();
// 
//    }
//    
//     
//     
//  }
//  
//}
   public Response register(User user)throws IOException, SQLException
{     
 try
 {
	     String username = user.getUsername();
		 String E_Mail = user.getE_Mail();
		 String firstname = user.getFirstname();
		 String lastname= user.getLastname();
		 String street = user.getStreet();
		 String streetNr= user.getStreetNr();
		 String zip =user.getZip();
		 String city =user.getCity();
		 // ich nehme das pass
		 String password= user.getPassword();
		 // neu salz mit length 6
		 Optional <String> salz= UserDB.generateSalt(6);
		 //  pass mit salt hashing
		 Optional <String> hashpassundssalz =UserDB.hashPassword(password, salz.get());
		 String neupass= salz.get()+":"+hashpassundssalz.get();
		 //neue user mit hasing pass
		 User neuUser=new User(username,E_Mail,firstname,lastname,street,streetNr,zip,city,neupass);
	   System.out.println(neuUser);
	 
    this.userManager.createUser(neuUser);
    UUID uuid = this.accessController.login(neuUser.getUsername());
    NewCookie loginCookie = new NewCookie("LoginID", uuid.toString());
    
    return Response.status(200).cookie(loginCookie).build();
 }
 catch (Exception exce)
 {
    System.out.println("ERROR " + exce.getMessage() );
    return Response.status(404).build();
 }
 
}
}
