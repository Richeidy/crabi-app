import { EdgeData } from "@/core/graph/graph"
import { PriorityPath } from "@/core/tour-strategy/tour-strategy"

export type ActiveNodes = {
    startNode: string, 
    endNode:string
}

export type GraphNetworkProps = {
    nodeElements: string[], 
    edgeElements: {
        source: string,
        target: string, 
        weight: number
    }[],
    activeNodes: ActiveNodes,
    priorityPath: {[key:string]: number} 
    path: string[]
    onSelectNode: (node:string)=> void
}

export type useGraphNetworkProps = {
    nodeElements: string[],
    edgeElements: EdgeData[],
    activeNodes: ActiveNodes,
    path: string [],
    priorityPath: PriorityPath
}