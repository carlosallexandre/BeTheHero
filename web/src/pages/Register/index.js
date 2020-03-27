import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import logo from '../../assets/logo.svg';
import { Container, Content } from './styles';

export default function Register() {
  const history = useHistory();

  async function handleRegister({ name, email, whatsapp, city, uf }) {
    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };

    try {
      const response = await api.post('ongs', data);
      toast(`Seu ID de acesso: ${response.data.id}`);
      history.push('/');
    } catch (err) {
      toast.error('Erro no cadastro. Tente novament');
    }
  }

  return (
    <Container>
      <Content>
        <section>
          <img src={logo} alt="Be the hero" />

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG.
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </section>

        <Form onSubmit={handleRegister}>
          <Input name="name" placeholder="Nome da ONG" />
          <Input name="email" type="email" placeholder="E-mail" />
          <Input name="whatsapp" placeholder="WhatsApp" />

          <div>
            <Input name="city" placeholder="Cidade" />
            <Input name="uf" placeholder="UF" style={{ width: 80 }} />
          </div>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </Form>
      </Content>
    </Container>
  );
}
