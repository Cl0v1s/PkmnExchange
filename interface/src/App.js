import React from 'react';
import { BrowserRouter, Route} from "react-router-dom";

import './../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';
import './../node_modules/bootstrap/dist/css/bootstrap-reboot.min.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';


import Exchanger from './Exchanger';

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={ Exchanger } />
    </BrowserRouter>
  );
}

export default App;
