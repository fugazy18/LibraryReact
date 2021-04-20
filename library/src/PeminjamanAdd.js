import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';


export class PeminjamanAdd extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'Library/AddTrxPinjam',
        {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                // nama:event.target.Nama.value,
                visitorID:event.target.VisitorID.value,
                bukuID:event.target.BukuID.value,
                tanggalpinjam:event.target.TanggalPinjam.value,
                bataspinjaman:event.target.BatasPinjaman.value
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
                        Add Peminjaman
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="PinjamID">
                                    <Form.Label>Visitor ID</Form.Label>
                                    <Form.Control type="number" name="VisitorID" required placeholder="VisitorID"/>      
                                    <Form.Label>Judul Buku</Form.Label>
                                    <Form.Control type="number" name="BukuID" required placeholder="BukuID"/>   
                                    <Form.Label>Tanggal Pinjam</Form.Label>
                                    <Form.Control type="date" name="TanggalPinjam" required placeholder="TanggalPinjam"/>     
                                    {/* <Form.Label>Tanggal Pengembalian</Form.Label>
                                    <Form.Control type="date" name="TanggalPengembalian" required placeholder="TanggalPengembalian"/>   */}
                                    <Form.Label>Batas Pinjaman</Form.Label>
                                    <Form.Control type="date" name="BatasPinjaman" required placeholder="BatasPinjaman"/>                               
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