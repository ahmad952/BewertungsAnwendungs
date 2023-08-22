package de.hskl.swtp.api;

import java.io.IOException;

import java.sql.SQLException;
import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

import javax.inject.Inject;
import javax.inject.Singleton;

import javax.ws.rs.CookieParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


import de.hskl.swtp.rateme.db.RatingDB;
import de.hskl.swtp.rateme.db.UserDB;

import de.hskl.swtp.rateme.model.Rating;
import de.hskl.swtp.rateme.model.User;
import demo.api.security.AccessManager;

@Path("/rating") 
@Singleton 
public class RatingController {
	
	/*
	 * static public class ratingInputData { private String subject; private String
	 * content;
	 * 
	 * public String getSubject() { return subject; } public void setSubject(String
	 * subject) { this.subject = subject; } public String getContent() { return
	 * content; } public void setContent(String content) { this.content = content; }
	 * }
	 */
	@Inject 
	RatingDB RatingDB;
	
	 @Inject
	   AccessManager accessManager;
	   
	   @Inject
	   UserDB userManager;
	   
	   @Inject
	   Rating rating;
	   @Inject
	   RatingDB ratingDB;
	

@GET
@Path("/{osm_id}")
@Produces(MediaType.APPLICATION_JSON) 
public Response getAllRating(@PathParam("osm_id") long id) { 
	
	System.out.println("getAllRating"); 
	Collection<Rating> allrating = RatingDB.loadRatingsForPoi(id);
	System.out.println("osmid :"+id);
return Response.ok().entity(allrating).build();


}

@POST
@Path("/{osm_id}/{user_name}/{text}/{rating_type}/{foto}/{grade}")
public Response addrating(@CookieParam("LoginID") String loginId,@PathParam("osm_id") long omsid,
	                 	@PathParam("user_name") String usename,
	                 	 @PathParam("text") String text,
	                 	@PathParam("rating_type") String rating_type,
	                 	@PathParam("foto") String foto,
	                 	@PathParam("grade") int grade
	                 	
		               
		) throws IOException, SQLException 
{
	
	
	User user=userManager.loadUser(usename);
	int userid=user.getUser_id();
	System.out.println("userid :"+userid);
	System.out.println("username :"+usename);
	System.out.println("rating_type :"+rating_type);
	//System.out.println("foto :"+foto);
	System.out.println("grade :"+grade);
	//Access_controlle
	
		 
		
	 UUID  uuid = UUID.fromString(loginId);
     if( this.accessManager.isLoggedIn(uuid) == false )
     {
        System.out.println("ERROR Access not allowed");
        return Response.status(404, "Not logged in").build();
     }

     Optional<String> Username = accessManager.getLoginName( UUID.fromString(loginId) );
     if( Username.isPresent() == false )
     {
        System.out.println("ERROR Username not found");
        return Response.status(404, "Not logged in").build();
     }
		 
		 
	//chek user
     if(userManager.loadUser(usename)==null ) {
    	 System.out.println("ERROR User not known");
      return Response.status(404, "User not found").build();
     }
    //chek osmid
     if(omsid==0 ) {
    	 System.out.println("ERROR omsid not known");
      return Response.status(404, "User not found").build();
     }
     
    rating =new Rating(userid,omsid,rating_type,grade,text,foto);
    RatingDB.createRating(rating);
    
	return Response.ok().build();
}

//@POST
//@Consumes(MediaType.APPLICATION_JSON)
//public Response addNote(Rating rating, @CookieParam("LoginID") String loginId) throws SQLException
//{
//  // Access-controll
//   UUID  uuid = UUID.fromString(loginId);
//   if( this.accessManager.isLoggedIn(uuid) == false )
//   {
//      System.out.println("ERROR Access not allowed");
//      return Response.status(404, "Not logged in").build();
//      
//   }
//
//   Optional<String> username = accessManager.getLoginName( UUID.fromString(loginId) );
//   if( username.isPresent() == false )
//   {
//      System.out.println("ERROR Username not found");
//      return Response.status(404, "Not logged in").build();
//   }
//   
//   // Check user
//   if(userManager.loadUser(user.getUsername())==null )
//   {
//   
//      System.out.println("ERROR User not known");
//      return Response.status(404, "User not found").build();
//   }
//       this.RatingDB.createRating(rating);
//  
//   
//   return Response.ok().build();
//}
@GET
@Path("/{Username}")
@Produces(MediaType.APPLICATION_JSON) 
public Response getuserrating(@PathParam("Username") String UserName,
		@CookieParam("LoginID") String loginId) throws IOException
{
	
		
		  System.out.println("id von cookie : "+loginId); UUID uuid =
		  UUID.fromString(loginId); if( this.accessManager.isLoggedIn(uuid) == false )
		  { System.out.println("ERROR Access not allowed"); return Response.status(404,
		  "Not logged in").build(); }
		  
		  Optional<String> username = accessManager.getLoginName(
		  UUID.fromString(loginId) ); if( username.isPresent() == false ) {
		  System.out.println("ERROR Username not found"); return Response.status(403,
		  "User not found").build(); }
		 
    //chek user
  
    User user =userManager.loadUser(UserName);
    int  userId= user.getUser_id();    
    		
    if(userManager.loadUser(userId)==null) {
    	System.out.println("ERROR User not found");
        return Response.status(404, "User not found").build();
    }
    
  
    Collection<Rating> allrating=ratingDB.loadRatingsForUser(userId);
  
	 return Response.ok().entity(allrating).build();
}

}




