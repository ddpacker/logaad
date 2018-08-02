class Stocks {
    static async userPortfolio(username){    
        //console.log("This is my ip");
        console.log("STOCKS" + username);
        const rawResponse = await fetch('http://localhost:8090/ListStocksByUser', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'multipart/form-data',  
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },          
        body: JSON.stringify({in_userid: username})
        });
        const content = await rawResponse.json();
    
        //console.log(content);
        
    return content;
    }

    static async userWatchlist(username){    
        //console.log("This is my ip");
        console.log("Watchlist" + username);
        const rawResponse = await fetch('http://localhost:8090/ListWatchListByUser', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'multipart/form-data',  
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },          
        body: JSON.stringify({in_userid: username})
        });
        const content = await rawResponse.json();
    
        //console.log(content);
        
    return content;
    }
    static async wallet(username){
        console.log("Wallet" + username);
        const rawResponse = await fetch('http://localhost:8090/WalletByUser', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'multipart/form-data',  
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },          
        body: JSON.stringify({in_userid: username})
        });
        const content = await rawResponse.json();
    return content;        
    }
}

export default Stocks;