export class GraphNetworkMapper {

    static getEdgesWithPath(edges: cytoscape.ElementDefinition[], priorityPath: {[key:string]: number}) {
        const path = Object.keys(priorityPath);
        return path.reduce((edges, node, index) => {
            const nodeB = path[index + 1];
            return !nodeB 
                ? edges
                : edges.map(edge => !this.isEdge(edge, node, nodeB) 
                    ? edge
                    : {
                        
                        ...edge,
                        data: {
                            ...edge.data,
                            source: node, 
                            target: nodeB
                        },
                        classes: 'path'
                    });
        },edges);
    } 
    
    static isEdge(edge: cytoscape.ElementDefinition, nodeA: string, nodeB: string) {
        return (edge.data.source === nodeA && edge.data.target === nodeB) || 
            (edge.data.source === nodeB && edge.data.target === nodeA);
      
    }
    
    static createNode(label: string, styleClass: string = ''): cytoscape.ElementDefinition {
        return {
            data: {id: label},
            classes: styleClass,
            selectable: false
        }
    }
    
    static createEdge(source: string, target: string, weight: number, styleClass: string = ''): cytoscape.ElementDefinition {
        return {
            data: {source, target, weight},
            classes: styleClass,
            selectable: false,
        }
    }
}