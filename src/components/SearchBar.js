import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Form, Modal, Row, Col } from 'react-bootstrap'

function SearchBar(props) {

    const [searchText, setSearchText] = useState('');
    // const [modalShow, setModalShow] = React.useState(false);

    useEffect(() => {
    
    }, []);
    
    const handleChange = e => {
        const value = e.target.value;
        setSearchText(value)     
        props.searchCats(value)   
    }

    const clearSearchText = () =>{
        setSearchText('')
        props.searchCats('')
    }
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            props.searchCats(searchText)
        }
    };

    const _pClass = {
        admin: 'search-box col-10',
        user: 'search-box col-12 p-0'
    }

    return (
        <div className="row w-100 tool-box mb-4">        
            <div className={`${_pClass[props.role]}`}>            
                <div className="input-group">
                    <input 
                        type="text" 
                        className="form-control search-box" 
                        placeholder="搜尋貓貓名" 
                        aria-label="搜尋貓貓名" 
                        value={searchText}         
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="btn btn-outline-secondary" type="button" onClick={clearSearchText}>X</button>
                </div>
            </div>

            {(props.role === 'admin') ? (
            <button type='button' className="btn btn-sm add-box col-2" onClick={() => props.setAddModalShow(true)}>
                <i className="fa-solid fa-plus"></i>
                <span className='add-text'>新貓入職</span>            
            </button>
            ) : null}            
        </div>
    );
}

// function VerticallyCenteredModal(props) {
//     return (
//         <Modal
//             {...props}
//             size="lg"
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//         >
//         <Modal.Header closeButton>
//             <Modal.Title className="fs-5 text" id="contained-modal-title-vcenter">
//                 新貓入職
//             </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//             <Form>
//                 <Form.Group className="mb-3" controlId="formBasicEmail">
//                     <Form.Label>姓名</Form.Label>
//                     <Form.Control type="text" placeholder="輸入姓名" />
//                     <Form.Text className="text-muted">
//                     We'll never share your name with anyone else.
//                     </Form.Text>
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formBasicPassword">
//                     <Form.Label>相片</Form.Label>
//                     <Form.Control type="file" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formBasicEmail">
//                     <Form.Label>描述</Form.Label>
//                     <Form.Control type="text" placeholder="輸入描述" />                    
//                 </Form.Group>
//                 <Row>
//                     <Col xs={2}>
//                         <Form.Group className="mb-3" controlId="formBasicCheckbox">
//                             <Form.Check type="checkbox" label="愛滋" />
//                         </Form.Group>
//                     </Col>
//                     <Col xs={2}>
//                         <Form.Group className="mb-3" controlId="formBasicCheckbox1">
//                             <Form.Check type="checkbox" label="白血" />
//                         </Form.Group>
//                     </Col>                    
//                 </Row>
//             </Form>
//         </Modal.Body>
//         <Modal.Footer>
//             <Button type='button' className='btn btn-sm btn-success' onClick={props.onHide}>新增</Button>
//             <Button type='button' className='btn btn-sm btn-secondary' onClick={props.onHide}>取消</Button>
//         </Modal.Footer>
//       </Modal>
//     );
// }

export default SearchBar;
