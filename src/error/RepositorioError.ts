export class RepositorioError extends Error {
  public readonly status: number;

  public constructor(mensagem: string, status: number) {
    super(mensagem);

    this.name = 'RepositorioError';
    this.status = status;
  }
}
