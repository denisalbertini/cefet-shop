import { TipoErroRepositorio } from '../enum/TipoErroRepositorio';

export class RepositorioError extends Error {
  public constructor(
    public readonly tipo: TipoErroRepositorio,
    public readonly erros: string[],
  ) {
    super();

    this.name = 'RepositorioError';
  }
}
