export default class API {
    public static async getTransactionsForAccount(account: string) {
        const requestURL = 'https://api.etherscan.io/api?module=account&action=txlist&address=' + account + '&startblock=0&endblock=99999999&page=1&offset=1000&sort=asc&apikey=XYHEBQ85935M5CEDH821RHRG8FMQSYASY6';

        const response = await fetch(requestURL, {
            method: "GET",
        });

        const jsonData = await response.json();
        const transactions = jsonData["result"]

        return transactions;
    }
}