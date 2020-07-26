import React from 'react';

import { Wrapper, Card, Templates, Form, Button } from './styles';
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

        <h2>Textos</h2>
        <Form>
          <input placeholder="text #1" />
          <input placeholder="text #1" />
          <input placeholder="text #1" />

          <Button type="submit">MakeMyMeme!</Button>
        </Form>
      </Card>
    </Wrapper>
  );
};

export default Home;
