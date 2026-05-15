<?php declare(strict_types=1);

class UsuariosService
{
  public function __construct(
    private UsuariosRepository $usuariosRepository,
    private Sessao $sessao,
  ) {}

  public function login(string $identificador, string $senha): void
  {
    $logado = is_string($this->sessao->obter(ChaveSessao::USUARIO));

    if ($logado) {
      throw new DomainException(MensagemErro::USUARIOS_SERVICE_LOGADO);
    }

    $usuario = $this->usuariosRepository->buscarPorMatriculaOuEmail(
      $identificador,
    );

    if (!password_verify($senha, $usuario->senha)) {
      throw new DomainException(MensagemErro::USUARIOS_SERVICE_LOGIN);
    }

    $this->sessao->salvar(ChaveSessao::USUARIO, $usuario->id);
  }

  public function logout(): void
  {
    $logado = is_string($this->sessao->obter(ChaveSessao::USUARIO));

    if (!$logado) {
      throw new DomainException(MensagemErro::USUARIOS_SERVICE_NOT_FOUND);
    }

    $this->sessao->destruir();
  }

  public function buscarUsuarioLogado(): UsuarioParaExibir
  {
    $id = $this->sessao->obter(ChaveSessao::USUARIO);

    $logado = is_string($id);

    if (!$logado) {
      throw new DomainException(MensagemErro::USUARIOS_SERVICE_NOT_FOUND);
    }

    $usuario = $this->usuariosRepository->buscarPorId($id);

    return new UsuarioParaExibir($usuario);
  }
}
