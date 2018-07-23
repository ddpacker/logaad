package com.synechron.JDBC;  
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;  
import org.springframework.jdbc.core.JdbcTemplate;  
import org.springframework.web.bind.annotation.RestController;  


import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

@RestController  
public class SpringBootJdbcController {  
    @Autowired  
    JdbcTemplate jdbc; 
    @RequestMapping(value = "/CreateUser", method = RequestMethod.POST)
    public String CreateUser(@RequestBody  Map<String,Object> payload) throws InstantiationException, IllegalAccessException, SQLException {
    	/*
    	 SET @RESULT = -1;
		CALL sp_CreateUser('darren','Darre Packer','darren@lovescats.com','cat$123',0,@RESULT);
		SELECT @RESULT AS RESULT
    	 {
			"in_userid":"greg",
			"in_name":"Greg Garville",
			"in_email":"greg@clasic.com",
			"in_password":"clasic123",
			"in_active":"0"
		 }
    	 */

    	//Step 1
    	
    			try {
    				Class.forName("com.mysql.jdbc.Driver").newInstance();
    			}
    			catch(ClassNotFoundException e) {
    				System.out.println("Driver Class Not Found");
    			}
    			//Step 2
    			Connection con = DriverManager.getConnection("jdbc:mysql://localhost/stocksdb", "root", "password");    			
    			//Step 3
    			CallableStatement cstmt = null;
    			//Step 4
    			cstmt = con.prepareCall("{call sp_CreateUser(?,?,?,?,?,?)}");
    			cstmt.setString(1, payload.get("in_userid").toString());
    			cstmt.setString(2, payload.get("in_name").toString());
    			cstmt.setString(3, payload.get("in_email").toString());
    			cstmt.setString(4, payload.get("in_password").toString());
    			cstmt.setInt(5, Integer.parseInt(payload.get("in_active").toString()));  
    			cstmt.registerOutParameter(6, Types.INTEGER); //output parameter is second parameter type integer
    			cstmt.execute();
    			int pcount = cstmt.getInt(6);
    			System.out.println("The output value is " + pcount);
    			cstmt.close();
    			con.close();    	
    			
    			String outputMessage = "Operation Failed";
    			if(pcount==1) {
    				outputMessage = "Operation Succesful";
    			}
    			
    			JsonObject  userObject = Json.createObjectBuilder()
    					.add("userid", payload.get("in_userid").toString())
    					.add("name", payload.get("in_name").toString())
    					.add("email", payload.get("in_email").toString())
    					.add("password", payload.get("in_password").toString())
    					.add("active", payload.get("in_active").toString())
    					.build();
    			
    			JsonObject Message = Json.createObjectBuilder()
    					.add("User", userObject)
    					.add("Message", outputMessage)
    					.build();
    	
    			return Message.toString();    			 
    }
    
    
    //Buy or Sell Stocks
    @RequestMapping(value = "/BuyOrSellStocks", method = RequestMethod.POST)
    public String BuyOrSellStocks(@RequestBody  Map<String,Object> payload) throws InstantiationException, IllegalAccessException, SQLException {
    	/*
			SET @RESULT = -1;
			CALL sp_Buy_Sell_Stocks(
			'omar',
			'INTC',
			200,
			'S',
			120.50,
			@RESULT
			);
			SELECT @RESULT AS RESULT; 
   	 {
		"in_userid":"omar",
		"in_stockid":"INTC",
		"in_amount":200,
		"in_type":"B",
		"in_price":125.50
		 }
   	 */

   	//Step 1
    		System.out.println("UserID " + payload.get("in_userid") + " stockid " + payload.get("in_stockid") + " amount " + payload.get("in_amount") + " type " + payload.get("in_type") + " price " + payload.get("in_price"));
   	
   			try {
   				Class.forName("com.mysql.jdbc.Driver").newInstance();
   			}
   			catch(ClassNotFoundException e) {
   				System.out.println("Driver Class Not Found");
   			}
   			//Step 2
   			Connection con = DriverManager.getConnection("jdbc:mysql://localhost/stocksdb", "root", "password");    			
   			//Step 3
   			CallableStatement cstmt = null;
   			//Step 4
   			
   			cstmt = con.prepareCall("{call sp_Buy_Sell_Stocks(?,?,?,?,?,?)}");
   			cstmt.setString(1, payload.get("in_userid").toString());
   			cstmt.setString(2, payload.get("in_stockid").toString());
   			cstmt.setInt(3, Integer.parseInt(payload.get("in_amount").toString()));
   			cstmt.setString(4, payload.get("in_type").toString());
   			cstmt.setFloat(5, Float.parseFloat(payload.get("in_price").toString()));  
   			cstmt.registerOutParameter(6, Types.INTEGER); //output parameter is second parameter type integer
   			cstmt.execute();
   			int pcount = cstmt.getInt(6);
   			System.out.println("The output value is " + pcount);
   			cstmt.close();
   			con.close();    	
   			
   			String outputMessage = "Operation Failed";
   			if(pcount==1) {
   				outputMessage = "Operation Succesful";
   			}
   			
   			
   			JsonObject  userstockObject = Json.createObjectBuilder()
   					.add("userid", payload.get("in_userid").toString())
   					.add("stockid", payload.get("in_stockid").toString())
   					.add("amount", payload.get("in_amount").toString())
   					.add("type", payload.get("in_type").toString())
   					.add("price", payload.get("in_price").toString())
   					.build();
   			
   			JsonObject Message = Json.createObjectBuilder()
   					.add("Buy or Sell Stocks", userstockObject)
   					.add("Message", outputMessage)
   					.build();
   	
   			return Message.toString();
    }
    
