import React from 'react';
import { useRouteMatch } from 'react-router-dom';

interface RepoParams {
  repo: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepoParams>();
  return <h1>Repositório: {params.repo}</h1>;
};

export default Repository;
