package de.hskl.swtp.rateme.db;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Base64;
import java.util.Optional;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

import de.hskl.swtp.rateme.model.RatemeDbException;
import de.hskl.swtp.rateme.model.User;

public class UserDB {
	
	 private UserDB()
	   {
	   }
	 private DBConnection dbConnection = DBConnection.getInstance();
	private static UserDB instance;
	private String loadUserIdSqlQuery ="SELECT * from rateme_user WHERE user_id=?";
	private String createUsersqlQuery="INSERT INTO rateme_user(username,E_Mail,firstname,lastname,street,streetNr,zip,city,password)VALUES(?,?,?,?,?,?,?,?,?)";
	private String loadUserbyusername="SELECT * from rateme_user WHERE username=?";
	private String validatePasswordSqlQuery="SELECT * from rateme_user WHERE username = ? AND password = ?";
	   public static UserDB getInstance()
	   {
	      if (instance == null)
	      {
	         instance = new UserDB();
	      }

	      return instance;
	   }
	
	public int  createUser(User user) {
		int result=0;
		 try (Connection connection = dbConnection.getConnection(); 
				 PreparedStatement pstmt = connection.prepareStatement(createUsersqlQuery)){
			 
             pstmt.setString(1, user.getUsername());
             pstmt.setString(2, user.getE_Mail());
             pstmt.setString(3, user.getFirstname());
             pstmt.setString(4, user.getLastname());
             pstmt.setString(5, user.getStreet());
             pstmt.setString(6, user.getStreetNr());
             pstmt.setString(7, user.getZip());
             pstmt.setString(8, user.getCity());
             pstmt.setString(9, user.getPassword());
             
              result = pstmt.executeUpdate();//gibt der zahl der Zeile ,die hinzufügt oder editiert werden ,und 0 wenn kine
             
		 } catch (SQLException ex) {
		 ex.printStackTrace();
         throw new RatemeDbException("ERROR Creat User", ex);
	}
		return result;
		
	}
	public User loadUser(long userId)throws IOException
 {
		
 try (Connection connection = dbConnection.getConnection();
				 PreparedStatement pstmt = connection.prepareStatement(loadUserIdSqlQuery))
		 {
			 pstmt.setLong(1, userId);
			 try (ResultSet rs = pstmt.executeQuery())
	         {
				 User user = null;

	            while (rs.next())
	            {
	               if (user == null)
	               
	                  user = new User(rs.getInt(1), rs.getString(2),
	                		  rs.getString(3), rs.getString(4),
	                		  rs.getString(5),rs.getString(6),
	                		  rs.getString(7),rs.getString(8),
	                		  rs.getString(9),rs.getString(10),
	                		  rs.getDate(11),rs.getDate(12));
	               }
         return user;
	               
	            }
	         
	         }
	           
	         catch (SQLException ex) {
	        	 ex.printStackTrace();
		         throw new RatemeDbException("ERROR loadUserByID", ex);
			}
		 		 
	}
	
	public User loadUser(String userName) {
		 try (Connection connection = dbConnection.getConnection();
				 PreparedStatement pstmt = connection.prepareStatement(loadUserbyusername))
		 {
			 pstmt.setString(1, userName);
			 try (ResultSet rs = pstmt.executeQuery())
	         {
				 User loadedUser = null;

	            while (rs.next())// hier vielleich braucht man  kein while() 
	            {
	               if (loadedUser == null)
	               {
	                  loadedUser = new User(rs.getInt(1), rs.getString(2),
	                		  rs.getString(3), rs.getString(4),
	                		  rs.getString(5),rs.getString(6),
	                		  rs.getString(7),rs.getString(8),
	                		  rs.getString(9),rs.getString(10),
	                		  rs.getDate(11),rs.getDate(12));
	               }

	               
	            }
  
	            return loadedUser;
	         }
			 
		 }catch (SQLException ex)
	      {
	         ex.printStackTrace();
	         throw new RatemeDbException("ERROR loadUserByname", ex);
	      }
		
	}
	public Boolean validatePassword(String username, String password) throws SQLException {

		try (Connection connection = dbConnection.getConnection();
				 PreparedStatement pstmt = connection.prepareStatement(validatePasswordSqlQuery))
		 {
			pstmt.setString(1, username);
			pstmt.setString(2, password);
			try (ResultSet rs = pstmt.executeQuery())
			
 //Ruft ab, ob sich der Cursor vor der ersten Zeile in diesem ResultSet-Objekt befindet.	
			//Rückgabe: true, wenn sich der Cursor vor der ersten Zeile befindet; false, wenn sich der Cursor
			//an einer anderen Position befindet oder die Ergebnismenge keine Zeilen enthäl
			// getRow() = Rückgabe: die aktuelle Zeilennummer; 0, wenn keine aktuelle Zeile vorhanden ist
			{ 
if(!rs.isBeforeFirst() && rs.getRow() == 0) 
	return false;

	return true;

			
	         }
		 }
	catch (SQLException ex)
    {
        ex.printStackTrace();
        throw new RatemeDbException("ERROR loadUserByname", ex);
     }

}
	//pass salz mit hasching
	 private static final int ITERATIONS = 65536;
	  private static final int KEY_LENGTH = 512;
	  private static final String ALGORITHM = "PBKDF2WithHmacSHA512";

	  public static Optional<String> hashPassword (String password, String salt) {
       //stat string 
	    char[] chars = password.toCharArray();
	    byte[] bytes = salt.getBytes();

	    PBEKeySpec spec = new PBEKeySpec(chars, bytes, ITERATIONS, KEY_LENGTH);

	    Arrays.fill(chars, Character.MIN_VALUE);

	    try {
	      SecretKeyFactory fac = SecretKeyFactory.getInstance(ALGORITHM);
	      byte[] securePassword = fac.generateSecret(spec).getEncoded();
	      return Optional.of(Base64.getEncoder().encodeToString(securePassword));

	    } catch (NoSuchAlgorithmException | InvalidKeySpecException ex) {
	      System.err.println("Exception encountered in hashPassword()");
	      return Optional.empty();

	    } finally {
	      spec.clearPassword();
	    }
	  }
	private static final SecureRandom RAND = new SecureRandom();
	
	 public static Optional<String> generateSalt (final int length) {

		    if (length < 1) {
		      System.err.println("error in generateSalt: length must be > 0");
		      return Optional.empty();
		    }

		    byte[] salt = new byte[length];
		    RAND.nextBytes(salt);

		    return Optional.of(Base64.getEncoder().encodeToString(salt));
		  }	
}

