export default class Constants {
    public static maxDepth = 3

    public static offsetForDepth(depth: number) {

        if(depth >= 3) {
            return 20
        }
        if(depth == 2) {
            return 10
        }
        if(depth == 1) {
            return 5
        }

        return 1
    }

    public static cyConfig = {
        style: [
            {
                selector: 'node',
                style: {
                    'label': 'data(label)',
                    "width": "mapData(score, 0, 100, 20, 60)",
                    "height": "mapData(score, 0, 100, 20, 60)",
                    "font-size": "12px",
                    "text-valign": "center",
                    "text-halign": "center",
                    "background-color": "#555",
                    "text-outline-color": "#555",
                    "text-outline-width": "2px",
                    "color": "#fff",
                    "overlay-padding": "6px",
                    "z-index": "10"
                }
            },
            {
                selector: 'node.target',
                style: {
                    'background-color': 'red',
                }
            }
            , {
                selector: 'edge',
                style: {
                    "font-size": "6px",
                    "opacity": 0.5,
                    "line-color": "#333",
                    "width": 'mapData(weight, 1, 100, 1, 10)',
                    'arrow-scale': 'mapData(weight, 1, 100, 0.5, 3)',
                    'mid-target-arrow-fill': 'filled',
                    'mid-target-arrow-shape': 'triangle',
                    'mid-target-arrow-color': "#333"
                    // 'curve-style': 'haystack',
                    // 'haystack-radius': 0.8,
                    // 'label': 'data(weight)',
                    // 'color': 'white',
                }
            },
            {
                selector: 'node.highlight',
                style: {
                    'border-color': '#FFF',
                    'border-width': '2px'
                }
            },
            {
                selector: 'node.semitransp',
                style:{ 'opacity': '0.5' }
            },
            {
                selector: 'edge.highlight',
                style: { 'mid-target-arrow-color': '#FFF' }
            },
            {
                selector: 'edge.semitransp',
                style:{ 'opacity': '0.2' }
            }
        ]
    }

    public static coseLayout = {
        name: 'cose',
        animate: false,
        idealEdgeLength: 100,
        nodeOverlap: 20,
        refresh: 20,
        fit: true,
        padding: 30,
        randomize: false,
        componentSpacing: 100,
        nodeRepulsion: 400000,
        edgeElasticity: 100,
        nestingFactor: 5,
        gravity: 80,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0
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
}