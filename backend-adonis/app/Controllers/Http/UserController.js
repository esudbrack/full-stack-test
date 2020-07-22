"use strict";
const User = use("App/Models/User");

class UserController {
  // Recebe credenciais e retorna token JWT
  async authenticate({ request, response, auth }) {
    const { email, password } = request.all();

    try {
      const { token } = await auth.attempt(email, password);

      return response.status(200).json({ token });
    } catch (e) {
      if (e.code === "E_PASSWORD_MISMATCH" || e.code === "E_USER_NOT_FOUND") {
        return response
          .status(403)
          .send({ message: "Usuário não autorizado!" });
      } else {
        return response.status(500).send({ message: "Erro interno." });
      }
    }
  }

  async register({ request, response }) {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return response.status(400).send("Favor enviar todos os campos.");
    }

    try {
      const user = await User.create({ name, email, password });

      return response.status(201).send("Usuário criado com sucesso.");
    } catch (error) {
      return response.status(500).send(error);
    }
  }
}

module.exports = UserController;
