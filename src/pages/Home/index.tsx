import React from 'react';

import { Wrapper, Card, Templates } from './styles';
import logo from '../../assets/logo.svg';

const Home: React.FC = () => {
  return (
    <Wrapper>
      <img src={logo} alt="Mememaker" />

      <Card>
        <h2>Selecione um template</h2>
        <Templates>
          <button type="button">
            <img src="" alt="Template 1" />
          </button>
          <button type="button">
            <img src="" alt="Template 1" />
          </button>
          <button type="button">
            <img src="" alt="Template 1" />
          </button>
          <button type="button">
            <img src="" alt="Template 1" />
          </button>
        </Templates>
      </Card>
    </Wrapper>
  );
};

export default Home;
