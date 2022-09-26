import API from "@/models/API"
import Constants from "@/models/Constants"

export default class GraphDataProvider {
    public static cache: Map<any, any>
    public static addressSeenCounts: Map<string, number>
    public static txSignatureSeenCounts: Map<string, number>

    private static setupStaticMembers() {
        if(GraphDataProvider.cache == null) {
            GraphDataProvider.cache = new Map<any, any>()
        }

        if(GraphDataProvider.addressSeenCounts == null) {
            GraphDataProvider.addressSeenCounts = new  Map<string, number>()
        }

        if(GraphDataProvider.txSignatureSeenCounts == null) {
            GraphDataProvider.txSignatureSeenCounts = new  Map<string, number>()
        }
    }

    public static async getTransactionsNetworkForAccount(account: string) {
        GraphDataProvider.setupStaticMembers()

        const accountLowerCase = account.toLowerCase()

        // Check cache
        if(GraphDataProvider.cache.get(accountLowerCase) != null) {
            return GraphDataProvider.cache.get(accountLowerCase)
        } else {
            // @ts-ignore
            var elements: any[] = []
            const api = new API()
            await api.getTransactionsForAccount(accountLowerCase, Constants.maxDepth);
            const txs = api.getAllTransactionsFlattened()

            await this.setupAddressAndTxSignatureSeenCounts(txs);

            var addressesAddedToGraphElements: string[] = []
            var ransactionSignaturesAddedToGraphElements: string[] = []
            var fromToTransactionsCounter = 0
            var fromOnlyTransactionsCounter = 0
            var nodeCount = 0
            var edgeCount = 0

            // create target node
            const seenCount = GraphDataProvider.addressSeenCounts.get(accountLowerCase)  || 0
            const score = seenCount // * 0.006769776522008331
            // @ts-ignore
            elements.push({data: { id: accountLowerCase, label: accountLowerCase.substring(0, 10), score: score}, classes: 'target'})
            addressesAddedToGraphElements.push(accountLowerCase);
            nodeCount += 1

            txs.forEach((tx: any, index: number) => {
                const from = tx["from"]
                const to = tx["to"]
                const txSignature = from + to

                // Skip empty TOs
                if(from == "" || to == "") {
                    fromOnlyTransactionsCounter += 1
                    return
                } else {
                    fromToTransactionsCounter += 1
                }

                // Account for addresses
                if(!addressesAddedToGraphElements.includes(from)) {
                    addressesAddedToGraphElements.push(from);
                    const seenCount = GraphDataProvider.addressSeenCounts.get(from) || 0
                    const score = seenCount // * 0.006769776522008331
                    // @ts-ignore
                    elements.push({data: { id: from, label: from.substring(0, 10), score: score}})
                    nodeCount += 1
                }

                if(!addressesAddedToGraphElements.includes(to)) {
                    addressesAddedToGraphElements.push(to)
                    const seenCount = GraphDataProvider.addressSeenCounts.get(to) || 0
                    const score = seenCount // * 0.006769776522008331
                    // @ts-ignore
                    elements.push({data: { id: to, label: to.substring(0, 10), score: score}})
                    nodeCount += 1
                }

                // Account for TXs
                if(!(ransactionSignaturesAddedToGraphElements.includes(txSignature))) {
                    ransactionSignaturesAddedToGraphElements.push(txSignature)
                    const weight = GraphDataProvider.txSignatureSeenCounts.get(txSignature)

                    elements.push({ data:
                                        {   id: txSignature,
                                            source: from,
                                            target: to,
                                            weight: weight}
                    })

                    edgeCount +=  1
                }
            });

            // Make sure to cache this!
            GraphDataProvider.cache.set(accountLowerCase, elements);

            // @ts-ignore
            return elements;
        }
    }

    private static async setupAddressAndTxSignatureSeenCounts(txs: any) {
        txs.forEach((tx: any, index: number) => {
            const from = tx["from"]
            const to = tx["to"]
            const txSignature = from + to

            GraphDataProvider.updateAddressSeenCount(from)
            GraphDataProvider.updateAddressSeenCount(to)
            GraphDataProvider.updateTxSignatureSeenCount(txSignature)
        })
    }

    private static async updateTxSignatureSeenCount(txSignature: string) {

        let seenCount = GraphDataProvider.txSignatureSeenCounts.get(txSignature)

        if(seenCount == null) {
            GraphDataProvider.txSignatureSeenCounts.set(txSignature, 1)
        } else {
            GraphDataProvider.txSignatureSeenCounts.set(txSignature, seenCount + 1)
        }
    }

    private static async updateAddressSeenCount(address: string) {
        let seenCount = GraphDataProvider.addressSeenCounts.get(address)

        if(seenCount == null) {
            GraphDataProvider.addressSeenCounts.set(address, 1)
        } else {
            GraphDataProvider.addressSeenCounts.set(address, seenCount + 1)
        }
    }


}
