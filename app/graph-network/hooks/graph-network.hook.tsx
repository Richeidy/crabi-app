import { useMemo } from "react";
import { GraphNetworkMapper } from "@/core/graph-network-mapper/graph-network-mapper";
import { useGraphNetworkProps } from "../models/graph-network.models";

export const useGraphNetwork = (networkGraphProps: useGraphNetworkProps) => {

    const {
        nodeElements, 
        edgeElements, 
        activeNodes, 
        path,
        priorityPath
    } = networkGraphProps;
    
    return useMemo(()=> {
        
        const graphNodes = nodeElements.map(nodeId => {

            if(nodeId === activeNodes.startNode|| nodeId === activeNodes.endNode) {

                return GraphNetworkMapper.createNode(nodeId, 'selected')
            } else if(path.find(path => path === nodeId)) {

                return GraphNetworkMapper.createNode(nodeId, 'visited')
            }
            return GraphNetworkMapper.createNode(nodeId);
        });

        const rawGraphEdges = edgeElements.map(edge=> GraphNetworkMapper.createEdge(edge.source, edge.target, edge.weight));
        const graphEdges = GraphNetworkMapper.getEdgesWithPath(rawGraphEdges, priorityPath);
        
        return [...graphNodes, ...graphEdges];
        
    },[nodeElements, edgeElements, priorityPath]);
}

