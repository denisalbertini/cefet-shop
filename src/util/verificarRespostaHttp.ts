import { TipoErroRepositorio } from '../enum/TipoErroRepositorio';
import { RepositorioError } from '../error/RepositorioError';

export async function verificarRespostaHttp(res: Response): Promise<void> {
  if (res.ok) {
    return;
  }

  let tipoErro: TipoErroRepositorio;

  switch (res.status) {
    case 400:
      tipoErro = TipoErroRepositorio.DadosInvalidos;
      break;
    case 401:
      tipoErro = TipoErroRepositorio.NaoAutorizado;
      break;
    case 404:
      tipoErro = TipoErroRepositorio.NaoEncontrado;
      break;
    default:
      tipoErro = TipoErroRepositorio.Inesperado;
  }

  const dados = await res.json();

  const erros = dados.erros;

  throw new RepositorioError(tipoErro, erros);
}