  //Amount of stock by user
    @RequestMapping(value = "/AmountOfStockByUser", method = RequestMethod.POST)
    public String AmountOfStockByUser(@RequestBody  Map<String,Object> payload) throws InstantiationException, IllegalAccessException, SQLException {
    	/*
		SET @RESULT = -1;
		CALL sp_UserWalletbyStock('omar','INTC',@RESULT);
		SELECT @RESULT AS AMOUNT;
		
		
IN  in_userid varchar(20),
IN  in_stockid varchar(6),
OUT out_result INT		
   	 {
		"in_userid":"omar",
		"in_stockid":"INTC"

	 }
   	 */

   	//Step 1
    		System.out.println("UserID " + payload.get("in_userid") + " stockid " + payload.get("in_stockid"));
   	
   			try {
   				Class.forName("com.mysql.jdbc.Driver").newInstance();
   			}
   			catch(ClassNotFoundException e) {
   				System.out.println("Driver Class Not Found");
   			}
   			//Step 2
   			Connection con = DriverManager.getConnection("jdbc:mysql://localhost/stocksdb", "root", "password");    			
   			//Step 3
   			CallableStatement cstmt = null;
   			//Step 4
   			
   			cstmt = con.prepareCall("{call sp_UserWalletbyStock(?,?,?)}");
   			cstmt.setString(1, payload.get("in_userid").toString());
   			cstmt.setString(2, payload.get("in_stockid").toString());
   			cstmt.registerOutParameter(3, Types.INTEGER); //output parameter is second parameter type integer
   			cstmt.execute();
   			int pcount = cstmt.getInt(3);   			
   			cstmt.close();
   			con.close();    	
   			
   			String outputMessage = String.valueOf(pcount);
   			
   			JsonObject  useramountstockObject = Json.createObjectBuilder()
   					.add("userid", payload.get("in_userid").toString())
   					.add("stockid", payload.get("in_stockid").toString())
   					.build();
   			
   			JsonObject Message = Json.createObjectBuilder()
   					.add("Ammount of Stock for this user", useramountstockObject)
   					.add("Message", outputMessage)
   					.build();
   	
   			return Message.toString();    	
    }
    //Amount of stock by user
    @RequestMapping(value = "/MoneyGeneratedByUserStock", method = RequestMethod.POST)
    public String MoneyGeneratedByUserStock(@RequestBody  Map<String,Object> payload) throws InstantiationException, IllegalAccessException, SQLException {
    	/*
SET @RESULT = -1;
CALL sp_UserMoneyWalletByStock('omar','FBI',@RESULT);
SELECT @RESULT AS WALLET;
		
		
IN  in_userid varchar(20),
IN  in_stockid varchar(6),
OUT out_result INT		
   	 {
		"in_userid":"omar",
		"in_stockid":"INTC"

	 }
   	 */

   	//Step 1
    		System.out.println("UserID " + payload.get("in_userid") + " stockid " + payload.get("in_stockid"));
   	
   			try {
   				Class.forName("com.mysql.jdbc.Driver").newInstance();
   			}
   			catch(ClassNotFoundException e) {
   				System.out.println("Driver Class Not Found");
   			}
   			//Step 2
   			Connection con = DriverManager.getConnection("jdbc:mysql://localhost/stocksdb", "root", "password");    			
   			//Step 3
   			CallableStatement cstmt = null;
   			//Step 4
   			
   			cstmt = con.prepareCall("{call sp_UserMoneyWalletByStock(?,?,?)}");
   			cstmt.setString(1, payload.get("in_userid").toString());
   			cstmt.setString(2, payload.get("in_stockid").toString());
   			cstmt.registerOutParameter(3, Types.FLOAT); //output parameter is second parameter type integer
   			cstmt.execute();
   			float pcount = cstmt.getFloat(3);   			
   			cstmt.close();
   			con.close();    	
   			
   			String outputMessage = String.valueOf(pcount);
   			
   			JsonObject  usermoneystockObject = Json.createObjectBuilder()
   					.add("userid", payload.get("in_userid").toString())
   					.add("stockid", payload.get("in_stockid").toString())
   					.build();
   			
   			JsonObject Message = Json.createObjectBuilder()
   					.add("Money earned by stock", usermoneystockObject)
   					.add("Message", outputMessage)
   					.build();
   	
   			return Message.toString();     	
    }
    
