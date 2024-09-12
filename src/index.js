import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import model from '../src/model/model';
import connectToFirebase from "../src/model/firebaseModel";

import { observable, configure, reaction } from 'mobx';
configure({ enforceActions: "never" });
const reactiveModel = observable(model);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App model={reactiveModel}/>
  </React.StrictMode>
);