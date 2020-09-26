import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';
import logoImage from '../../assets/logo.svg';
import { Error, Form, Repositories, Title } from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);

  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
      event.preventDefault();

      if (!newRepo) {
        setInputError('Digite o autor/nome do repositório');
        return;
      }

      try {
        const response = await api.get<Repository>(`repos/${newRepo}`);
        const repository = response.data;
        setRepositories([...repositories, repository]);
        setInputError('');
        setNewRepo('');
      } catch {
        setInputError('Repositório não encontrado')
      }
  }

  return (
    <>
      <img src={logoImage} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input value={newRepo} onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o autor/nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repo => (
          <a key={repo.full_name} href="teste">
            <img src={repo.owner.avatar_url} alt={repo.owner.login} />
            <div>
              <strong>{repo.full_name}</strong>
              <p>{repo.description}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  )
};

export default Dashboard;
