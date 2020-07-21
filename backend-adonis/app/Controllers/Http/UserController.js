"use strict";
const User = use("App/Models/User");

class UserController {
  async register({ request, response }) {
    const { username, email, password } = request.body;

    if (!username || !email || !password) {
      return response.status(400).send("Favor enviar todos os campos.");
    }

    try {
      const user = await User.create({ username, email, password });

      return response.status(201).send("Usuário criado com sucesso.");
    } catch (error) {
      return response.status(500).send(error);
    }
  }
}

module.exports = UserController;
