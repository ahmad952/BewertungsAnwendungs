package de.hskl.swtp.api;

import java.util.Optional;
//import java.util.Optional;
import java.util.UUID;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.CookieParam;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.NewCookie;
import javax.ws.rs.core.Response;

import de.hskl.swtp.rateme.db.UserDB;
import de.hskl.swtp.rateme.model.User;
import demo.api.security.AccessManager;

@Path("/logInOut")
@Singleton

public class logInOutcontroller {
	   @Inject
	   AccessManager accessManager;

	   @Inject
	   UserDB userManager;

	   @POST
	   @Consumes(MediaType.APPLICATION_JSON)
	   public Response login(User user)
	   {    
		   System.out.println("hallo");
		   
	       
	       
	      try
	      {
	    	    	  
	        
	         if(userManager.loadUser(user.getUsername())!=null )
	        	 
	         {
	        	 
	        	 String salz="";
	        	 String passDB =userManager.loadUser(user.getUsername()).getPassword();
	        	 //ich holle das salz von DB
	        	 for(int i=0;i<passDB.length();i++) {
	     			
	     			if(passDB.charAt(i)==':') {
	     				break;
	     			}
	     			salz+=passDB.charAt(i);
	     		}
	        	 // ich benuze hashpassword , damit die abgegebne pass mit salz hashing
	        	 Optional <String> hashpassundssalz =UserDB.hashPassword(user.getPassword(), salz);
	        	 //ich addiere salz mit :
	        	 String passmitsalzhasching = salz+":"+hashpassundssalz.get();
	        	 System.out.println("okkkk");
	        	 System.out.println(passmitsalzhasching);
	            //Check Password        	 
	        	 
	            if( userManager.validatePassword(user.getUsername(),passmitsalzhasching) == false )
	            {
	            	 
	               throw new RuntimeException("Wrong Password");
	            }
	            
	            //Login
	            UUID uuid = this.accessManager.login(user.getUsername());
	            NewCookie loginCookie = new NewCookie("LoginID", uuid.toString(),null,null,null,-1,false,true);
	            return Response.status(200).cookie(loginCookie).build();
	         }
	         else
	         {
	            throw new RuntimeException("User not known");
	         }
	      }
	      catch (Exception exce)
	      {
	    	  System.out.println("ee");
	         System.out.println("ERROR " + exce.getMessage() );
	         return Response.status(404).build();
	      }
	   }

	   @DELETE
	   @Consumes(MediaType.APPLICATION_JSON)
	   public Response logout(@CookieParam("LoginID") String loginId)
	   {
		   System.out.println("in logout loginid"+loginId);
	      try
	      {
	         this.accessManager.logout(UUID.fromString(loginId) );
	         return Response.status(200).cookie( (NewCookie) null).build();
	      }
	      catch (Exception exce)
	      {
	         System.out.println("ERROR " + exce.getMessage() );
	         return Response.status(404).build();
	      }
	   }
	}
