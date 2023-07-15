import { Graph } from "../graph/graph";
import { PriorityQueue } from "../priority-queue/priority-queue";

export type PriorityPath = {
    [key: string]: number;
}


export abstract class FindPathStrategy {

    protected graph: Graph;

    constructor(graph: Graph) {
        this.graph = graph;
    }

    abstract calculateShortPath(startNode: string, endNode: string): void
}

export class DijkstraStrategy extends FindPathStrategy {
    
    private distances: any = {};
    private parents: {[key: string]: string | null} = {};
    private queue: PriorityQueue = new PriorityQueue();
    path: string[] = [];
    totalDistance: number = Infinity;
    priorityPath: PriorityPath = {};

    calculateShortPath(startNode: string, endNode: string) {
        this.inicializeData(this.graph.getNodes(), startNode);

        while(!this.queue.isEmpty()) {
            const {element: currentNode} = this.queue.dequeue()!;
            if(currentNode === endNode) {
                break;
            }
            this.graph.getAdjacents(currentNode).forEach(node => {
                
                let weight = this.graph.calculateWeight(currentNode, node, this.parents[currentNode]);
                const distance = this.distances[currentNode] + weight;
                if(distance < this.distances[node]) {
                    this.distances[node] = distance;
                    this.parents[node] = currentNode;
                    this.queue.enqueue(node, distance);
                }
            });
        }

        this.path = this.getPath(startNode, endNode, this.parents) || [];
        this.priorityPath = this.path.reduce((pathDistances: {[key:string]: number}, node: string) => ({
           ...pathDistances, 
            [node]: this.distances[node]
        }), {})
        this.totalDistance = this.distances[endNode];
        
        return this;
    }


    private inicializeData(nodes: string[], startNode: string) {
        nodes.forEach(node => {
            this.distances[node] = Infinity;
            this.parents[node] = null
        });
        this.distances[startNode] = 0;
        this.queue.enqueue(startNode, 0);
    }

    private getPath(startNode: string, endNode: string, parents: {[key: string]: string | null}) {
        const path = [];
        let currentNode = endNode;
        while(currentNode !== startNode) {
            path.unshift(currentNode);
            currentNode = parents[currentNode]!;
            if(!currentNode) {
                return null
            }
        }
        path.unshift(startNode);
        return path;
    }
} 
