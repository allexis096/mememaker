import React, { useState, useEffect, FormEvent } from 'react';
import qs from 'qs';

import { Wrapper, Card, Templates, Form, Button } from './styles';
import logo from '../../assets/logo.svg';

import api from '../../config/api';

interface TemplateProps {
  id: string;
  name: string;
  url: string;
}

interface SelectedTemplateProps {
  id?: string;
  box_count?: string;
  template_id?: string;
}

const Home: React.FC = () => {
  const [templates, setTemplates] = useState<TemplateProps[]>([]);
  const [
    selectedTemplate,
    setSelectedTemplate,
  ] = useState<SelectedTemplateProps | null>(null);
  const [boxes, setBoxes] = useState<string[]>([]);
  const [generatedMeme, setGeneratedMeme] = useState<string>('');

  useEffect(() => {
    (async () => {
      const response = await api.get('get_memes');
      const {
        data: { memes },
      } = response.data;

      setTemplates(memes);
    })();
  }, []);

  const handleInputChange = (index: number) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValues = boxes;
    newValues[index] = e.target.value;
    setBoxes(newValues);
  };

  function handleSelectTemplate(template: object): void {
    setSelectedTemplate(template);
    setBoxes([]);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const params = qs.stringify({
      template_id: selectedTemplate?.id,
      username: 'allex1996',
      password: 'allex1996',
      boxes: boxes.map(text => ({ text })),
    });

    const {
      data: {
        data: { url },
      },
    } = await api.get(`caption_image?${params}`);

    setGeneratedMeme(url);
  }

  function handleReset(): void {
    setSelectedTemplate(null);
    setBoxes([]);
    setGeneratedMeme('');
  }

  return (
    <Wrapper>
      <img src={logo} alt="Mememaker" />

      <Card>
        {generatedMeme && (
          <>
            <img src={generatedMeme} alt="Generated Meme" />
            <Button type="submit" onClick={handleReset}>
              Criar outro meme
            </Button>
          </>
        )}
        {!generatedMeme && (
          <>
            <h2>Selecione um template</h2>
            <Templates>
              {templates.map(template => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => handleSelectTemplate(template)}
                  className={
                    template.id === selectedTemplate?.id ? 'selected' : ''
                  }
                >
                  <img src={template.url} alt={template.name} />
                </button>
              ))}
            </Templates>

            {selectedTemplate && (
              <>
                <h2>Textos</h2>
                <Form onSubmit={handleSubmit}>
                  {new Array(selectedTemplate.box_count)
                    .fill('')
                    .map((_, index) => (
                      <input
                        key={String(Math.random())}
                        placeholder={`Text #${index + 1}`}
                        onChange={handleInputChange(index)}
                      />
                    ))}

                  <Button type="submit">MakeMyMeme!</Button>
                </Form>
              </>
            )}
          </>
        )}
      </Card>
    </Wrapper>
  );
};

export default Home;
