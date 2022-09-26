import Constants from "@/models/Constants"

const delay = async (ms: number) => new Promise(res => setTimeout(res, ms));

export default class API {
    public totalTransactionsFetchedCount: number = 0
    public allTransactions: any[] = []
    private fetchedAccounts: string[] = []

    public async getTransactionsForAccount(account: string, depth: number) {
        if(depth <= 0) {
            return
        }

        const txs = await this.getTransactions(account, Constants.offsetForDepth(depth))
        this.allTransactions.push(txs)
        this.allTransactions.flat()
        this.totalTransactionsFetchedCount += this.allTransactions.length

        for (let newAccount of this.extractAccounts(txs)) {
            await this.getTransactionsForAccount(newAccount, depth - 1)
        }
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

    public async getTransactions(account: string, offset: number) {
        // if(this.fetchedAccounts.includes(account)) {
        //     return []
        // } else {
        //     this.fetchedAccounts.push(account)
        // }

        const count = offset
        const requestURL = 'https://api.etherscan.io/api?module=account&action=txlist&address=' + account + '&startblock=0&endblock=99999999&page=1&offset=' + count + '&sort=asc&apikey=XYHEBQ85935M5CEDH821RHRG8FMQSYASY6';
        const response = await fetch(requestURL, {
            method: "GET",
        });

        // Be kind to the API
        await delay(200)

        const jsonData = await response.json();
        const transactions = jsonData["result"]

        if (typeof transactions === 'string' || transactions instanceof String) {
            console.log("Got an exception: " + transactions)
            return []
        }

        return transactions;
    }
}