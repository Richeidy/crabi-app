import styles from './legend.module.scss'

type LegendProps = {
    startNode: string, 
    endNode: string,
    path: {[key:string]: number}
}

export default function Legend({startNode, endNode, path}: LegendProps) {
 return (
    <>
    <div className={styles.container}> 
        <p>Nodo Inicial: {startNode}</p>
        <p>Nodo Final: {endNode}</p>
        <div>
            <span>Recorrido/Costos: </span>
            <span>
                {
                    Object.keys(path).map((node,i) => <span key={i}>
                        {i ? <span>--<span className={styles.weight}>{path[node]}</span>--{'>'}</span> : ''}
                        <span className={styles.node}>{node}</span>
                    </span>)
                }
            </span>
        </div>
        <p className={styles.bold}>Costo Total: {path[endNode]}</p>
    </div>
    </>
 )
} 