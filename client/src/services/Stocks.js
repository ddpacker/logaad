const APIURL = `${process.env.REACT_APP_API}`;
class Stocks {
    static async userPortfolio(username){    
        //console.log("This is my ip");
        console.log("STOCKS" + username);
        const rawResponse = await fetch(APIURL + '/ListStocksByUser', {
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
        const rawResponse = await fetch(APIURL + '/ListWatchListByUser', {
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
        const rawResponse = await fetch(APIURL + '/WalletByUser', {
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