import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../src/Routes/index';
import PersonForm from '../src/components/PersonForm';
import PersonTable from '../src/components/PersonTable';
import '../src/index.css';

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <div>
        <h1>Formulaire d'ajout de personne:</h1>
        <PersonForm />
        <h1>Liste des personnes:</h1>
        <PersonTable />
      </div>
    </Provider>
  );
}

export default App;



