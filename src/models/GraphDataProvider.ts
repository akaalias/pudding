import API from "@/models/API"

export default class GraphDataProvider {

    public static async getTransactionsNetworkForAccount(account: string) {
        // @ts-ignore
        var elements: any[] = []
        const accountLowerCase = account.toLowerCase()
        const api = new API()
        await api.getTransactionsForAccount(accountLowerCase, 3);
        const txs = api.getAllTransactionsFlattened()

        var seenAddresses: string[] = [];
        var seenTransactions = new Map<string, object>();
        var fromToTransactionsCounter = 0
        var fromOnlyTransactionsCounter = 0
        var nodeCount = 0
        var edgeCount = 0

        // create target node
        seenAddresses.push(accountLowerCase);
        // @ts-ignore
        elements.push({data: { id: accountLowerCase, label: accountLowerCase.substring(0, 10)}, classes: 'target'})
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
                // @ts-ignore
                elements.push({data: { id: from, label: from.substring(0, 10)}})
                nodeCount += 1
            }

            if(!seenAddresses.includes(to)) {
                seenAddresses.push(to)
                // @ts-ignore
                elements.push({data: { id: to, label: to.substring(0, 10)}})
                nodeCount += 1
            }

            // Account for TXs
            if(!(txSignature in seenTransactions)) {
                seenTransactions.set(txSignature, {count: 0})
                elements.push({ data: { id: txSignature, source: from, target: to, weight: 1} })
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

        // @ts-ignore
        return elements;
    }
}
