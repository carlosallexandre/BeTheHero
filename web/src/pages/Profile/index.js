import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import logo from '../../assets/logo.svg';
import { Container, Header, IncidentList, Incident } from './styles';

export default function Profile() {
  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function loadIncidents() {
      const response = await api.get('profile', {
        headers: {
          Authorization: ongId,
        },
      });

      setIncidents(response.data);
    }

    loadIncidents();
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        },
      });

      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch (err) {
      toast.error('Erro ao deletar caso');
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <Container>
      <Header>
        <img src={logo} alt="Be the hero" />
        <span>Bem vinda, {ongName}</span>
        <Link className="button" to="/incident/new">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </Header>

      <h1>Casos cadastrados</h1>

      <IncidentList>
        {incidents.map((incident) => (
          <Incident key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(incident.value)}
            </p>

            <button
              type="button"
              onClick={() => handleDeleteIncident(incident.id)}
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </Incident>
        ))}
      </IncidentList>
    </Container>
  );
}
