import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Form, Modal, Row, Col } from 'react-bootstrap'
import Image from 'react-bootstrap/Image';
import DatePicker from "react-datepicker";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from "../common/axios";
import { toast } from 'react-toastify';

function EditCatModal(props) {
    
    const { show, onHide, cat, reloadData, role } = props;

    const [catInfo, setCatInfo] = useState(props.cat);
    const [inputsDisabled, setInputsDisabled] = useState(false);

    useEffect(() => {
        setCatInfo(cat);        
        if(role === 'user') {
            setInputsDisabled(true)
        } else {
            setInputsDisabled(false)
        }
    },[show, cat]);

    const onSave = () => {           
        //put為修改API
        try {
            axios.put(`cats/${catInfo.id}`, catInfo).then(res => {
                console.log(res)
                toast.success('編輯成功！')
                
                onHide() 
                reloadData()                
            })
        } catch (error) {
            toast.error('網路異常，請稍後再試');
        }        
    }

    const handleChange = e => {        
        const { name, value, type, checked } = e.target;
        
        if (type === 'checkbox' && name === 'status') {           //switch的type印出來是checkbox    
            setCatInfo((prevCatInfo) => ({
                ...prevCatInfo,
                status: checked ? 'unavailable' : 'available',
            }));                          
        } else if (type === 'checkbox') {
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

    // const [file, setFile] = useState(null);
    // const handleFileChange = (e) => {
    //     console.log(e.target.files[0])
    //     setFile(e.target.files[0]);
    // };

    // const handleUpload = async () => {
    //     const formData = new FormData();
    //     formData.append('file', file);
    
    //     try {
    //       const response = await axios.post('/upload', formData, {
    //         headers: {
    //           'Content-Type': 'multipart/form-data'
    //         }
    //       });
    //       console.log(response.data);
    //     } catch (error) {
    //       console.error('Error uploading file:', error);
    //     }
    //   };

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
                    詳細資料
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {catInfo ? (
                <Form>
                    <Row>                            
                        <Col sm="4" className='d-flex justify-content-center'>
                            <Row>
                                <Col sm="12">
                                    <Form.Check // prettier-ignore
                                        type="switch"
                                        id="status"
                                        label="已離職"  
                                        checked={(catInfo.status === "unavailable")}        
                                        name="status"
                                        onChange={handleChange}      
                                        disabled={inputsDisabled}                                                                
                                    />
                                </Col>
                                <Col sm="12">
                                    <Form.Group className="mb-0 d-flex align-items-center" controlId="formBasicPassword">                                    
                                        <Image src={catInfo.imgUrl} className='imageInModal' alt={""} />                  
                                    </Form.Group>
                                </Col>
                                {/* <Col sm="12">
                                    <Form.Group className="mb-0 d-flex align-items-center" controlId="formBasicPassword">                                                                            
                                        <input type="file" onChange={handleFileChange} />                                                               
                                    </Form.Group>
                                </Col> */}
                            </Row>                            
                        </Col>

                        <Col sm="8">
                            <Row>
                                <Col sm="6">
                                    <Form.Group className="mb-3" controlId="nameInput">
                                        <Form.Label>姓名</Form.Label>
                                        <Form.Control type="text" placeholder="輸入姓名" name="name" value={catInfo.name} onChange={handleChange} disabled={inputsDisabled} />
                                    </Form.Group>
                                </Col>
                                <Col sm="6">
                                    <Form.Group className="mb-3" controlId="idInput">
                                        <Form.Label>晶片號碼</Form.Label>
                                        <Form.Control type="text" placeholder="輸入晶片號碼" value={catInfo.id} disabled />
                                    </Form.Group>
                                </Col>

                                <Col sm="6">
                                    <Form.Group className="mb-3" controlId="birthdayInput">
                                        <Form.Label>出生日</Form.Label>
                                        <DatePicker className="datepickerInput" selected={catInfo.birthday} name="birthday" dateFormat="yyyy/MM/dd" onChange={(date) => handleChangeDate("birthday", date)} disabled={inputsDisabled} />
                                    </Form.Group>
                                    
                                </Col>
                                <Col sm="6">
                                    <Form.Group className="mb-3" controlId="idInput">
                                        <Form.Label>入職日</Form.Label>
                                        <DatePicker className="datepickerInput" selected={catInfo.startDate} dateFormat="yyyy/MM/dd" onChange={(date) => handleChangeDate("startDate", date)} disabled={inputsDisabled} />
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
                                                disabled={inputsDisabled}
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
                                                disabled={inputsDisabled}
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
                                                disabled={inputsDisabled}
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
                                                disabled={inputsDisabled}
                                            />                                                                                    
                                        </Col>                                                                                                                                                                                                                    
                                    </Row>                                    
                                </Col>

                                <Col sm="12">
                                    <Row>
                                        <Col sm="2">
                                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                <Form.Check type="checkbox" label="愛滋" value="愛滋" name="tags" onChange={handleChange} defaultChecked={(catInfo.tags.includes("愛滋"))} disabled={inputsDisabled} />
                                            </Form.Group> 
                                        </Col>
                                        <Col sm="2">
                                            <Form.Group className="mb-3" controlId="formBasicCheckbox1">
                                                <Form.Check type="checkbox" label="白血" value="白血" name="tags" onChange={handleChange} defaultChecked={(catInfo.tags.includes("白血"))} disabled={inputsDisabled} />
                                            </Form.Group>
                                        </Col>
                                        <Col sm="2">
                                            <Form.Group className="mb-3" controlId="formBasicCheckbox2">
                                                <Form.Check type="checkbox" label="結紮" value="結紮" name="tags" onChange={handleChange} defaultChecked={(catInfo.tags.includes("結紮"))} disabled={inputsDisabled} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col sm="12">
                                    <Form.Group className="mb-3" controlId="descriptionInput">
                                        <Form.Label>描述</Form.Label>
                                        <Form.Control type="text" placeholder="輸入描述" value={catInfo.description} name="description" onChange={handleChange} disabled={inputsDisabled} />                    
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
                                                disabled={inputsDisabled}
                                            />
                                        </FloatingLabel>                 
                                    </Form.Group>
                                </Col>
                            </Row>                            
                        </Col>                        
                    </Row>
                </Form>
                ) : null}                
            </Modal.Body>
            <Modal.Footer>
                {(role == 'admin') ? (
                    <Button type='button' className='btn btn-sm btn-success' onClick={onSave}>儲存</Button>
                ) : null}                
                <Button type='button' className='btn btn-sm btn-secondary' onClick={props.onHide}>關閉</Button>
            </Modal.Footer>
        </Modal>
  );
}

export default EditCatModal;
