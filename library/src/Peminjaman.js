import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {PeminjamanAdd} from './PeminjamanAdd';
import {PeminjamanEdit} from './PeminjamanEdit';

export class Peminjaman extends Component{

    constructor(props){
        super(props);
        this.state={deps:[], addModalShow:false ,editModalShow:false}  
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'Library/GetTrxPinjam')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        })
    }

   componentDidUpdate()
   {
       this.refreshList();
   }

   componentDidMount()
   {
       this.refreshList();
   }

   delTrxPinjam(PinjamID)
   {
    if(window.confirm('Are you sure?')){
        fetch(process.env.REACT_APP_API+'Library/DeleteTrxPinjam',
        {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                PinjamID:PinjamID
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
    }

    render(){
        const{deps,PinjamID,VisitorID,BukuID,Nama,JudulBuku,TanggalPinjam,TanggalPengembalian,BatasPinjaman}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
            <Table className="mt-4" striped bordered hover size="sm">
            <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Judul Buku</th>
                        <th>Tanggal Pinjam</th>
                        <th>Tanggal Pengembalian</th>
                        <th>Batas Pinjaman</th>
                        <th>Denda</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {deps.map(dep=>
                    <tr key={dep.PinjamID}>
                        <td>{dep.Nama}</td>
                        <td>{dep.JudulBuku}</td>
                        <td>{dep.TanggalPinjam}</td>
                        <td>{dep.TanggalPengembalian}</td>
                        <td>{dep.BatasPinjaman}</td>
                        <td>{dep.Denda}</td>
                        <td>
                            <ButtonToolbar>
                                <Button variant='info'
                                onClick={()=>this.setState({editModalShow:true,PinjamID:dep.PinjamID,VisitorID:dep.VisitorID,BukuID:dep.BukuID,TanggalPinjam:dep.TanggalPinjam,BatasPinjaman:dep.BatasPinjaman})}>  
                                    Pengembalian                                  
                                </Button>
                            
                                
                                <Button variant='danger'
                                onClick={()=>this.delTrxPinjam(dep.PinjamID)}>  
                                    Delete                                  
                                </Button>

                                

                                <PeminjamanEdit show={this.state.editModalShow}
                                onHide={editModalClose}
                                PinjamID={PinjamID}
                                VisitorID={VisitorID}
                                BukuID={BukuID}
                                TanggalPinjam={TanggalPinjam}
                                BatasPinjaman={BatasPinjaman}    
                                />

                            </ButtonToolbar>
                        </td>


                    </tr>)}
                </tbody>
            </Table>

            <ButtonToolbar>
                <Button variant='primary'
                onClick={()=>this.setState({addModalShow:true})}>
                    Add Peminjaman
                </Button>

                <PeminjamanAdd show={this.state.addModalShow}
                onHide={addModalClose}/>
            </ButtonToolbar>

            </div>
        )
    }
}