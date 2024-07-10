import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Form, Modal, Row, Col } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Image from 'react-bootstrap/Image';
import DatePicker from "react-datepicker";
import axios from "../common/axios";
import { toast } from 'react-toastify';

import "react-datepicker/dist/react-datepicker.css";

function AddCatModal(props) {

    const [catInfo, setCatInfo] = useState({
        "id": null,
        "name": "",
        "startDate": new Date(),
        "birthday": new Date(),
        "gender": "",
        "imgUrl": "/img/cat12.jpeg",
        "description": "",
        "tags": [],
        "medicalRecord": "",
        "status": "available",
        "branch": ""        
    });
    
    const handleChange = e => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setCatInfo((prevCatInfo) => {
                if(checked) {
                    return {
                        ...prevCatInfo,
                        tags: [...prevCatInfo.tags, value]
                    };
                } else {
                    return {
                        ...prevCatInfo,
                        tags: prevCatInfo.tags.filter(tag => tag !== value)
                    };
                }
            });            
        } else {            
            setCatInfo((prevCatInfo) => ({
                ...prevCatInfo,
                [name]: value,
            }));
        }        
    }

    const handleChangeDate = (name, date) => {        
        setCatInfo((prevCatInfo) => ({
            ...prevCatInfo,
            [name]: date,
        }));
    }

    const onSave = () => {                   
        try {
            axios.post(`cats`, catInfo).then(res => {
                console.log(res)
                toast.success('新增成功！')
                
                props.onHide()
                props.reloadData()
            })
        } catch (error) {
            toast.error('網路異常，請稍後再試');
        }        
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show} onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title className="fs-5 text" id="contained-modal-title-vcenter">
                    新貓入職
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>                            
                        <Col sm="4" className='d-flex justify-content-center'>
                            <Row>
                                <Col sm="12">
                                    <Form.Check // prettier-ignore
                                        type="switch"
                                        id="status"
                                        label="已離職"
                                        disabled
                                    />
                                </Col>
                                <Col sm="12">
                                    <Form.Group className="mb-0 d-flex align-items-center" controlId="formBasicPassword">                                    
                                        <Image src={'./img/imageDefault.jpg'} className='imageInModal' alt={""} />                                    
                                    </Form.Group>
                                </Col>
                            </Row>                            
                        </Col>

                        <Col sm="8">
                            <Row>
                                <Col sm="6">
                                    <Form.Group className="mb-3" controlId="nameInput">
                                        <Form.Label>姓名</Form.Label>
                                        <Form.Control type="text" placeholder="輸入姓名" name="name" value={catInfo.name} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                                <Col sm="6">
                                    <Form.Group className="mb-3" controlId="idInput">
                                        <Form.Label>晶片號碼</Form.Label>
                                        <Form.Control type="text" placeholder="輸入晶片號碼" name="id" value={catInfo.id} onChange={handleChange} />
                                    </Form.Group>
                                </Col>

                                <Col sm="6">
                                    <Form.Group className="mb-3" controlId="birthdayInput">
                                        <Form.Label>出生日</Form.Label>
                                        <DatePicker className="datepickerInput" selected={catInfo.birthday} name="birthday" dateFormat="yyyy/MM/dd" onChange={(date) => handleChangeDate("birthday", date)} />                                        
                                    </Form.Group>
                                    
                                </Col>
                                <Col sm="6">
                                    <Form.Group className="mb-3" controlId="idInput">
                                        <Form.Label>入職日</Form.Label>
                                        <DatePicker className="datepickerInput" selected={catInfo.startDate} name="startDate" dateFormat="yyyy/MM/dd" onChange={(date) => handleChangeDate("startDate", date)} />                                                                                
                                    </Form.Group>
                                </Col>

                                <Col sm="12" className='mb-3'>
                                    <Row>
                                        <Col sm="4">
                                            <Form.Check
                                                inline                                                
                                                label="公"
                                                name="gender"
                                                type="radio"
                                                id={"maleRadio"}
                                                checked={(catInfo.gender === "male")}
                                                value="male"
                                                onChange={handleChange}
                                            />
                                            <Form.Check
                                                inline                                                
                                                label="母"
                                                name="gender"
                                                type="radio"
                                                id={"femaleRadio"}
                                                checked={(catInfo.gender === "female")}
                                                value="female"
                                                onChange={handleChange}
                                            />                                                                                    
                                        </Col>
                                        <Col sm="4">
                                            <Form.Check
                                                inline                                                
                                                label="桃園"
                                                name="branch"
                                                type="radio"
                                                id={"taoyuanRadio"}
                                                checked={(catInfo.branch === "taoyuan")}
                                                value="taoyuan"
                                                onChange={handleChange}
                                            />
                                            <Form.Check
                                                inline                                                
                                                label="林口"
                                                name="branch"
                                                type="radio"
                                                id={"linkoRadio"}
                                                checked={(catInfo.branch === "linko")}
                                                value="linko"
                                                onChange={handleChange}
                                            />                                                                                    
                                        </Col>                                                                                                                                                                                                                  
                                    </Row>
                                </Col>

                                <Col sm="12">
                                    <Row>
                                        <Col sm="2">
                                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                <Form.Check type="checkbox" label="愛滋" value="愛滋" name="tags" defaultChecked={false} onChange={handleChange} />
                                            </Form.Group> 
                                        </Col>
                                        <Col sm="2">
                                            <Form.Group className="mb-3" controlId="formBasicCheckbox1">
                                                <Form.Check type="checkbox" label="白血" value="白血" name="tags" defaultChecked={false} onChange={handleChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col sm="2">
                                            <Form.Group className="mb-3" controlId="formBasicCheckbox2">
                                                <Form.Check type="checkbox" label="結紮" value="結紮" name="tags" defaultChecked={false} onChange={handleChange} />
                                            </Form.Group>
                                        </Col>  
                                    </Row>
                                </Col>

                                <Col sm="12">
                                    <Form.Group className="mb-3" controlId="descriptionInput">
                                        <Form.Label>描述</Form.Label>
                                        <Form.Control type="text" placeholder="輸入描述" value={catInfo.description} name="description" onChange={handleChange} />                    
                                    </Form.Group>
                                </Col>

                                <Col sm="12">
                                    <Form.Group className="mb-3" controlId="medicalRecordInput">
                                        <Form.Label>醫療紀錄</Form.Label>
                                        <FloatingLabel controlId="floatingTextarea2" label="Comments">
                                            <Form.Control
                                                as="textarea"
                                                placeholder="Leave a comment here"
                                                style={{ height: '100px' }}
                                                value={catInfo.medicalRecord}
                                                name="medicalRecord"
                                                onChange={handleChange}
                                            />
                                        </FloatingLabel>                 
                                    </Form.Group>
                                </Col>
                            </Row>                            
                        </Col>                        
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type='button' className='btn btn-sm btn-success' onClick={onSave}>新增</Button>
                <Button type='button' className='btn btn-sm btn-secondary' onClick={props.onHide}>取消</Button>
            </Modal.Footer>
        </Modal>
  );
}

export default AddCatModal;
