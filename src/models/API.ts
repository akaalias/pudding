const delay = async (ms: number) => new Promise(res => setTimeout(res, ms));

export default class API {
    public allTransactions: any[] = []
    private fetchedAccounts: string[] = []

    public async getTransactionsForAccount(account: string, depth: number) {
        if(depth <= 0) {
            return
        }

        const txs = await this.getTransactions(account, this.offsetForDepth(depth))
        this.allTransactions.push(txs)

        for (let newAccount of this.extractAccounts(txs)) {
            await this.getTransactionsForAccount(newAccount, depth - 1)
        }
    }

    public getAllTransactionsFlattened() {
        return this.allTransactions.flat()
    }

    private offsetForDepth(depth: number) {
        if(depth >= 3) {
            return 50
        }
        if(depth == 2) {
            return 30
        }
        if(depth == 1) {
            return 20
        }

        return 10
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
        if(this.fetchedAccounts.includes(account)) {
            return []
        }

        const count = offset

        const requestURL = 'https://api.etherscan.io/api?module=account&action=txlist&address=' + account + '&startblock=0&endblock=99999999&page=1&offset=' + count + '&sort=asc&apikey=XYHEBQ85935M5CEDH821RHRG8FMQSYASY6';

        const response = await fetch(requestURL, {
            method: "GET",
        });

        console.log("Delay...")
        delay(500)

        const jsonData = await response.json();
        const transactions = jsonData["result"]

        if (typeof transactions === 'string' || transactions instanceof String) {
            console.log("Got an exception: " + transactions)
            return []
        }

        return transactions;
    }
}