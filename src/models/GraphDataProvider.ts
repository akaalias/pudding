import API from "@/models/API"
import Constants from "@/models/Constants"
import cytoscape from 'cytoscape';
import louvain from 'louvain-algorithm';

export default class GraphDataProvider {
    public addressSeenCounts: Map<string, number>
    public totalTransactionsFetchedCount: number = 0
    public transactionCount: number = 0

    private cache: Map<string, any>
    private txSignatureSeenCounts: Map<string, string[]>
    private api: API
    private queriedAddresses: string[]
    private cy: any

    constructor(api: API) {
        this.cache = new Map<string, any>()
        this.addressSeenCounts = new Map<string, number>()
        this.txSignatureSeenCounts = new Map<string, string[]>()
        this.queriedAddresses = []
        this.api = api
    }

    public async getTokenNetwork(token: string, tokenInfo: any){
        const tokenLowercase = token.toLowerCase()
        if (this.cache.get(tokenLowercase) != null) {
            return this.cache.get(tokenLowercase)
        } else {
            var elements: any[] = []
            var edges: any[] = []
            var nodeIds: string[] = []
            const rate: number = tokenInfo['price']['rate']
            const currency: string = tokenInfo['price']['currency']

            var fromToTransactionCounts = new Map<string, any>()
            const operations = await this.api.getLatestTokenTransactions(tokenLowercase)

            for (var element of operations) {
                const from: string = element['from']
                const to: string = element['to']
                const value: string = element['value']
                const valueFloat: number = parseFloat(value)
                const fromToId = from + to
                const decimals: number = parseInt(element['tokenInfo']['decimals'])
                const symbol: string = element['tokenInfo']['symbol']

                if (!nodeIds.includes(from)) {
                    nodeIds.push(from)
                    elements.push({data: {id: from, label: from.substring(0, 10), type: 'node'}})
                }

                if (!nodeIds.includes(to)) {
                    nodeIds.push(to)
                    elements.push({data: {id: to, label: to.substring(0, 10), type: 'node'}})
                }

                // Start counting relationships
                if (!fromToTransactionCounts.has(fromToId)) {
                    fromToTransactionCounts.set(fromToId, {
                        id: fromToId,
                        from: from,
                        to: to,
                        transactions: 1,
                        totalSum: valueFloat,
                        decimals: decimals,
                        symbol: symbol,
                    })
                } else {
                    var currentRecord = fromToTransactionCounts.get(fromToId)
                    currentRecord['transactions'] = currentRecord['transactions'] + 1
                    currentRecord['totalSum'] = currentRecord['totalSum'] + valueFloat
                    fromToTransactionCounts.set(fromToId, currentRecord)
                }
            }

            // Create Relationship Edges
            for (var connection of fromToTransactionCounts.values()) {
                let humanReadableTotalSum = connection['totalSum'] / Math.pow(10, connection['decimals'])
                let fiat = humanReadableTotalSum * rate
                let humanReadableWithCurrency = fiat.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD"
                });

                let relationshipDescription = connection['transactions'] + ' TXs (' + humanReadableTotalSum.toFixed(2) + ' ' + connection['symbol'] + ' = ' + humanReadableWithCurrency + ')'
                let transactionDescription = humanReadableTotalSum.toFixed(2) + ' ' + connection['symbol'] + ' = ' + humanReadableWithCurrency + '(' + connection['transactions'] + ' TXs)'

                // @ts-ignore
                elements.push({
                    data: {
                        id: connection['fromToId'],
                        source: connection['from'],
                        target: connection['to'],
                        weight: connection['transactions'],
                        value: connection['totalSum'],
                        transactions: connection['transactions'],
                        totalSum: connection['totalSum'],
                        humanReadableTotalSum: humanReadableTotalSum,
                        description: relationshipDescription,
                        relationshipDescription: relationshipDescription,
                        transactionDescription: transactionDescription,
                        fiat: fiat,
                        humanReadableFiat: humanReadableWithCurrency,
                        type: 'edge'
                    }
                })
            }

            this.cache.set(tokenLowercase, elements);

            return elements
        }
    }

    public async getNodeToCommunityMap(elements: any[]) {
        var edges:any[] = []
        var nodeIds:string[] = []

        for(var element of elements) {
            let elD = element.data
            if(elD.source != undefined) {
                edges.push(elD)
            }
            if(elD.id != undefined && elD.label != undefined) {
                nodeIds.push(elD.id)
            }
        }

        var nodeToCommunityMapping = louvain.jLouvain(nodeIds, edges, Constants.LouvainMax);
        var map = new Map(Object.entries(nodeToCommunityMapping));

        return map
    }
}

