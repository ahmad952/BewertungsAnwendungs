package de.hskl.swtp.rateme.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;

import de.hskl.swtp.rateme.model.RatemeDbException;
import de.hskl.swtp.rateme.model.Rating;

public class RatingDB {
	 private RatingDB()
	   {
	   }
	 private DBConnection dbConnection = DBConnection.getInstance();
	 private static RatingDB instance;
	 
	 public static RatingDB getInstance()
	   {
	      if (instance == null)
	      {
	         instance = new RatingDB();
	      }

	      return instance;
	   }
	 private String createRatingsqlQuery ="INSERT INTO rateme_rating(user_id, osm_id, rating_type, grade, txt, image_path)VALUES (?, ?, ?, ?, ?, ?)";
	 private String loadRatingBysqlQuery ="SELECT* from rateme_rating WHERE rating_id=?";
	 private String loadRatingsForPoiSQL="SELECT* from rateme_rating WHERE osm_id=?";
	 private String loadRatingsForUserSQL="SELECT* from rateme_rating WHERE user_id=?";
	 
	public int createRating(Rating rating) throws SQLException {
		int result=0;
		 try (Connection connection = dbConnection.getConnection(); 
				 PreparedStatement pstmt = connection.prepareStatement(createRatingsqlQuery)){
			 pstmt.setLong(1, rating.getUser_id());
			 pstmt.setLong(2, rating.getOsm_id());
			 pstmt.setString(3, rating.getRating_type());
			 pstmt.setInt(4, rating.getGrade());
			 pstmt.setString(5, rating.getTxt());
			 pstmt.setString(6, rating.getImage_path());
			 
			 result = pstmt.executeUpdate();//gibt der zahl der Zeile ,die hinzufügt oder editiert werden ,und 0 wenn kine
			 
			 
		 }
		return result;
	}
	
	public Rating loadRating(int ratingId) throws SQLException {
		try (Connection connection = dbConnection.getConnection();
				 PreparedStatement pstmt = connection.prepareStatement(loadRatingBysqlQuery))
		 {
			pstmt.setLong(1, ratingId);
			try (ResultSet rs = pstmt.executeQuery())
	         {
				 Rating rating = null;

	            while (rs.next())
	            {
	               if (rating == null) {
	            	   rating = new Rating(rs.getInt(1),rs.getLong(2),rs.getString(3),rs.getInt(4),rs.getString(5),rs.getString(6));
	               }
	            }
	            return rating ; 
	         }
			
		 }catch (SQLException ex) {
        	 ex.printStackTrace();
	         throw new RatemeDbException("ERROR loadRatingByID", ex);
		}
		
	}
	public Collection<Rating> loadRatingsForPoi(long osmId){
		Collection<Rating> Ratings = new ArrayList<>();
		try (Connection connection = dbConnection.getConnection();
				 PreparedStatement pstmt = connection.prepareStatement(loadRatingsForPoiSQL))
		 {
			pstmt.setLong(1, osmId);
			try (ResultSet rs = pstmt.executeQuery())
	         {
				while (rs.next())
	            {
					Rating rating=new Rating(rs.getLong(1),rs.getInt(2),rs.getLong(3),rs.getString(4),rs.getInt(5),rs.getString(6),rs.getString(7),rs.getDate(8),rs.getDate(9));
					Ratings.add(rating);
	            }
				
				
	         }
			
		 }catch (SQLException ex) {
        	 ex.printStackTrace();
	         throw new RatemeDbException("ERROR loadRatingsForPoi", ex);
		}
		 return Ratings;

	}
	public Collection<Rating> loadRatingsForUser(int userId){
		Collection<Rating> Ratings = new ArrayList<>();
		try (Connection connection = dbConnection.getConnection();
				 PreparedStatement pstmt = connection.prepareStatement(loadRatingsForUserSQL))
		 {
			pstmt.setLong(1, userId);
			try (ResultSet rs = pstmt.executeQuery())
	         {
				while (rs.next())
	            {
					Rating rating=new Rating(rs.getLong(1),rs.getInt(2),rs.getLong(3),rs.getString(4),rs.getInt(5),rs.getString(6),rs.getString(7),rs.getDate(8),rs.getDate(9));
					Ratings.add(rating);
	            }
				
				
	         }
			
		 }catch (SQLException ex) {
        	 ex.printStackTrace();
	         throw new RatemeDbException("ERROR loadRatingsForUser", ex);
		}
		 return Ratings;
		
	}

}
