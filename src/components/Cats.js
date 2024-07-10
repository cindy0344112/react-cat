import React, { useState, useEffect }  from 'react';
import Cat from './Cat';
import SearchBar from './SearchBar';
import axios from "../common/axios";

function Cats(props) {
    
    const [cats, setCats] = useState([]);
    const [filterCats, setFilterCats] = useState([]);

    //分舵的select有異動時取得cat陣列
    useEffect(() => {                
        fetchData();    
    }, [props.branch]);

    //若有新增編輯貓咪資料時重新取得cat陣列
    useEffect(() => {                
        fetchData();    
        props.setReloadCats(false)
    }, [props.reloadCats]);

    //https://www.tpisoftware.com/tpu/articleDetails/1327
    const fetchData = () => {                        
        axios.get(`/cats?branch=${props.branch}&_sort=status&_order=asc`)
        .then(response => {
            console.log(response.data)
            setCats(response.data);
            setFilterCats(response.data);
        })
    };

    const searchCats = text => {
        if (text === "") {
            setFilterCats(cats); // 当输入框为空时，显示所有数据
        } else {
            const filterCats = cats.filter(c => c.name.includes(text));
            setFilterCats(filterCats); // 设置过滤后的数据
        }
    }

    return (        
        <div>
            <SearchBar addModalShow={props.addModalShow} setAddModalShow={props.setAddModalShow} searchCats={searchCats} role={props.role}/>
            <div className='row'>
                {filterCats.map((c) => (
                    <div key={c.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                        <Cat cat={c} editModalShow={props.editModalShow} setEditModalShow={props.setEditModalShow} />
                    </div>
                ))}                                
            </div>
        </div>        
    );
}

export default Cats;
