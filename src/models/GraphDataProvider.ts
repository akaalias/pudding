import API from "@/models/API"

export default class GraphDataProvider {
    public static cache: Map<any, any>
    public static addressSeenCounts: Map<string, number>

    public static async getTransactionsNetworkForAccount(account: string) {
        if(GraphDataProvider.cache == null) {
            GraphDataProvider.cache = new Map<any, any>()
        }

        if(GraphDataProvider.addressSeenCounts == null) {
            GraphDataProvider.addressSeenCounts = new  Map<string, number>()
        }

        const accountLowerCase = account.toLowerCase()

        // Check cache
        if(GraphDataProvider.cache.get(accountLowerCase) != null) {
            console.log("Nice! Found this cached.")
            return GraphDataProvider.cache.get(accountLowerCase)
        } else {

            // @ts-ignore
            var elements: any[] = []
            const api = new API()
            await api.getTransactionsForAccount(accountLowerCase, 3);
            const txs = api.getAllTransactionsFlattened()

            var seenAddresses: string[] = [];
            var seenTransactions = new Map<string, object>();
            var fromToTransactionsCounter = 0
            var fromOnlyTransactionsCounter = 0
            var nodeCount = 0
            var edgeCount = 0

            txs.forEach((tx: any, index: number) => {
                const from = tx["from"]
                const to = tx["to"]
                GraphDataProvider.updateAddressSeenCount(from)
                GraphDataProvider.updateAddressSeenCount(to)
            })

            // create target node
            seenAddresses.push(accountLowerCase);
            const seenCount = GraphDataProvider.addressSeenCounts.get(accountLowerCase)  || 0
            const score = seenCount // * 0.006769776522008331
            // @ts-ignore
            elements.push({data: { id: accountLowerCase, label: accountLowerCase.substring(0, 10), score: score}, classes: 'target'})
            nodeCount += 1

            txs.forEach((tx: any, index: number) => {
                const from = tx["from"]
                const to = tx["to"]
                const txSignature = from + to + tx["timeStamp"];

                // Skip empty TOs
                if(from == "" || to == "") {
                    fromOnlyTransactionsCounter += 1
                    return
                } else {
                    fromToTransactionsCounter += 1
                }

                // Account for addresses
                if(!seenAddresses.includes(from)) {
                    seenAddresses.push(from);
                    const seenCount = GraphDataProvider.addressSeenCounts.get(from) || 0
                    const score = seenCount // * 0.006769776522008331
                    // @ts-ignore
                    elements.push({data: { id: from, label: from.substring(0, 10), score: score}})
                    nodeCount += 1
                }

                if(!seenAddresses.includes(to)) {
                    seenAddresses.push(to)
                    const seenCount = GraphDataProvider.addressSeenCounts.get(to) || 0
                    const score = seenCount // * 0.006769776522008331
                    // @ts-ignore
                    elements.push({data: { id: to, label: to.substring(0, 10), score: score}})
                    nodeCount += 1
                }

                // Account for TXs
                if(!(txSignature in seenTransactions)) {
                    seenTransactions.set(txSignature, {count: 0})
                    elements.push({ data: { id: txSignature, source: from, target: to, weight: 0.1} })
                    edgeCount +=  1
                } else {
                    // update count
                }
            });

            console.log("We have " + txs.length + " transactions")
            console.log("We have " + nodeCount + " nodes")
            console.log("We have " + edgeCount + " edges")
            console.log("We have " + fromToTransactionsCounter + " From/To transactions")
            console.log("We have " + fromOnlyTransactionsCounter + " From transactions")

            // Make sure to cache this!
            GraphDataProvider.cache.set(accountLowerCase, elements);

            // @ts-ignore
            return elements;
        }
    }

    private static updateAddressSeenCount(address: string) {
        let seenCount = GraphDataProvider.addressSeenCounts.get(address)

        if(seenCount == null) {
            GraphDataProvider.addressSeenCounts.set(address, 1)
        } else {
            GraphDataProvider.addressSeenCounts.set(address, seenCount + 1)
        }
    }
}
