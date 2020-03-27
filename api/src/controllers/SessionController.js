import connection from '../database';

class SessionController {
  async create(request, response) {
    const { id: ong_id } = request.body;

    const ong = await connection('ongs')
      .where('id', ong_id)
      .select('name')
      .first();

    if (!ong) {
      return response.status(400).json({ error: 'No ONG found with this id' });
    }

    return response.json(ong);
  }
}

export default new SessionController();
