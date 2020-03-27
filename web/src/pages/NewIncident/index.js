import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import logo from '../../assets/logo.svg';
import { Container, Content } from './styles';

export default function Register() {
  const history = useHistory();
  const ongId = localStorage.getItem('ongId');

  async function handleSubmit(data) {
    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        },
      });
      history.push('/profile');
    } catch (err) {
      toast.error('Erro ao cadastrar no caso.');
    }
  }

  return (
    <Container>
      <Content>
        <section>
          <img src={logo} alt="Be the hero" />

          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadament para encontrar um herói para resolver
            isso.
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>

        <Form onSubmit={handleSubmit}>
          <Input name="title" placeholder="Título do caso" />
          <Input multiline name="description" placeholder="Descrição" />
          <Input name="value" placeholder="Valor em reais" />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </Form>
      </Content>
    </Container>
  );
}
