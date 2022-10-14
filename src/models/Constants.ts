export default class Constants {
    public static APIMaxResults = 800
    public static RandomNodeCount = 250
    public static EdgeMaxCount = 20
    public static Modulo = 12
    public static RandomWeightMax = 100
    public static LouvainMax = 1
    public static maxDepth = 1
    public static RelationshipFocus = "Relationships"
    public static TransactionFocus = "Transactions"
    public static HybridFocus = "Hybrid"

    public static RelationshipEdgeColorStart = "#4f2f2f"
    public static RelationshipEdgeColorEnd = "#FF9494"
    public static TransactionEdgeColorStart = "#525d6e"
    public static TransactionEdgeColorEnd = "#7e92af"

    public static AvailableTokenNames() {
        return this.AvailableTokens.map(x => x.name)
    }
    public static AvailableTokenAddresses() {
        return this.AvailableTokens.map(x => x.address)
    }

    public static AvailableTokens =
        [{name: 'WETH', deepLink: '/home?address=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', image: ''},
        {name: 'Tether USD', deepLink: '/home?address=0xdac17f958d2ee523a2206206994597c13d831ec7', address: '0xdac17f958d2ee523a2206206994597c13d831ec7'},
        {name: 'USD Coin', deepLink: '/home?address=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'},
        {name: 'Dai', deepLink: '/home?address=0x6b175474e89094c44da98b954eedeac495271d0f', address: '0x6b175474e89094c44da98b954eedeac495271d0f'},
        {name: 'Curve DAO Token', deepLink: '/home?address=0xd533a949740bb3306d119cc777fa900ba034cd52', address: '0xd533a949740bb3306d119cc777fa900ba034cd52'},
        {name: 'Shiba Inu', deepLink: '/home?address=0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce', address: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce'},
        {name: 'Wrapped Bitcoin', deepLink: '/home?address=0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'},
        {name: 'Chainlink', deepLink: '/home?address=0x514910771af9ca656af840dff83e8264ecf986ca', address: '0x514910771af9ca656af840dff83e8264ecf986ca'},
        {name: 'HEX', deepLink: '/home?address=0x2b591e99afe9f32eaa6214f7b7629768c40eeb39', address: '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39'},
        {name: 'Matic Network', deepLink: '/home?address=0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0', address: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0'},
        {name: 'Hedron', deepLink: '/home?address=0x3819f64f282bf135d62168c1e513280daf905e06', address: '0x3819f64f282bf135d62168c1e513280daf905e06'},
        {name: 'Binance USD', deepLink: '/home?address=0x4fabb145d64652a948d72533023f6e7a623c7c53', address: '0x4fabb145d64652a948d72533023f6e7a623c7c53'},
        {name: 'SAND', deepLink: '/home?address=0x3845badade8e6dff049820680d1f14bd3903a5d0', address: '0x3845badade8e6dff049820680d1f14bd3903a5d0'},
        {name: 'ApeCoin', deepLink: '/home?address=0x4d224452801aced8b2f0aebe155379bb5d594381', address: '0x4d224452801aced8b2f0aebe155379bb5d594381'},
        {name: 'Quant', deepLink: '/home?address=0x4a220e6096b25eadb88358cb44068a3248254675', address: '0x4a220e6096b25eadb88358cb44068a3248254675'},
        {name: 'Convex Finance', deepLink: '/home?address=0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b', address: '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b'},
        {name: 'Gala', deepLink: '/home?address=0x15d4c048f83bd7e37d49ea4c83a07267ec4203da', address: '0x15d4c048f83bd7e37d49ea4c83a07267ec4203da'},
        {name: 'Uniswap', deepLink: '/home?address=0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'},
        {name: 'New World Order', deepLink: '/home?address=0x00c2999c8b2adf4abc835cc63209533973718eb1', address: '0x00c2999c8b2adf4abc835cc63209533973718eb1'}]

    public static cyStyle = [
        {
            selector: 'node',
            style: {
                "font-size": "14px",
                "text-valign": "center",
                "text-halign": "center",
                "background-color": "#555",
                "text-outline-color": "#555",
                "text-outline-width": "2px",
                "color": "#fff",
                "overlay-padding": "6px",
                "z-index": 1
            },
        },
        {
            selector: 'node.target',
            style: {
                'border-color': 'red',
                'border-width': '5px'
            }
        }
        ,
        {
            selector: 'edge',
            style: {
                'mid-target-arrow-fill': 'filled',
                'mid-target-arrow-shape': 'triangle',
                'curve-style': 'unbundled-bezier',
                'z-index': 1
            }
        },
        {
            selector: 'edge.relationship-focus',
            style: {
                'line-color': 'red',
            }
        },
        {
            selector: 'edge.transaction-focus',
            style: {
                'line-color': 'blue',
            }
        },
        {
            selector: 'edge.showLabel',
            style: {
                'line-opacity': 1.0,
                'line-color': '#fff',
                'label': 'data(description)',
                "font-size": "12px",
                "text-valign": "center",
                "text-halign": "center",
                "color": "#fff",
                "text-background-shape": 'rectangle',
                "text-background-opacity": 1,
                "text-background-color": '#555',
                "text-background-padding": 5,
                'z-index': 1000000
            }
        },
        {
            selector: 'node.showLabel',
            style: {
                'label': 'data(label)',
            }
        }
        ,
        {
            selector: 'node.semitransp',
            style:{ 'opacity': '0.5' }
        },
        {
            selector: 'edge.highlight',
            style: {
                // 'label': 'data(weight)',
                // 'color': '#333',
            }
        },
        {
            selector: 'edge.semitransp',
            style:{ 'opacity': '0.2' }
        },
        {
            selector: 'node.community',
            style: {
            }
        }
    ]
    public static coseLayout = {
        name: 'cose',
        animate: false,
        idealEdgeLength: 100,
        nodeOverlap: 0.1,
        refresh: 100,
        fit: true,
        animateFilter: function ( node: any, i:any ){ return true; },
        padding: 100,
        randomize: false,
        componentSpacing: 100,
        nodeRepulsion: 400000,
        edgeElasticity: 200,
        nestingFactor: 5,
        gravity: 0,
        numIter: 1000,
        initialTemp: 300,
        coolingFactor: 0.95,
        minTemp: 1.0,
        animationDuration: 3000,
    }
    public static offsetForDepth(depth: number) {
        if(depth >= 3) {
            return 20
        }
        if(depth == 2) {
            return 15
        }
        if(depth == 1) {
            return 30
        }

        return 10
    }
    public static concentricLayout = {
        name: 'concentric',
        fit: true, // whether to fit the viewport to the graph
        padding: 30, // the padding on fit
        startAngle: 3 / 2 * Math.PI, // where nodes start in radians
        sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
        clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
        equidistant: false, // whether levels have an equal radial distance betwen them, may cause bounding box overflow
        minNodeSpacing: 10, // min spacing between outside of nodes (used for radius adjustment)
        boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
        nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
        height: undefined, // height of layout area (overrides container height)
        width: undefined, // width of layout area (overrides container width)
        spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
        concentric: function(node: any ){ // returns numeric value for each node, placing higher nodes in levels towards the centre
            return node.degree();
        },
        levelWidth: function(nodes: any ){ // the variation of concentric values in each level
            return nodes.maxDegree() / 4;
        },
        animate: false, // whether to transition the node positions
        animationDuration: 500, // duration of animation in ms if enabled
        animationEasing: undefined, // easing of animation if enabled
        animateFilter: function (node: any, i: any ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
        ready: undefined, // callback on layoutready
        stop: undefined, // callback on layoutstop
        transform: function (node: any, position: any ){ return position; } // transform a given node position. Useful for changing flow direction in discrete layouts
    }
    public static colaLayout = {
        name: 'cola',
        animate: true, // whether to show the layout as it's running
        refresh: 1, // number of ticks per frame; higher is faster but more jerky
        maxSimulationTime: 4000, // max length in ms to run the layout
        ungrabifyWhileSimulating: false, // so you can't drag nodes during layout
        fit: true, // on every layout reposition of nodes, fit the viewport
        padding: 30, // padding around the simulation
        boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        nodeDimensionsIncludeLabels: false, // whether labels should be included in determining the space used by a node
    }
    public static gridLayout = {
        name: 'grid'
    }
    public static colors = [
        "AliceBlue",
        "AntiqueWhite",
        "Aqua",
        "Aquamarine",
        "Azure",
        "Beige",
        "Bisque",
        "Black",
        "BlanchedAlmond",
        "Blue",
        "BlueViolet",
        "Brown",
        "BurlyWood",
        "CadetBlue",
        "Chartreuse",
        "Chocolate",
        "Coral",
        "CornflowerBlue",
        "Cornsilk",
        "Crimson",
        "Cyan",
        "DarkBlue",
        "DarkCyan",
        "DarkGoldenRod",
        "DarkGray",
        "DarkGrey",
        "DarkGreen",
        "DarkKhaki",
        "DarkMagenta",
        "DarkOliveGreen",
        "DarkOrange",
        "DarkOrchid",
        "DarkRed",
        "DarkSalmon",
        "DarkSeaGreen",
        "DarkSlateBlue",
        "DarkSlateGray",
        "DarkSlateGrey",
        "DarkTurquoise",
        "DarkViolet",
        "DeepPink",
        "DeepSkyBlue",
        "DimGray",
        "DimGrey",
        "DodgerBlue",
        "FireBrick",
        "FloralWhite",
        "ForestGreen",
        "Fuchsia",
        "Gainsboro",
        "GhostWhite",
        "Gold",
        "GoldenRod",
        "Gray",
        "Grey",
        "Green",
        "GreenYellow",
        "HoneyDew",
        "HotPink",
        "IndianRed",
        "Indigo",
        "Ivory",
        "Khaki",
        "Lavender",
        "LavenderBlush",
        "LawnGreen",
        "LemonChiffon",
        "LightBlue",
        "LightCoral",
        "LightCyan",
        "LightGoldenRodYellow",
        "LightGray",
        "LightGrey",
        "LightGreen",
        "LightPink",
        "LightSalmon",
        "LightSeaGreen",
        "LightSkyBlue",
        "LightSlateGray",
        "LightSlateGrey",
        "LightSteelBlue",
        "LightYellow",
        "Lime",
        "LimeGreen",
        "Linen",
        "Magenta",
        "Maroon",
        "MediumAquaMarine",
        "MediumBlue",
        "MediumOrchid",
        "MediumPurple",
        "MediumSeaGreen",
        "MediumSlateBlue",
        "MediumSpringGreen",
        "MediumTurquoise",
        "MediumVioletRed",
        "MidnightBlue",
        "MintCream",
        "MistyRose",
        "Moccasin",
        "NavajoWhite",
        "Navy",
        "OldLace",
        "Olive",
        "OliveDrab",
        "Orange",
        "OrangeRed",
        "Orchid",
        "PaleGoldenRod",
        "PaleGreen",
        "PaleTurquoise",
        "PaleVioletRed",
        "PapayaWhip",
        "PeachPuff",
        "Peru",
        "Pink",
        "Plum",
        "PowderBlue",
        "Purple",
        "LightPink",
        "Red",
        "RosyBrown",
        "RoyalBlue",
        "SaddleBrown",
        "Salmon",
        "SandyBrown",
        "SeaGreen",
        "SeaShell",
        "Sienna",
        "Silver",
        "SkyBlue",
        "SlateBlue",
        "SlateGray",
        "SlateGrey",
        "Snow",
        "SpringGreen",
        "SteelBlue",
        "Tan",
        "Teal",
        "Thistle",
        "Tomato",
        "Turquoise",
        "Violet",
        "Wheat",
        "White",
        "WhiteSmoke",
        "Yellow",
    ]
    public static colorForNumber(nodeId: any) {
        return Constants.intToRGB(Constants.hashCode("" + nodeId))
    }
    private static hashCode(str: string) { // java String#hashCode
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    }
    private static intToRGB(i: number){
        var c = (i & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();

        return "00000".substring(0, 6 - c.length) + c;
    }
    public static getBackgroundColor(i: any) {
        let stringUniqueHash = [...(i + "")].reduce((acc, char) => {
            return char.charCodeAt(0) + ((acc << 5) - acc);
        }, 0);
        return `hsl(${stringUniqueHash % 360}, 95%, 35%)`;
    }
    public static StringToColor = (function(){
        var instance: any = null;

        return {
            next: function stringToColor(str: string) {
                if(instance === null) {
                    instance = {};
                    instance.stringToColorHash = {};
                    instance.nextVeryDifferntColorIdx = 0;
                    instance.veryDifferentColors = ["#000000","#00FF00","#0000FF","#FF0000","#01FFFE","#FFA6FE","#FFDB66","#006401","#010067","#95003A","#007DB5","#FF00F6","#FFEEE8","#774D00","#90FB92","#0076FF","#D5FF00","#FF937E","#6A826C","#FF029D","#FE8900","#7A4782","#7E2DD2","#85A900","#FF0056","#A42400","#00AE7E","#683D3B","#BDC6FF","#263400","#BDD393","#00B917","#9E008E","#001544","#C28C9F","#FF74A3","#01D0FF","#004754","#E56FFE","#788231","#0E4CA1","#91D0CB","#BE9970","#968AE8","#BB8800","#43002C","#DEFF74","#00FFC6","#FFE502","#620E00","#008F9C","#98FF52","#7544B1","#B500FF","#00FF78","#FF6E41","#005F39","#6B6882","#5FAD4E","#A75740","#A5FFD2","#FFB167","#009BFF","#E85EBE"];
                }

                if(!instance.stringToColorHash[str])
                    instance.stringToColorHash[str] = instance.veryDifferentColors[instance.nextVeryDifferntColorIdx++];

                return instance.stringToColorHash[str];
            }
        }
    })();
}
