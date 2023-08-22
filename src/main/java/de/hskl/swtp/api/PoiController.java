package de.hskl.swtp.api;

import java.util.Collection;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import de.hskl.swtp.rateme.db.PoiDB;
import de.hskl.swtp.rateme.model.Poi;

@Path("/poi") 
@Singleton 
public class PoiController {
	@Inject 
	PoiDB poiDB;
	

@GET
@Produces(MediaType.APPLICATION_JSON) 
public Response getAllPoi() { 
	System.out.println("getAllPoi"); 
	Collection<Poi> allPoi = poiDB.loadPois();
return Response.ok().entity(allPoi).build();
}
@GET
@Path("/{osm_id}")
@Produces(MediaType.APPLICATION_JSON) 
public Response getgenauePoi(@PathParam("osm_id") long id) { 
	System.out.println("getgenaue id"+ id); 
	Poi allPoi = poiDB.loadPoi(id);
return Response.ok().entity(allPoi).build();
}
}

