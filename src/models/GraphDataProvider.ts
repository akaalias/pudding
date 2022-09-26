import API from "@/models/API"
import Constants from "@/models/Constants"

export default class GraphDataProvider {

    private cache: Map<any, any>
    private addressSeenCounts: Map<string, number>
    private txSignatureSeenCounts: Map<string, string[]>
    private api: API

    constructor(api: API) {
        this.cache = new Map<any, any>()
        this.addressSeenCounts = new Map<string, number>()
        this.txSignatureSeenCounts = new Map<string, string[]>()
        this.api = api
    }

    public async getTransactionsNetworkForAccount(account: string) {
        console.log("getTransactionsNetworkForAccount")

        const accountLowerCase = account.toLowerCase()

        // Check cache
        if (this.cache.get(accountLowerCase) != null) {
            return this.cache.get(accountLowerCase)
        } else {
            // @ts-ignore
            var elements: any[] = []
            await this.api.getTransactionsForAccount(accountLowerCase, Constants.maxDepth);
            const txs = this.api.getAllTransactionsFlattened()

            await this.setupAddressAndTxSignatureSeenCounts(txs);

            var addressesAddedToGraphElements: string[] = []
            var ransactionSignaturesAddedToGraphElements: string[] = []
            var fromToTransactionsCounter = 0
            var fromOnlyTransactionsCounter = 0
            var nodeCount = 0
            var edgeCount = 0

            // create target node
            const seenCount = this.addressSeenCounts.get(accountLowerCase) || 0
            const score = seenCount // * 0.006769776522008331
            // @ts-ignore
            elements.push({
                data: {id: accountLowerCase, label: accountLowerCase.substring(0, 10), score: score},
                classes: 'target'
            })
            addressesAddedToGraphElements.push(accountLowerCase);
            nodeCount += 1

            txs.forEach((tx: any, index: number) => {
                const from = tx["from"]
                const to = tx["to"]
                const timestamp = tx["timeStamp"]
                const hash = tx["hash"]
                const txSignature = from + to

                // Skip empty TOs
                if (from == "" || to == "") {
                    fromOnlyTransactionsCounter += 1
                    return
                } else {
                    fromToTransactionsCounter += 1
                }

                // Account for addresses
                if (!addressesAddedToGraphElements.includes(from)) {
                    addressesAddedToGraphElements.push(from);
                    const seenCount = this.addressSeenCounts.get(from) || 0
                    const score = seenCount // * 0.006769776522008331
                    // @ts-ignore
                    elements.push({data: {id: from, label: from.substring(0, 10), score: score}})
                    nodeCount += 1
                }

                if (!addressesAddedToGraphElements.includes(to)) {
                    addressesAddedToGraphElements.push(to)
                    const seenCount = this.addressSeenCounts.get(to) || 0
                    const score = seenCount // * 0.006769776522008331
                    // @ts-ignore
                    elements.push({data: {id: to, label: to.substring(0, 10), score: score}})
                    nodeCount += 1
                }

                // Account for TXs
                if (!(ransactionSignaturesAddedToGraphElements.includes(txSignature))) {
                    ransactionSignaturesAddedToGraphElements.push(txSignature)
                    const listOfTXHashes = this.txSignatureSeenCounts.get(txSignature) || []

                    elements.push({
                        data:
                            {
                                id: txSignature,
                                source: from,
                                target: to,
                                weight: listOfTXHashes.length
                            }
                    })

                    edgeCount += 1
                }
            });

            // Make sure to cache this!
            this.cache.set(accountLowerCase, elements);

            // @ts-ignore
            return elements;
        }
    }

    private async setupAddressAndTxSignatureSeenCounts(txs: any) {
        txs.forEach((tx: any, index: number) => {
            const from = tx["from"]
            const to = tx["to"]

            this.updateAddressSeenCount(from)
            this.updateAddressSeenCount(to)
            this.updateTxSignatureSeenCount(tx)
        })
    }

    private async updateTxSignatureSeenCount(tx: any) {
        const from = tx["from"]
        const to = tx["to"]
        const hash = tx["hash"]
        const txSignature = from + to

        let listOfTXHashes = this.txSignatureSeenCounts.get(txSignature)

        if (listOfTXHashes == null) {
            let newListOfTXHashes = []
            newListOfTXHashes.push(hash)
            this.txSignatureSeenCounts.set(txSignature, newListOfTXHashes)
        } else {
            if (!listOfTXHashes.includes(hash)) {
                listOfTXHashes.push(hash)
                this.txSignatureSeenCounts.set(txSignature, listOfTXHashes)
            }
        }
    }

    private async updateAddressSeenCount(address: string) {
        let seenCount = this.addressSeenCounts.get(address)

        if (seenCount == null) {
            this.addressSeenCounts.set(address, 1)
        } else {
            this.addressSeenCounts.set(address, seenCount + 1)
        }
    }
}
