package com.synechron.JDBC;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

//import org.springframework.security.crypto.password.PasswordEncoder;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
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
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RestController;


import javax.json.*;


@RestController
public class SpringBootJdbcController {
	//SecurityConfig d = new SecurityConfig();

	boolean isValidLength(String str,int MaxSize) {
		return ((str.length()>0) && (str.length()<=MaxSize));
	}

	boolean isValidMail(String email) {
		String regex = "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";
		Pattern pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(email);
		//System.out.println("Matches " + matcher.matches());
		if(!matcher.matches()) {
			return false;
		}
		return true;
	}

	boolean isEmptyString(String str) {
		//System.out.println(str + (str != null && !str.isEmpty()) );
		return !(str != null && !str.isEmpty());
	}

	boolean AnyEmptyField(Map<String,Object> payload) {
		int count = 0;
		for (Map.Entry<String, Object> entry: payload.entrySet()) {
			if(isEmptyString(entry.getValue().toString())) {
				count++;
			}
		}
		if(count>0) {return true;}
		return false;
	}

	@Autowired
	JdbcTemplate jdbc;
	@CrossOrigin(origins = "http://localhost:3000")
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
		//Validate lenghts
		if(!isValidLength(payload.get("in_userid").toString(),20) ||
				!isValidLength(payload.get("in_name").toString(),50) ||
				!isValidLength(payload.get("in_email").toString(),100) ||
				!isValidLength(payload.get("in_password").toString(),20) ||
				!isValidLength(payload.get("in_active").toString(),1)
		) {
			JsonObject  userObject = Json.createObjectBuilder()
					.add("userid", payload.get("in_userid").toString())
					.add("name", payload.get("in_name").toString())
					.add("email", payload.get("in_email").toString())
					.add("password", payload.get("in_password").toString())
					.add("active", payload.get("in_active").toString())
					.build();

			JsonObject Message = Json.createObjectBuilder()
					.add("User", userObject)
					.add("Message", "Operation Failed: Lenght not valid in inputs" )
					.build();

			return Message.toString();
		}
		//Are fields empty
		if(AnyEmptyField(payload)) {
			JsonObject  userObject = Json.createObjectBuilder()
					.add("userid", payload.get("in_userid").toString())
					.add("name", payload.get("in_name").toString())
					.add("email", payload.get("in_email").toString())
					.add("password", payload.get("in_password").toString())
					.add("active", payload.get("in_active").toString())
					.build();

			JsonObject Message = Json.createObjectBuilder()
					.add("User", userObject)
					.add("Message", "Operation Failed: Empty Input(s)" )
					.build();

			return Message.toString();
		}
		//Validate Email
		if(!isValidMail(payload.get("in_email").toString())) {
			JsonObject  userObject = Json.createObjectBuilder()
					.add("userid", payload.get("in_userid").toString())
					.add("name", payload.get("in_name").toString())
					.add("email", payload.get("in_email").toString())
					.add("password", payload.get("in_password").toString())
					.add("active", payload.get("in_active").toString())
					.build();

			JsonObject Message = Json.createObjectBuilder()
					.add("User", userObject)
					.add("Message", "Operation Failed: Invalid Email" )
					.build();

			return Message.toString();
		}
		//Step 1

		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
		}
		catch(ClassNotFoundException e) {
			System.out.println("Driver Class Not Found");
		}
		//Step 2
		Connection con = DriverManager.getConnection("jdbc:mysql://localhost/stocksdb?useSSL=false", "logaad", "password");
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
		//System.out.println("The output value is " + pcount);
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
	@CrossOrigin(origins = "http://localhost:3000")
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
		//Validate fields
		if(!isValidLength(payload.get("in_userid").toString(),20) ||
				!isValidLength(payload.get("in_stockid").toString(),6) ||
				!isValidLength(payload.get("in_amount").toString(),5) ||
				!isValidLength(payload.get("in_type").toString(),1) ||
				!isValidLength(payload.get("in_price").toString(),18)
		) {

			JsonObject  userstockObject = Json.createObjectBuilder()
					.add("userid", payload.get("in_userid").toString())
					.add("stockid", payload.get("in_stockid").toString())
					.add("amount", payload.get("in_amount").toString())
					.add("type", payload.get("in_type").toString())
					.add("price", payload.get("in_price").toString())
					.build();

			JsonObject Message = Json.createObjectBuilder()
					.add("Buy or Sell Stocks", userstockObject)
					.add("Message", "Operation Failed: Lenght not valid in inputs")
					.build();


			return Message.toString();
		}

		//Step 1
		//System.out.println("UserID " + payload.get("in_userid") + " stockid " + payload.get("in_stockid") + " amount " + payload.get("in_amount") + " type " + payload.get("in_type") + " price " + payload.get("in_price"));

		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
		}
		catch(ClassNotFoundException e) {
			System.out.println("Driver Class Not Found");
		}
		//Step 2
		Connection con = DriverManager.getConnection("jdbc:mysql://localhost/stocksdb?useSSL=false", "logaad", "password");
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
	@CrossOrigin(origins = "http://localhost:3000")
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
		//Validate fields
		if(!isValidLength(payload.get("in_userid").toString(),20) ||
				!isValidLength(payload.get("in_stockid").toString(),6)
		) {

			JsonObject  useramountstockObject = Json.createObjectBuilder()
					.add("userid", payload.get("in_userid").toString())
					.add("stockid", payload.get("in_stockid").toString())
					.build();

			JsonObject Message = Json.createObjectBuilder()
					.add("Ammount of Stock for this user", useramountstockObject)
					.add("Message", "Operation Failed: Lenght not valid in inputs")
					.build();


			return Message.toString();
		}
		//Step 1
		//System.out.println("UserID " + payload.get("in_userid") + " stockid " + payload.get("in_stockid"));

		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
		}
		catch(ClassNotFoundException e) {
			System.out.println("Driver Class Not Found");
		}
		//Step 2
		Connection con = DriverManager.getConnection("jdbc:mysql://localhost/stocksdb?useSSL=false", "logaad", "password");
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
	@CrossOrigin(origins = "http://localhost:3000")
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
		//Validate fields
		if(!isValidLength(payload.get("in_userid").toString(),20) ||
				!isValidLength(payload.get("in_stockid").toString(),6)
		) {

			JsonObject  usermoneystockObject = Json.createObjectBuilder()
					.add("userid", payload.get("in_userid").toString())
					.add("stockid", payload.get("in_stockid").toString())
					.build();

			JsonObject Message = Json.createObjectBuilder()
					.add("Money earned by stock", usermoneystockObject)
					.add("Message", "Operation Failed: Lenght not valid in inputs")
					.build();

			return Message.toString();
		}
		//Step 1
		//System.out.println("UserID " + payload.get("in_userid") + " stockid " + payload.get("in_stockid"));

		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
		}
		catch(ClassNotFoundException e) {
			System.out.println("Driver Class Not Found");
		}
		//Step 2
		Connection con = DriverManager.getConnection("jdbc:mysql://localhost/stocksdb?useSSL=false", "logaad", "password");
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
	@CrossOrigin(origins = "http://localhost:3000")
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
		//Validate fields
		if(!isValidLength(payload.get("in_userid").toString(),20) ||
				!isValidLength(payload.get("in_stockid").toString(),6) ||
				!isValidLength(payload.get("in_type").toString(),1)
		) {
			JsonObject  AddRemoveStockWatchlistObject = Json.createObjectBuilder()
					.add("userid", payload.get("in_userid").toString())
					.add("stockid", payload.get("in_stockid").toString())
					.add("type", payload.get("in_type").toString())
					.build();

			JsonObject Message = Json.createObjectBuilder()
					.add("Add or Remove Stock from Watchlist", AddRemoveStockWatchlistObject)
					.add("Message", "Operation Failed: Lenght not valid in inputs")
					.build();


			return Message.toString();
		}
		//Step 1
		//System.out.println("UserID " + payload.get("in_userid") + " stockid " + payload.get("in_stockid"));

		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
		}
		catch(ClassNotFoundException e) {
			System.out.println("Driver Class Not Found");
		}
		//Step 2
		Connection con = DriverManager.getConnection("jdbc:mysql://localhost/stocksdb?useSSL=false", "logaad", "password");
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
	@CrossOrigin(origins = "http://localhost:3000")
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
		//Validate fields
		if(!isValidLength(payload.get("in_userid").toString(),20) ||
				!isValidLength(payload.get("in_active").toString(),1)
		) {
			JsonObject  EnableDisableUserObject = Json.createObjectBuilder()
					.add("userid", payload.get("in_userid").toString())
					.add("active", payload.get("in_active").toString())
					.build();

			JsonObject Message = Json.createObjectBuilder()
					.add("Enable or Disable User", EnableDisableUserObject)
					.add("Message", "Operation Failed: Lenght not valid in inputs")
					.build();


			return Message.toString();
		}
		//Step 1
		//System.out.println("UserID " + payload.get("in_userid") + " stockid " + payload.get("in_stockid"));

		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
		}
		catch(ClassNotFoundException e) {
			System.out.println("Driver Class Not Found");
		}
		//Step 2
		Connection con = DriverManager.getConnection("jdbc:mysql://localhost/stocksdb?useSSL=false", "logaad", "password");
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
				.add("Enable or Disable User", EnableDisableUserObject)
				.add("Message", outputMessage)
				.build();

		return Message.toString();
	}
	//List stocks by User
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/ListStocksByUser", method = RequestMethod.POST)
	public String ListStocksByUser(@RequestBody  Map<String,Object> payload) throws InstantiationException, IllegalAccessException, SQLException {
    	/*

CALL sp_ListStocksByUser('omar');
	
		
IN  in_userid varchar(20)
   	 {
		"in_userid":"omar"
	 }
   	 */
		//Validate fields
		if(!isValidLength(payload.get("in_userid").toString(),20)
		) {

			JsonObject  StocksByUserObject = Json.createObjectBuilder()
					.add("userid", payload.get("in_userid").toString())
					.build();

			JsonObject Message = Json.createObjectBuilder()
					.add("List Stocks by User", StocksByUserObject)
					.add("Message", "Operation Failed: Lenght not valid in inputs")
					.build();

			return Message.toString();
		}
		//Step 1
		//System.out.println("UserID " + payload.get("in_userid"));
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
		}
		catch(ClassNotFoundException e) {
			System.out.println("Driver Class Not Found");
		}
		//Step 2
		Connection con = DriverManager.getConnection("jdbc:mysql://localhost/stocksdb?useSSL=false", "logaad", "password");
		//Step 3
		CallableStatement cstmt = null;
		//Step 4

		cstmt = con.prepareCall("{call sp_ListStocksByUser(?)}");
		cstmt.setString(1, payload.get("in_userid").toString());
		ResultSet rs;
		rs = cstmt.executeQuery();
		JsonArrayBuilder RecordSet = Json.createArrayBuilder();
		while(rs.next()) {
			//System.out.println("User " + rs.getString(1) + " Stock " + rs.getString(2));
			RecordSet.add(Json.createObjectBuilder()
							.add("stockid", rs.getString(1))
							.add("amount", String.valueOf(rs.getInt(2))));
		}
		rs.close();
		cstmt.close();
		con.close();

		JsonObject Message = Json.createObjectBuilder()
				.add("Stocks by User", RecordSet.build())
				.build();

		return Message.toString();
	}

	//LogIn
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/LogIn", method = RequestMethod.POST)
	public String LogIn(@RequestBody  Map<String,Object> payload) throws InstantiationException, IllegalAccessException, SQLException {
		//Validate lenghts
		if(	!isValidLength(payload.get("in_userid").toString(),20) || !isValidLength(payload.get("in_password").toString(),20) ) {
			JsonObject Message = Json.createObjectBuilder()
					.add("Message", "Operation Failed: Lenght not valid in inputs" )
					.build();
			return Message.toString();
		}

		//Are fields empty
		if(AnyEmptyField(payload)) {
			JsonObject Message = Json.createObjectBuilder()
					.add("Message", "Operation Failed: Empty Input(s)" )
					.build();
			return Message.toString();
		}
    	/*
		SET @RESULT = -1;
		SET @UNAME = '';
		SET @MAIL = '';
		SET @ACTIVE = '';
		CALL sp_Login('omar1','cat$123',@RESULT,@UNAME,@MAIL,@ACTIVE);
		SELECT @RESULT AS Result,@UNAME as UserName,@MAIL as Mail,@ACTIVE as Active;
   	 	{
			"in_userid":"greg",
			"in_password":"clasic123"
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
		Connection con = DriverManager.getConnection("jdbc:mysql://localhost/stocksdb?useSSL=false", "logaad", "password");
		//Step 3
		CallableStatement cstmt = null;
		//Step 4
		cstmt = con.prepareCall("{call sp_Login(?,?,?,?,?,?)}");
		cstmt.setString(1, payload.get("in_userid").toString());
		cstmt.setString(2, payload.get("in_password").toString());
		cstmt.registerOutParameter(3, Types.INTEGER); //output parameter is second parameter type integer
		cstmt.registerOutParameter(4, Types.VARCHAR);
		cstmt.registerOutParameter(5, Types.VARCHAR);
		cstmt.registerOutParameter(6, Types.INTEGER);
		cstmt.execute();
		int pcount = cstmt.getInt(3);
		String UserName = cstmt.getString(4);
		String UserMail = cstmt.getString(5);
		int UserActive = cstmt.getInt(6);
		//System.out.println("The output value is " + pcount);
		cstmt.close();
		con.close();

		String outputMessage = "Invalid Login";
		if(pcount==1) {
			outputMessage = "Succesful LogIn";
		}

		JsonObject  LoginObject = Json.createObjectBuilder()
				.add("userid", payload.get("in_userid").toString())
				.add("exist", pcount)
				.add("name", UserName)
				.add("email", UserMail)
				.add("active", String.valueOf(UserActive))
				.build();

		JsonObject Message = Json.createObjectBuilder()
				.add("LoginInfo", LoginObject)
				.add("Message", outputMessage)
				.build();

		return Message.toString();

	}

	//LogIn
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/EncriptPassword", method = RequestMethod.POST)
	public String EncriptPassword(@RequestBody  Map<String,Object> payload) throws NoSuchAlgorithmException {
		//Validate lenghts
		if(	!isValidLength(payload.get("in_password").toString(),20) ) {
			JsonObject Message = Json.createObjectBuilder()
					.add("Message", "Operation Failed: Lenght not valid in inputs" )
					.build();
			return Message.toString();
		}

		//Are fields empty
		if(AnyEmptyField(payload)) {
			JsonObject Message = Json.createObjectBuilder()
					.add("Message", "Operation Failed: Empty Input(s)" )
					.build();
			return Message.toString();
		}

		String originalString = payload.get("in_password").toString();

		MessageDigest digest = MessageDigest.getInstance("SHA-256");
		byte[] encodedhash = digest.digest(
				originalString.getBytes(StandardCharsets.UTF_8));




		JsonObject Message = Json.createObjectBuilder()
				.add("hash",encodedhash.toString())
				.add("Message", "Succesful" )
				.build();
		return Message.toString();

	}

	// Get Method to test API on Browser
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String Default() {
		JsonArray ClasicUsers = Json.createArrayBuilder()
				.add(Json.createObjectBuilder().add("name", "Luis"))
				.add(Json.createObjectBuilder().add("name", "Omar"))
				.add(Json.createObjectBuilder().add("name", "Greg"))
				.add(Json.createObjectBuilder().add("name", "Andres"))
				.add(Json.createObjectBuilder().add("name", "Angel"))
				.add(Json.createObjectBuilder().add("name", "Darren"))
				.build();

		JsonObject Message = Json.createObjectBuilder()
				.add("API","LOGAAD")
				.add("Clasic Users",ClasicUsers)
				.add("Message", "Succesful" )
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