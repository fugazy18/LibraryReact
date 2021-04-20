import logo from './logo.svg';
import './App.css';

import {Home} from './Home';
import {Masterbuku} from './Masterbuku';
import {Visitor} from './Visitor';
import {Peminjaman} from './Peminjaman';
import {Navigation} from './Navigation';


import {BrowserRouter, Route, Switch} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
   <div className="container">
     <h3 className="m-3 d-flex justify-content-center">
       Library App
     </h3>

     <Navigation/>

     <Switch>
       <Route path='/' component={Home} exact />
       <Route path='/masterbuku' component={Masterbuku}/>
       <Route path='/visitor' component={Visitor}/>
       <Route path='/peminjaman' component={Peminjaman}/>
     </Switch>

   </div>
   </BrowserRouter>
  );
}

export default App;
