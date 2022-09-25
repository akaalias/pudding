import API from "@/models/API"

export default class GraphDataProvider {

    public static async getTransactionsNetworkForAccount(account: string) {

        /*
            https://js.cytoscape.org/#getting-started/specifying-basic-options
            elements: [ // list of graph elements to start with
                { // node a
                  data: { id: 'a' }
                },
                { // node b
                  data: { id: 'b' }
                },
                { // edge ab
                  data: { id: 'ab', source: 'a', target: 'b' }
                }
              ]
         */
        const txs = await API.getTransactionsForAccount(account);
        var elements = [ // list of graph elements to start with
            { // node a
                data: { id: 'a' }
            },
            { // node b
                data: { id: 'b' }
            },
            { // edge ab
                data: { id: 'ab', source: 'a', target: 'b' }
            }
        ]

        // Magic TBD...

        return elements;
    }
}
