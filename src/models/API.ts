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
        const requestURL = endpoint + action + token + Constants.DEFAULT_COLOR_CODE + "&type=transfer&limit=" + limit

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
        const requestURL = endpoint + action + Constants.DEFAULT_COLOR_CODE

        const response = await fetch(requestURL, {
            method: "GET",
        });

        const jsonData = await response.json();
        const tokens = jsonData["tokens"]
        return tokens
    }

    public async getTokenInfo(token: string) {
        /*
{
    address:             # token address,
    totalSupply:         # total token supply,
    name:                # token name,
    symbol:              # token symbol,
    decimals:            # number of significant digits,
    price: {             # token price (false, if not available),
        rate:            # current price in currency,
        currency:        # token price currency (USD),
        diff:            # 24 hours rate difference (in percent),
        diff7d:          # 7 days rate difference (in percent),
        diff30d:         # 30 days rate difference (in percent),
        marketCapUsd:    # market cap (USD),
        availableSupply: # available supply,
        volume24h:       # 24 hours volume,
        ts:              # last rate update timestamp,
    },
    publicTags: []       # [optional] one or more tags from https://ethplorer.io/tag/,
    owner:               # token owner address,
    countOps:            # total count of token operations,
    totalIn:             # total amount of incoming tokens,
    totalOut:            # total amount of outgoing tokens,
    transfersCount:      # total number of token operations,
    ethTransfersCount:   # [optional] total number of ethereum operations,
    holdersCount:        # total number of token holders,
    issuancesCount:      # total count of token issuances,
    image:               # [optional] token image url,
    description:         # [optional] token description,
    website:             # [optional] token website url,
    lastUpdated:         # last updated timestamp,
}
         */

        const endpoint = 'https://api.ethplorer.io'
        const action = '/getTokenInfo/'
        const requestURL = endpoint + action + token + Constants.DEFAULT_COLOR_CODE
        const response = await fetch(requestURL, {
            method: "GET",
        });

        const jsonData = await response.json();
        return jsonData
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