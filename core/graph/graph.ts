
export type EdgeData = {
    source: string,
    target: string, 
    weight: number
}

export class Graph {
    private nodes;
    private edges: Edge[];

    constructor(nodes: string[], edges: Edge[]) {
        this.nodes = nodes;
        this.edges = edges;
    }

    getAdjacents(node: string) : string[]{
        return this.edges
            .filter(edge => edge.contains(node))
            .map(edge => edge.adjacent(node)) as string[];
    }

    getWeight(startNode: string, endNode: string) {
        return this.getEdge(startNode, endNode)?.weight;
    }

    private getEdge(startNode: string, endNode: string) {
        return this.edges.find(edge => edge.isEdge(startNode, endNode));
    }

    getNodes() {
        return [...this.nodes];
    }

    calculateWeight(startNode: string, endNode:string, parentStartNode: string | null) {
        return this.getAdjacents(startNode).reduce(((sum: number, node: string) => {
            if(node == parentStartNode) {
                return sum;
            }
            return sum + (this.getWeight(startNode, node)! * (node === endNode ? 1 : 2));
        }),0);
    }
}


export class Edge {
    source: string;
    target: string;
    weight: number;

    constructor(edgeData:EdgeData) {
        this.source = edgeData.source;
        this.target = edgeData.target;
        this.weight = edgeData.weight;
    }

    contains(node:string) {
        return [this.source, this.target].includes(node);
    }

    adjacent(node:string) {
        return node === this.source 
        ? this.target 
        : this.target === node 
            ? this.source 
            : undefined;
    }
    
    isEdge(startNode: string, endNode:string) {
        return this.contains(startNode) && this.contains(endNode);
    }
}