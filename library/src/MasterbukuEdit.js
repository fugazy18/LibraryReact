import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';


export class MasterbukuEdit extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'Visitor/UpdateMasterbuku',
        {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                BukuID:event.target.BukuID.value,
                judulbuku:event.target.JudulBuku.value,
                kategori:event.target.Kategori.value,
                penerbit:event.target.Penerbit.value,
                penulis:event.target.Penulis.value,
                tahunterbit:event.target.TahunTerbit.value
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
                        Update Master Buku
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group>
                                    <Form.Label>BukuID</Form.Label>
                                    <Form.Control type="number" name="BukuID" required disabled defaultValue={this.props.BukuID} placeholder="BukuID"/>   
                                    <Form.Label>JudulBuku</Form.Label>
                                    <Form.Control type="text" name="JudulBuku" required defaultValue={this.props.JudulBuku} placeholder="JudulBuku"/>   
                                    <Form.Label>Kategori</Form.Label>
                                    <Form.Control type="text" name="Kategori" required defaultValue={this.props.Kategori} placeholder="Kategori"/>     
                                    <Form.Label>Penerbit</Form.Label>
                                    <Form.Control type="text" name="Penerbit" defaultValue={this.props.Penerbit} required placeholder="Penerbit"/>  
                                    <Form.Label>Penulis</Form.Label>
                                    <Form.Control type="text" name="Penulis" required defaultValue={this.props.Penulis} placeholder="Penulis"/>      
                                    <Form.Label>Tahun Terbit</Form.Label>
                                    <Form.Control type="number" name="TahunTerbit" required defaultValue={this.props.TahunTerbit} placeholder="TahunTerbit"/>                           
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Update Master Buku
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