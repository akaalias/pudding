export default class API {
    async get(query: string) {
        return []
    }

    public static async getTransactions(address: string) {
        const requestURL = 'https://chain.api.btc.com/v3/address/15urYnyeJe3gwbGJ74wcX89Tz7ZtsFDVew/tx'

        const response = await fetch(requestURL, {
            method: "GET",
            headers: {
                accept: "application/json",
                'Access-Control-Allow-Origin': 'http://localhost:8080',
                'Access-Control-Allow-Methods': 'GET'
            }
        });

        const jsonData = await response.json();
        const transactions = jsonData.data.list;
        return transactions;
    }
}