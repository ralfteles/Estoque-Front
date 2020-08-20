export class UsuarioModel {
  nome: String;
  login: String;
  senha: String;
  token: String;

  constructor(nome: String, login: String, senha: String, token: String) {
    this.login = login;
    this.nome = nome;
    this.senha = senha;
    this.token = token;
  }
}
