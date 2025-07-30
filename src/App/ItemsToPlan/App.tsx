import React, {useEffect, useState} from 'react'


function ItemsToPlanList() {
    const [itemsToPlan, setItemsToPlan] = useState([]);

const linkGen = (obj) => {   

    const item_fn = (obj: any) => {
        return obj.po + obj.drawing
    }

    const filename = item_fn(obj)
    const result = `http://localhost:8000/api/pdf_view/${encodeURIComponent(filename)}`
    return result
}

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/planner/itemstoplan/')
            .then(response => response.json())
        .then(data => setItemsToPlan(data))
        .catch(error => console.error('Error, error'));
    }, []);



    return (
        <div>
            <h2> Items to Plan</h2>
            <ul>
                {itemsToPlan.map(itemToPlan =>
                    <li key={itemToPlan.item_id}> {itemToPlan.item_id} Rysunek: {itemToPlan.drawing} OPEN: <a href={linkGen(itemToPlan)} target="_blank" rel="noopener noreferrer"> aaaa</a> </li>
                )}
            </ul>
        </div>
    )
}

export default ItemsToPlanList