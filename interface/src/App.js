import React from 'react';
import { BrowserRouter, Route} from "react-router-dom";

import Form from './Form';

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={ Form } />
    </BrowserRouter>
  );
}

export default App;