    //Add or Remove to watchlist
    @RequestMapping(value = "/AddRemoveWatchlist", method = RequestMethod.POST)
    public String AddRemoveWatchlist(@RequestBody  Map<String,Object> payload) throws InstantiationException, IllegalAccessException, SQLException {
    	/*
SET @RESULT = -1;
CALL sp_AddRemoveWatchlist('omar','INTC',"R",@RESULT);
SELECT @RESULT AS RESULT;
		
		
IN  in_userid varchar(20),
IN  in_stockid varchar(6),
IN  in_type char(1),
OUT out_result INT		
   	 {
		"in_userid":"omar",
		"in_stockid":"INTC",
		"in_type":"A" 

	 }
   	 */

   	//Step 1
    		System.out.println("UserID " + payload.get("in_userid") + " stockid " + payload.get("in_stockid"));
   	
   			try {
   				Class.forName("com.mysql.jdbc.Driver").newInstance();
   			}
   			catch(ClassNotFoundException e) {
   				System.out.println("Driver Class Not Found");
   			}
   			//Step 2
   			Connection con = DriverManager.getConnection("jdbc:mysql://localhost/stocksdb", "root", "password");    			
   			//Step 3
   			CallableStatement cstmt = null;
   			//Step 4
   			
   			cstmt = con.prepareCall("{call sp_AddRemoveWatchlist(?,?,?,?)}");
   			cstmt.setString(1, payload.get("in_userid").toString());
   			cstmt.setString(2, payload.get("in_stockid").toString());
   			cstmt.setString(3, payload.get("in_type").toString());
   			cstmt.registerOutParameter(4, Types.INTEGER); //output parameter is second parameter type integer
   			cstmt.execute();
   			int pcount = cstmt.getInt(4);   			
   			cstmt.close();
   			con.close();    	
   			
   			String outputMessage = "Operation Failed";
   			if(pcount==1) {
   				outputMessage = "Operation Succesful";
   			}
   			
   			JsonObject  AddRemoveStockWatchlistObject = Json.createObjectBuilder()
   					.add("userid", payload.get("in_userid").toString())
   					.add("stockid", payload.get("in_stockid").toString())
   					.add("type", payload.get("in_type").toString())
   					.build();
   			
   			JsonObject Message = Json.createObjectBuilder()
   					.add("Add or Remove Stock from Watchlist", AddRemoveStockWatchlistObject)
   					.add("Message", outputMessage)
   					.build();
   	
   			return Message.toString();      	
    }
    
