import React, {useState, useEffect} from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(result => setRepositories(result.data));
  },[]);

  async function handleAddRepository() {
    const response = await api.post('repositories', { title: 'test', url: 'http://test.com', techs: 'js' });

    setRepositories([ ...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const index = repositories.findIndex(repository => repository.id === id);

    const newRepo = [...repositories];
    newRepo.splice(index,1);

    setRepositories(newRepo);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
