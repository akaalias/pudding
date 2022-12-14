export default class Constants {
    public static APIMaxResults = 1000
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
    public static AvailableTokens = [
        {name: 'WETH', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/WETH.png',address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'},
        {name: 'Binance Coin', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/Binance USD.png', address: '0xb8c77482e45f1f44de1745f52c74426c631bdd52'},
        {name: 'Tether USD', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/Tether USD.png', address: '0xdac17f958d2ee523a2206206994597c13d831ec7'},
        {name: 'USD Coin', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/USD Coin.png', address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'},
        {name: 'Dai', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/Dai.png', address: '0x6b175474e89094c44da98b954eedeac495271d0f'},
        {name: 'Curve DAO Token', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/Curve DAO Token.png', address: '0xd533a949740bb3306d119cc777fa900ba034cd52'},
        {name: 'Shiba Inu', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/Shiba Inu.png', address: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce'},
        {name: 'Wrapped Bitcoin', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/Wrapped Bitcoin.png', address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'},
        {name: 'Tron', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/Tron.png', address: '0xe1be5d3f34e89de342ee97e6e90d405884da6c67'},
        {name: 'Decentralized USD', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/USDD.png', address: '0x0C10bF8FcB7Bf5412187A595ab97a3609160b5c6'},
        {name: 'Lido Staked Ether', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/Uniswap.png', address: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84'},
        {name: 'Chainlink', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/Chainlink.png', address: '0x514910771af9ca656af840dff83e8264ecf986ca'},
        {name: 'HEX', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/HEX.png', address: '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39'},
        {name: 'Matic Network', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/MATIC.png', address: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0'},
        {name: 'Hedron', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/Hedron.png', address: '0x3819f64f282bf135d62168c1e513280daf905e06'},
        {name: 'Binance USD', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/Binance USD.png', address: '0x4fabb145d64652a948d72533023f6e7a623c7c53'},
        {name: 'SAND', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/SAND.png', address: '0x3845badade8e6dff049820680d1f14bd3903a5d0'},
        {name: 'ApeCoin', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/ApeCoin.png', address: '0x4d224452801aced8b2f0aebe155379bb5d594381'},
        {name: 'Quant', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/Quant.png', address: '0x4a220e6096b25eadb88358cb44068a3248254675'},
        {name: 'Convex Finance', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/Convex.png', address: '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b'},
        {name: 'Gala', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/Gala.png', address: '0x15d4c048f83bd7e37d49ea4c83a07267ec4203da'},
        {name: 'Uniswap', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/Uniswap.png', address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'},
        {name: 'Near', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/Near.png', address: '0x85F17Cf997934a597031b2E18a9aB6ebD4B9f6a4'},
        {name: 'VeChain', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/VeChain.png', address: '0xD850942eF8811f2A866692A623011bDE52a462C1'},
        {name: 'Frax', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/Frax.png', address: '0x853d955aCEf822Db058eb8505911ED77F175b99e'},
        {name: 'HuobiToken', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/HuobiToken.png', address: '0x6f259637dcD74C767781E37Bc6133cd6A68aa161'},
        {name: 'chiliZ', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/chiliZ.png', address: '0x3506424F91fD33084466F402d5D97f05F8e3b4AF'},
        {name: 'Lido DAO Token', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/Lido.png', address: '0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32'},
        {name: 'Chain', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/Chain.png', address: '0xA2cd3D43c775978A96BdBf12d733D5A1ED94fb18'},
        {name: 'TrueUSD', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/TrueUSD.png', address: '0x0000000000085d4780B73119b644AE5ecd22b376'},
        {name: 'Pax Dollar', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/PaxDollar.png', address: '0x8E870D67F660D95d5be530380D0eC0bd388289E1'},
        {name: 'BitTorrent', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/BitTorrent.png', address: '0xC669928185DbCE49d2230CC9B0979BE6DC797957'},
        {name: 'KuCoin Token', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/KucoinToken.png', address: '0xf34960d9d60be18cC1D5Afc1A6F012A723a28811'},
        {name: 'Fantom Token', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/FantomToken.png', address: '0x4E15361FD6b4BB609Fa63C81A2be19d873717870'},
        {name: 'Gemini dollar', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/GeminiDollar.png', address: '0x056Fd409E1d7A124BD7017459dFEa2F387b6d5Cd'},
        {name: 'Maker', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/Maker.png', address: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2'},
        {name: 'Compound USD Coin', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/CompoundUSD.png', address: '0x39AA39c021dfbaE8faC545936693aC917d5E7563'},
        {name: 'Paxos Gold', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/PaxosGold.png', address: '0x45804880De22913dAFE09f4980848ECE6EcbAf78'},
        {name: 'Graph Token', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/missing-token.png', address: '0xc944E90C64B2c07662A292be6244BDf05Cda44a7'},
        {name: 'Synthetix Network Token', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/missing-token.png', address: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F'},
        {name: 'Compound Ether', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/missing-token.png', address: '0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5'},
        {name: 'Compound Dai', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/missing-token.png', address: '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643'},
        {name: 'Tether Gold', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/missing-token.png', address: '0x68749665FF8D2d112Fa859AA293F07A622782F38'},
        {name: 'Frax Share', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/missing-token.png', address: '0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0'},
        {name: 'Rocket Pool', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/missing-token.png', address: '0xD33526068D116cE69F19A9ee46F0bd304F21A51f'},
        {name: 'Nexo', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/missing-token.png', address: '0xB62132e35a6c13ee1EE0f84dC5d40bad8d815206'},
        {name: 'BAT', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/missing-token.png', address: '0x0D8775F648430679A709E98d2b0Cb6250d2887EF'},
        {name: '1INCH Token', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/missing-token.png', address: '0x111111111117dC0aa78b770fA6A738034120C302'},
        {name: 'BitDAO', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/missing-token.png', address: '0x1A4b46696b2bB4794Eb3D4c26f1c55F9170fa4C5'},
        {name: 'OKB', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/missing-token.png', address: '0x75231F58b43240C9718Dd58B4967c5114342a86c'},
        {name: 'Theta', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/missing-token.png', address: '0x3883f5e181fccaF8410FA61e12b59BAd963fb645'},
        {name: 'Bitfinex LEO', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/missing-token.png', address: '0x2AF5D2aD76741191D15Dfe7bF6aC92d4Bd912Ca3'},
        {name: 'Cronos', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/missing-token.png', address: '0xA0b73E1Ff0B80914AB6fe0444E65848C4C34450b'},
        {name: 'XinFin XDCE', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/missing-token.png', address: '0x41AB1b6fcbB2fA9DCEd81aCbdeC13Ea6315F2Bf2'},
        {name: 'Zilliqa', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/missing-token.png', address: '0x05f4a42e251f2d52b8ed15E9FEdAacFcEF1FAD27'},
        {name: 'DeFiChain Token', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/missing-token.png', address: '0x8Fc8f8269ebca376D046Ce292dC7eaC40c8D358A'},
        {name: 'HoloToken', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/missing-token.png', address: '0x6c6EE5e31d828De241282B9606C8e98Ea48526E2'},
        {name: 'Olympus', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/missing-token.png', address: '0x64aa3364F17a4D01c6f1751Fd97C2BD3D7e7f1D5'},
        {name: 'LoopringCoin V2', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/missing-token.png', address: '0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD'},
        {name: 'EnjinCoin', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/missing-token.png', address: '0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c'},
        {name: 'MCO', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/missing-token.png', address: '0xB63B606Ac810a52cCa15e44bB630fd42D8d1d83d'},
        {name: 'NXM', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/missing-token.png', address: '0xd7c49CEE7E9188cCa6AD8FF264C1DA2e69D4Cf3B'},
        {name: 'Wrapped Celo', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/missing-token.png', address: '0xE452E6Ea2dDeB012e20dB73bf5d3863A3Ac8d77a'},
        {name: 'EnjinCoin', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/missing-token.png', address: '0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c'},
        {name: 'EnjinCoin', imageFileName: 'https://raw.githubusercontent.com/akaalias/pudding/main/public/img/missing-token.png', address: '0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c'},
        ]
    public static ExploreAddressCyStyle = [
        {
            selector: 'node',
            style: {
                "font-size": "8px",
                "text-outline-color": "#555",
                "text-outline-width": "1px",
                "text-valign": "center",
                "text-halign": "center",
                "color": "#fff",
                'width': '15px',
                'height': '15px',
                "background-color": "#444",
            },
        },
        {
            selector: 'node.target',
            style: {
                'width': '30px',
                'height': '30px',
                'border-width': '5px',
                "shape": "ellipse",
                "border-color": "red",
            },
        },
        {
            selector: 'node.current-target',
            style: {
                "shape": "ellipse",
                "border-color": "yellow",
            },
        },
        {
            selector: 'node.address',
            style: {
                "shape": "ellipse",
            },
        },
        {
            selector: 'node.contract',
            style: {
                "shape": "triangle",
            },
        },
        {
            selector: 'node.show-label',
            style: {
                "label": "data(label)",
            },
        },
        {
            selector: 'node.legend',
            style: {
            },
        },
        {
            selector: 'node.date',
            style: {
            },
        },
        {
            selector: 'edge',
            style: {
                'curve-style': 'haystack',
                'haystack-radius': 0.3,
                // 'curve-style': 'unbundled-bezier',
                'width': '1px',
                'line-color': '#ccc',
                'line-opacity': 0.5
            },
        },
    ]
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
            selector: 'edge.transaction-focus.showLabel',
            style: {
                "text-background-color": 'blue',
            }
        },
        {
            selector: 'edge.showLabel',
            style: {
                'label': 'data(description)',
                "font-size": "12px",
                "color": "#fff",
                "text-background-shape": 'rectangle',
                "text-background-opacity": 1,
                "text-background-padding": 5,
                'z-index': 10000000,
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

    // Layouts
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
    public static concentricLayout = {
        name: 'concentric',
        animate: true
    }
    public static colaLayout = {
        name: 'cola',
        animate: true
    }
    public static gridLayout = {
        name: 'grid',
        animate: true
    }
    public static circleLayout = {
        name: 'circle',
        animate: true
    }
    public static breadthfirstLayout = {
        name: 'breadthfirst',
        animate: true
    }

    // Colors
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

    //@ts-ignore
    public static DEFAULT_COLOR_CODE = [][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]][([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]((!![]+[])[+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+([][[]]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+!+[]]+([]+[])[(![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(!![]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]()[+!+[]+[!+[]+!+[]]]+((!![]+[])[+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(!![]+[])[+[]]+[+!+[]]+[+!+[]]+[!+[]+!+[]+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+[+!+[]]+(!![]+[])[+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[+!+[]]+[+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[+!+[]]+[+!+[]]+[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[+!+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]]+([][[]]+[])[!+[]+!+[]]+([][[]]+[])[+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+[+[]]+(!![]+[])[+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[+!+[]]+[+[]]+[!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]]+[+[]]+(!![]+[])[+[]]+[+!+[]]+[+[]]+[+!+[]]+[!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+([][[]]+[])[+[]]+(!![]+[])[+[]]+[+!+[]]+[+!+[]]+[!+[]+!+[]]+(!![]+[])[+[]]+[+!+[]]+[+[]]+[+!+[]])[(![]+[])[!+[]+!+[]+!+[]]+(+(!+[]+!+[]+[+!+[]]+[+!+[]]))[(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([]+[])[([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]][([][[]]+[])[+!+[]]+(![]+[])[+!+[]]+((+[])[([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]+[])[+!+[]+[+!+[]]]+(!![]+[])[!+[]+!+[]+!+[]]]](!+[]+!+[]+!+[]+[+!+[]])[+!+[]]+(![]+[])[!+[]+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(!![]+[])[+[]]]((!![]+[])[+[]])[([][(!![]+[])[!+[]+!+[]+!+[]]+([][[]]+[])[+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(!![]+[])[!+[]+!+[]+!+[]]+(![]+[])[!+[]+!+[]+!+[]]]()+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([![]]+[][[]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]](([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]][([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]((!![]+[])[+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+([][[]]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+!+[]]+(![]+[+[]])[([![]]+[][[]])[+!+[]+[+[]]]+(!![]+[])[+[]]+(![]+[])[+!+[]]+(![]+[])[!+[]+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(![]+[])[!+[]+!+[]+!+[]]]()[+!+[]+[+[]]]+![]+(![]+[+[]])[([![]]+[][[]])[+!+[]+[+[]]]+(!![]+[])[+[]]+(![]+[])[+!+[]]+(![]+[])[!+[]+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(![]+[])[!+[]+!+[]+!+[]]]()[+!+[]+[+[]]])()[([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]((![]+[+[]])[([![]]+[][[]])[+!+[]+[+[]]]+(!![]+[])[+[]]+(![]+[])[+!+[]]+(![]+[])[!+[]+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(![]+[])[!+[]+!+[]+!+[]]]()[+!+[]+[+[]]])+[])[+!+[]])+([]+[])[(![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(!![]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]()[+!+[]+[!+[]+!+[]]])()
}
