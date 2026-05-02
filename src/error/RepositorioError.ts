export class RepositorioError extends Error {
  public constructor(mensagem: string) {
    super(mensagem);

    this.name = 'RepositorioError';
  }
}
