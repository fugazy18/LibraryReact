import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {VisitorAdd} from './VisitorAdd';
import {VisitorEdit} from './VisitorEdit';

export class Visitor extends Component{

    constructor(props){
        super(props);
        this.state={deps:[], addModalShow:false ,editModalShow:false}  
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'Library/GetVisitor')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
            
        })
    }

    async componentDidUpdate()
    {
        this.refreshList();
    }

    async componentDidMount()
    {
        await this.refreshList();
    }

    delVisit(VisitorID){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'Library/DeleteMasterVisitor',
            {
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    VisitorID:VisitorID
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
        const{deps,VisitorID,NIK,Nama,NoTelepon,Alamat}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
            <Table className="mt-4" striped bordered hover size="sm">
            <thead>
                    <tr>
                        <th>VisitorID</th>
                        <th>NIK</th>
                        <th>Nama</th>
                        <th>NoTelepon</th>
                        <th>Alamat</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {deps.map(dep=>
                    <tr key={dep.VisitorID}>
                        <td>{dep.VisitorID}</td>
                        <td>{dep.NIK}</td>
                        <td>{dep.Nama}</td>
                        <td>{dep.NoTelepon}</td>
                        <td>{dep.Alamat}</td>
                        <td>
                            <ButtonToolbar>
                                <Button variant='info'
                                onClick={()=>this.setState({editModalShow:true,VisitorID:dep.VisitorID,NIK:dep.NIK,Nama:dep.Nama,NoTelepon:dep.NoTelepon,Alamat:dep.Alamat})}>  
                                    Edit                                  
                                </Button>
                            
                                
                                <Button variant='danger'
                                onClick={()=>this.delVisit(dep.VisitorID)}>  
                                    Delete                                  
                                </Button>

                                

                                <VisitorEdit show={this.state.editModalShow}
                                onHide={editModalClose}
                                VisitorID={VisitorID}
                                NIK={NIK}
                                Nama={Nama}
                                NoTelepon={NoTelepon}    
                                Alamat={Alamat}
                                />

                            </ButtonToolbar>
                        </td>


                    </tr>)}
                </tbody>
            </Table>

            <ButtonToolbar>
                <Button variant='primary'
                onClick={()=>this.setState({addModalShow:true})}>
                    Add Visitor
                </Button>

                <VisitorAdd show={this.state.addModalShow}
                onHide={addModalClose}/>
            </ButtonToolbar>

            </div>
        )
    }
}