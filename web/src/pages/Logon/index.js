import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';
import banner from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';
import { Container } from './styles';

export default function Logon() {
  const history = useHistory();

  async function handleSubmit({ id }) {
    try {
      const response = await api.post('session', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
    } catch (err) {
      toast.error('Falha no Login. Verifique seu ID');
    }
  }

  return (
    <Container>
      <section>
        <img src={logo} alt="Be the hero" />

        <Form onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>

          <Input name="id" placeholder="Sua ID" />

          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </Form>
      </section>

      <img src={banner} alt="Heroes" />
    </Container>
  );
}
