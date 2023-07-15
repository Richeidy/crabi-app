"use client";

import { useEffect, useState } from 'react';
import Legend from './legend/legend.component';
import { Edge, EdgeData, Graph } from '@/core/graph/graph';
import { DijkstraStrategy } from '@/core/tour-strategy/tour-strategy';
import NetworkGraph from './graph-network/graph-network.component';
import styles from './page.module.scss';
import { ActiveNodes } from './graph-network/models/graph-network.models';
import { GraphCreator } from './graph-creator/graph-creator';
import { edgeElements, nodeElements } from '@/constants/graph-dummy';

export default function main() {

    const [activeNodes, setSelectedNode] = useState<ActiveNodes>({startNode: '', endNode: ''});
    const [nodes, setNodes] = useState<string[]>([]);
    const [edges, setEdges] = useState<EdgeData[]>([]);
    let path: string[] = [];
    let priorityPath: {[key:string]: number} = {};

    useEffect(() => {
        setNodes(nodeElements);
        setEdges(edgeElements);
        setSelectedNode({
            startNode: 'a',
            endNode:'e'
        });
    }, []);


    const clearSelectedNodes = () => {
        setSelectedNode({startNode: '', endNode: ''});
    }

    const selectedNode = (node: string) => {
        if(node === activeNodes.startNode){
            clearSelectedNodes();
        } else {
            const newNodes:ActiveNodes = {
                startNode: activeNodes.startNode || node,
                endNode: !activeNodes.startNode || activeNodes.endNode == node ? '' : node
            }
            setSelectedNode(newNodes);
        }
    }

    const getRouteInGraph = (startNode:string, endNode:string) => {
        const graph = new Graph(nodes, edges.map(edgeData => new Edge(edgeData)));
        const dijkstra = new DijkstraStrategy(graph);
        path = dijkstra.calculateShortPath(startNode, endNode).path;
        priorityPath = dijkstra.priorityPath;
    }

    if(activeNodes.startNode && activeNodes.endNode) {
        getRouteInGraph(activeNodes.startNode, activeNodes.endNode);
    }
    
  return (
   <>
    <header className={styles.header}>
        <div className={styles.title}>
            <h1>¡The happy way!</h1>
            <p >Crea puntos y caminos entre ellos, y obtén el camino feliz.</p>
        </div>
    </header>
    <div className={styles.containerLegend}>
        <Legend 
            startNode={activeNodes.startNode} 
            endNode={activeNodes.endNode}
            path={priorityPath}
        />
    </div>
    <div className={styles.graphContainer}>
        <div className={styles.graph}>
            <NetworkGraph 
                nodeElements={nodes} 
                edgeElements={edges} 
                onSelectNode={(node)=>selectedNode(node)}
                activeNodes={activeNodes}
                path={path}
                priorityPath={priorityPath}
            />
        </div>
        <GraphCreator onChange={({nodes, edges}) => {
            setNodes(nodes);
            setEdges(edges);
            if(nodes.length === 1) {
                clearSelectedNodes();
            }
        }}/>
    </div>
   </> 
  );
}