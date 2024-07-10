import React from 'react';

function Cat(props) {
    
    const { id, name, imgUrl, description, tags, status } = props.cat;

    const _pClass = {
        available: 'catCard',
        unavailable: 'catCard out-stock'
    }
    
    const toEdit = () => {        
        props.setEditModalShow(props.cat)        
    }

    return (
        <div className={`card cat${id} ${_pClass[status]}`} onClick={toEdit}>
            
            <div className='img-wrapper'>                              
                <div className="out-stock-text">已離職</div> 
                                
                <img src={imgUrl} height="260" className="card-img-top" alt={name} />
                
                <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                    {tags.length > 0 ? (
                        tags.map((t, index) => (
                            <span key={index} className="badge bg-warning text-dark" style={{ marginRight: '5px' }}>
                                {t}
                            </span>
                        ))
                    ) : null }                    
                </div>
            </div>  
                                              
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>                   
            </div>
        </div>
    );
}

export default Cat;
