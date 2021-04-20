import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';


export class MasterbukuAdd extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'Library/AddMasterBuku',
        {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                judulBuku:event.target.JudulBuku.value,
                kategori:event.target.Kategori.value,
                penerbit:event.target.Penerbit.value,
                penulis:event.target.Penulis.value,
                tahunTerbit:event.target.TahunTerbit.value
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
                        Add MasterBuku
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="BukuID">
                                    <Form.Label>Judul Buku</Form.Label>
                                    <Form.Control type="text" name="JudulBuku" required placeholder="JudulBuku"/>   
                                    <Form.Label>Kategori</Form.Label>
                                    <Form.Control type="text" name="Kategori" required placeholder="Kategori"/>   
                                    <Form.Label>Penerbit</Form.Label>
                                    <Form.Control type="text" name="Penerbit" required placeholder="Penerbit"/>     
                                    <Form.Label>Penulis</Form.Label>
                                    <Form.Control type="text" name="Penulis" required placeholder="Penulis"/>  
                                    <Form.Label>Tahun Terbit</Form.Label>
                                    <Form.Control type="text" name="TahunTerbit" required placeholder="TahunTerbit"/>                               
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Add MasterBuku
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