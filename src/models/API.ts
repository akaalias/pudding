export default class API {
    public static async getTransactionsForAccount(account: string) {
        const requestURL = 'https://api.etherscan.io/api?module=account&action=txlist&address=0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=XYHEBQ85935M5CEDH821RHRG8FMQSYASY6';

        console.log("Before fetching...")
        const response = await fetch(requestURL, {
            method: "GET",
        });

        console.log("After fetching...")
        const jsonData = await response.json();
        const transactions = jsonData["result"]

        return transactions;
    }
}