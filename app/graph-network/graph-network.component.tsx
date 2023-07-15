import CytoscapeComponent from 'react-cytoscapejs';
import { useGraphNetwork } from './hooks/graph-network.hook';
import { graphNetworkStylesheet } from './constants/graph-networks-styles';
import { GraphNetworkProps } from './models/graph-network.models';
import { useEffect, useRef } from 'react';

export default function GraphNetwork(networkGrapProps: GraphNetworkProps) {
    
    const { onSelectNode } = networkGrapProps;
    const ref = useRef<cytoscape.Core>();
    const graphElements = useGraphNetwork(networkGrapProps);

    useEffect(() => {
        setTimeout(() => {

            if(!graphElements.length) {
    
                ref.current?.elements().remove();
            }
            ref.current?.layout({ name: 'cose' , animate: false}).run();
        })
    }, [networkGrapProps.nodeElements, networkGrapProps.edgeElements])

    return (<>
        { graphElements.length &&
            <CytoscapeComponent 
                elements={graphElements} 
                style={{width: '100%', height: '100%'}}
                cy = {cy => {
                    cy.one('tap', 'node', e => {
                        const node = e.target;
                        onSelectNode(node.data().id);
                    })
                    ref.current = cy;
                } }
                stylesheet={graphNetworkStylesheet}
            /> 
        }
   </>
  );
}





