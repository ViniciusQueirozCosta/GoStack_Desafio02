import React, { useEffect, useState } from "react";

import api from './services/api.js'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect( () => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: 'Desafio ReactJS',
      owner: 'Vinícius'
    })

    setRepositories([...repositories,  response.data])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete('/repositories/'+id)
    
    if(response.status === 204)
      setRepositories(repositories.filter(repository => repository.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map( (repository) => 
        <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
