import { EdgeData } from '@/core/graph/graph';
import {  useState } from 'react';
import styles from './graph-creator.module.scss';

type EdgeFormController = {
    source?: string,
    target?: string,
    weight?: string 
}

type GraphElements = {
    nodes: string[],
    edges: EdgeData[]
}

type GraphCreatorProps = {
    onChange: (elements: GraphElements) => void
}

export const GraphCreator = ({onChange}: GraphCreatorProps) => {

    const [{nodes, edges}, setELements] = useState<GraphElements>({
        nodes: [],
        edges: []
    });

    const [edgeForm, setEdgeForm] = useState<EdgeFormController>({
        source: '',
        target: '',
        weight: ''
    });
    const edgeContain = (edge: EdgeData, node: string) => edge.source == node || edge.target == node
    const isEdgeOf = (edge: EdgeData, nodeA: string, nodeB: string) => edgeContain(edge, nodeA) && edgeContain(edge, nodeB); 

    const remainNodes = nodes.filter(node => {
        const edgesThatContains = edges.filter(edge => edgeContain(edge, node));
        return edgesThatContains.length < (nodes.length-1)
    });

    const remainTargets = edgeForm.source ? remainNodes.filter(node => node !== edgeForm.source && !edges.find(edge => isEdgeOf(edge, node, edgeForm.source!))): [];

    const edgeFormIsValid = edgeForm.source && edgeForm.target && edgeForm.weight;

    const createNode = () => {
        let char: string
        if(nodes.length) {
            const key = (nodes[nodes.length -1]).charCodeAt(0);
            char = String.fromCharCode(key + 1);
        } else {
            char = 'A';
        }
        const elements = {
            edges,
            nodes: [...nodes, char]
        }
        setELements(elements);
        onChange(elements);
    }

    const createEdge = () => {
        const elements = {
            nodes,
            edges: [...edges, {
            source: edgeForm.source!,
            target: edgeForm.target!,
            weight: parseInt(edgeForm.weight!)
        }]};
        setELements(elements)
        onChange(elements);
        setEdgeForm({    
            source: '',
            target: '',
            weight: ''
        });
    }

    const reset = () => {
        setELements({
            nodes: [],
            edges: []
        })
        onChange({
            nodes: [],
            edges: []
        });
    }

    return( 
        <div className={styles.container}>

            <div className={styles.section}>
                <div className={styles.title}>Generar nuevos nodos</div>
                <div className={styles.nodes}>
                    {
                        nodes.map(node => <div key={node}>{node}</div>)
                    } 
                </div>
                <button className={styles.btnGreen } onClick={createNode}>Generar Nodo</button>
            </div>

            <div className={styles.section}>
                <div className={styles.title}>Asignar aristas</div>
                <div>
                    {edges.map((edge, i) => <div key={i}>{`${edge.source} - ${edge.weight} - ${edge.target}`}</div>)}
                </div>
                <div className={styles.selectContainer}>
                    <div>
                        <select 
                            disabled={!remainNodes.length} 
                            value={edgeForm.source} 
                            placeholder='Nodo 1'
                            onChange={(e) => setEdgeForm({...edgeForm, source: e.target.value})}>
                            <option value="" disabled hidden>Nodo 1</option>
                            {

                                remainNodes.map((node, i) => <option key={i} value={node}>{node}</option>)
                            }
                        </select>
                    </div>
                    <div>
                        <select 
                            disabled={!edgeForm.source || !remainTargets.length} 
                            value={edgeForm.target} 
                            placeholder='Nodo 2'
                            onChange={(e) => setEdgeForm({...edgeForm, target: e.target.value})}>
                            <option value="" disabled hidden>Nodo 2</option>
                            {remainTargets.map((node, i) => <option key={i} value={node}>{node}</option>)}
                        </select>
                    </div>
                    <div>
                        <input 
                            placeholder='Peso'
                            value={edgeForm.weight} 
                            onChange={(e) => setEdgeForm({
                                ...edgeForm, 
                                weight: e.target.value.replace(/[^0-9]/g,'')
                            })}/>
                    </div>
                </div>
                <div>
                    <button 
                        className={styles.btnGreen }
                        disabled={!edgeFormIsValid} 
                        onClick={createEdge}>
                            Generar Arista
                    </button>
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.title}>
                    Vacíar grafo
                </div>

                <button 
                    className={styles.btnGreen }
                    onClick={reset}>
                        Vaciar
                </button>
            </div>
        </div>
    )
}