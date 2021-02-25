import React, { useState} from 'react';
import Form from './Form';

const Forma = () => {
    const [currentId, setCurrentId] = useState(0);


    return (
        <div>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
        </div>
    )
}

export default Forma
