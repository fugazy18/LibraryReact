import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';


export class PeminjamanEdit extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'Library/UpdateTrxPinjam',
        {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                pinjamID:event.target.PinjamID.value,
                tanggalPengembalian:event.target.TanggalPengembalian.value,
                batasPinjaman:event.target.BatasPinjaman.value,
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
                        Update Pinjaman
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Pinjam ID</Form.Label>
                                    <Form.Control type="number" name="PinjamID" required disabled defaultValue={this.props.PinjamID} placeholder="PinjamID"/>   
                                    <Form.Label>Visitor ID</Form.Label>
                                    <Form.Control type="number" name="VisitorID" required disabled defaultValue={this.props.VisitorID} placeholder="VisitorID"/>     
                                    <Form.Label>Buku ID</Form.Label>
                                    <Form.Control type="number" name="BukuID"  required disabled defaultValue={this.props.BukuID}  placeholder="BukuID"/>   
                                    <Form.Label>Tanggal Pinjam</Form.Label>
                                    <Form.Control type="text" name="TanggalPinjam" required disabled defaultValue={this.props.TanggalPinjam}  placeholder="TanggalPinjam"/>     
                                    <Form.Label>Tanggal Pengembalian</Form.Label>
                                    <Form.Control type="date" name="TanggalPengembalian" required  placeholder="TanggalPengembalian"/>  
                                    <Form.Label>Batas Pinjaman</Form.Label>
                                    <Form.Control type="text" name="BatasPinjaman" required disabled defaultValue={this.props.BatasPinjaman}  placeholder="BatasPinjaman"/>                              
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Update Pinjaman
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