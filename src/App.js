import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import AppLayout from "./components/AppLayout";

const App = () => (
  <BrowserRouter>
    <Route path='/'>
      <AppLayout />
    </Route>
  </BrowserRouter>
);

export default App;