    //Enable or Disable User
    @RequestMapping(value = "/EnableOrDisableUser", method = RequestMethod.POST)
    public String EnableOrDisableUser(@RequestBody  Map<String,Object> payload) throws InstantiationException, IllegalAccessException, SQLException {
    	/*
SET @RESULT = -1;
CALL sp_AddRemoveWatchlist('omar','INTC',"R",@RESULT);
SELECT @RESULT AS RESULT;
		
		
IN  in_userid varchar(20),
IN  in_active tinyint(4)
   	 {
		"in_userid":"omar",
		"in_active":"1"
	 }
   	 */

   	//Step 1
    		System.out.println("UserID " + payload.get("in_userid") + " stockid " + payload.get("in_stockid"));
   	
   			try {
   				Class.forName("com.mysql.jdbc.Driver").newInstance();
   			}
   			catch(ClassNotFoundException e) {
   				System.out.println("Driver Class Not Found");
   			}
   			//Step 2
   			Connection con = DriverManager.getConnection("jdbc:mysql://localhost/stocksdb", "root", "password");    			
   			//Step 3
   			CallableStatement cstmt = null;
   			//Step 4
   			
   			cstmt = con.prepareCall("{call sp_ActivateDeactivateUser(?,?)}");
   			cstmt.setString(1, payload.get("in_userid").toString());
   			cstmt.setString(2, payload.get("in_active").toString());

   			cstmt.execute();
   			
   			cstmt.close();
   			con.close();    	
   			
   			String outputMessage = "User Updated";
   			
   			
   			JsonObject  EnableDisableUserObject = Json.createObjectBuilder()
   					.add("userid", payload.get("in_userid").toString())
   					.add("active", payload.get("in_active").toString())   					
   					.build();
   			
   			JsonObject Message = Json.createObjectBuilder()
   					.add("Add or Remove Stock from Watchlist", EnableDisableUserObject)
   					.add("Message", outputMessage)
   					.build();
   	
   			return Message.toString();          	
    }
    //List stocks by User
    @RequestMapping(value = "/ListStocksByUser", method = RequestMethod.POST)
    public String ListStocksByUser(@RequestBody  Map<String,Object> payload) throws InstantiationException, IllegalAccessException, SQLException {
    	/*

CALL sp_ListStocksByUser('omar');
	
		
IN  in_userid varchar(20)
   	 {
		"in_userid":"omar"
	 }
   	 */

   	//Step 1
    		System.out.println("UserID " + payload.get("in_userid"));
   			try {
   				Class.forName("com.mysql.jdbc.Driver").newInstance();
   			}
   			catch(ClassNotFoundException e) {
   				System.out.println("Driver Class Not Found");
   			}
   			//Step 2
   			Connection con = DriverManager.getConnection("jdbc:mysql://localhost/stocksdb", "root", "password");    			
   			//Step 3
   			CallableStatement cstmt = null;
   			//Step 4
   			
   			cstmt = con.prepareCall("{call sp_ListStocksByUser(?)}");
   			cstmt.setString(1, payload.get("in_userid").toString());
   			ResultSet rs;
   			rs = cstmt.executeQuery();
   			 
   			while(rs.next()) {
   				System.out.println("User " + rs.getString(1) + " Stock " + rs.getString(2));
   			
   			}
   			rs.close();
   			cstmt.close();
   			con.close();    	
   			
   			String outputMessage = "User Updated";
   			
   			JsonObject  EnableDisableUserObject = Json.createObjectBuilder()
	   					.add("userid", rs.getString(0))
	   					.add("amount", rs.getString(1))   					
	   					.build();

   			
   			JsonObject Message = Json.createObjectBuilder()
   					.add("Add or Remove Stock from Watchlist", EnableDisableUserObject)
   					.add("Message", outputMessage)
   					.build();
   	
   			return Message.toString();     	
    }    

    /*
    @RequestMapping("/CreateUser")  
    public String index1(){  
        jdbc.execute("insert into users(userid,name,email,password,active) values('darren','Darren Packer','dan@pack.com','cat$345',0)");  
        return"data inserted Successfully";  
    }
    
    
    @RequestMapping("/CreateUserStocks")  
    public String index(){  
        jdbc.execute("insert into user_stocks(userid,stockid,amount) values('omar','CAT',5000)");  
        return"data inserted Successfully";  
    }
    */
    
}  