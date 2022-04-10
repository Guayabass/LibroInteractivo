import React, {useState} from 'react'
import Operation from './Operation'

import './SumaResta2.css'

function SumarResta2(props) {    
    const [operationsState, setOperationsState] = useState({
        'operation-1': {},
        'operation-2': {},
        'operation-3': {},
        'operation-4': {}
    })

    const onSelectedResult = (result) => {        
        setOperationsState({
            ...operationsState,
            [result.id]: result
        })
    }
    
    const renderOperations = () => {
        return Object.keys(operationsState).map(key => <Operation key={key} id={key} onSelectedResult={onSelectedResult}/>)
    }

    return(
        <div className="activity-container">
            {renderOperations()}        
        </div>        
    )
}

export default SumarResta2