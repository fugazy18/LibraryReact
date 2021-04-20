import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';


export class VisitorAdd extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'Library/AddMasterVisitor',
        {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                nik:event.target.NIK.value,
                nama:event.target.Nama.value,
                notelepon:event.target.NoTelepon.value,
                alamat:event.target.Alamat.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }


    render(){
        return(
            <div className="container">

                <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter" centered>
                
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Visitor
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="VisitorID">
                                    <Form.Label>NIK</Form.Label>
                                    <Form.Control type="text" name="NIK" required placeholder="NIK"/>   
                                    <Form.Label>Nama</Form.Label>
                                    <Form.Control type="text" name="Nama" required placeholder="Nama"/>     
                                    <Form.Label>NoTelepon</Form.Label>
                                    <Form.Control type="text" name="NoTelepon" required placeholder="NoTelepon"/>  
                                    <Form.Label>Alamat</Form.Label>
                                    <Form.Control type="text" name="Alamat" required placeholder="Alamat"/>                               
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Add Visitor
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
                    
                </Modal>
            </div>
        )
    }
}