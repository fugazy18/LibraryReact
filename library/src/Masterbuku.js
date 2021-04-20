import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {MasterbukuAdd} from './MasterbukuAdd';
import {MasterbukuEdit} from './MasterbukuEdit';

export class Masterbuku extends Component{

    constructor(props){
        super(props);
        this.state={deps:[], addModalShow:false ,editModalShow:false}  
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'Library/GetMasterBuku')
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

   delBuku(BukuID)
   {
    if(window.confirm('Are you sure?')){
        fetch(process.env.REACT_APP_API+'Library/DeleteMasterbuku',
        {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                BukuID:BukuID
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
        const{deps,BukuID,JudulBuku,Kategori,Penerbit,Penulis,TahunTerbit}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
            <Table className="mt-4" striped bordered hover size="sm">
            <thead>
                    <tr>
                        <th>BukuID</th>
                        <th>JudulBuku</th>
                        <th>Kategori</th>
                        <th>Penerbit</th>
                        <th>Penulis</th>
                        <th>Tahun Terbit</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {deps.map(dep=>
                    <tr key={dep.BukuID}>
                        <td>{dep.BukuID}</td>
                        <td>{dep.JudulBuku}</td>
                        <td>{dep.Kategori}</td>
                        <td>{dep.Penerbit}</td>
                        <td>{dep.Penulis}</td>
                        <td>{dep.TahunTerbit}</td>
                        <td>
                            <ButtonToolbar>
                                <Button variant='info'
                                onClick={()=>this.setState({editModalShow:true,BukuID:dep.BukuID,JudulBuku:dep.JudulBuku,Kategori:dep.Kategori,Penerbit:dep.Penerbit,Penulis:dep.Penulis,TahunTerbit:dep.TahunTerbit})}>  
                                    Edit                                  
                                </Button>
                            
                                
                                <Button variant='danger'
                                onClick={()=>this.delBuku(dep.BukuID)}>  
                                    Delete                                  
                                </Button>

                                

                                <MasterbukuEdit show={this.state.editModalShow}
                                onHide={editModalClose}
                                BukuID={BukuID}
                                JudulBuku={JudulBuku}
                                Kategori={Kategori}
                                Penerbit={Penerbit}    
                                Penulis={Penulis}
                                TahunTerbit={TahunTerbit}
                                />

                            </ButtonToolbar>
                        </td>


                    </tr>)}
                </tbody>
            </Table>

            <ButtonToolbar>
                <Button variant='primary'
                onClick={()=>this.setState({addModalShow:true})}>
                    Add MasterBuku
                </Button>

                <MasterbukuAdd show={this.state.addModalShow}
                onHide={addModalClose}/>
            </ButtonToolbar>

            </div>
        )
    }
}