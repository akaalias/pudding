import Constants from "@/models/Constants"

const delay = async (ms: number) => new Promise(res => setTimeout(res, ms));

export default class API {
    public totalTransactionsFetchedCount: number = 0
    public allTransactions: any[] = []
    private fetchedAccounts: string[] = []

    public async getLatestTokenTransactions(token: string) {
        const limit = Constants.APIMaxResults
        const endpoint = 'https://api.ethplorer.io'
        const action = '/getTokenHistory/'
        const apiKey = 'EK-fLjej-kUvJ9W3-mWhJN'
        const requestURL = endpoint + action + token + "?apiKey=" + apiKey + "&type=transfer&limit=" + limit

        const response = await fetch(requestURL, {
            method: "GET",
        });

        const jsonData = await response.json();
        const transactions = jsonData["operations"]
        return transactions
    }
    public async getTopTokens() {
        const endpoint = 'https://api.ethplorer.io'
        const action = '/getTopTokens'
        const apiKey = 'EK-fLjej-kUvJ9W3-mWhJN'
        const requestURL = endpoint + action + "?apiKey=" + apiKey

        const response = await fetch(requestURL, {
            method: "GET",
        });

        const jsonData = await response.json();
        const tokens = jsonData["tokens"]
        return tokens
    }

    public async getTransactionsForAddress(address: string) {
        const txs = await this.getTransactions(address)
        return txs
    }

    public getAllTransactionsFlattened() {
        return this.allTransactions.flat()
    }
    private extractAccounts(txs: any[]) {
        var accounts: string[] = []
        for (let tx of txs) {
            const from = tx["from"]
            const to = tx["to"]
            if(from != null && from != "") {
                accounts.push(from)
            }

            if(to != null && to != "") {
                accounts.push(to)
            }
        }
        return [...new Set(accounts)]
    }
    public async getTransactions(address: string) {
        const count = Constants.APIMaxResults
        const requestURL = 'https://api.etherscan.io/api?module=account&action=txlist&address=' + address + '&startblock=0&endblock=99999999&page=1&offset=' + count + '&sort=asc&apikey=XYHEBQ85935M5CEDH821RHRG8FMQSYASY6';
        const response = await fetch(requestURL, {
            method: "GET",
        });

        const jsonData = await response.json();
        const transactions = jsonData["result"]

        if (typeof transactions === 'string' || transactions instanceof String) {
            console.log("Got an exception: " + transactions)
            return []
        }

        return transactions;
    }
}