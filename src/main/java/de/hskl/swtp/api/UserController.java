
package de.hskl.swtp.api;

import java.io.IOException;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import de.hskl.swtp.rateme.db.UserDB;
import de.hskl.swtp.rateme.model.User;

@Path("/user") 
@Singleton 
public class UserController {
	@Inject 
	UserDB userDB;
	

@GET
@Path("/{userId}")
@Produces(MediaType.APPLICATION_JSON) 
public Response getAllPoiuser( @PathParam("userId") long user) throws IOException { 
	System.out.println("getuser"); 
	User user1 = userDB.loadUser(user);
	System.out.println(user1.getUsername());
	
return Response.ok().entity(user1).build();
}
}