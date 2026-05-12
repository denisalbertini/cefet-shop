import { RepositorioError } from '../error/RepositorioError';

export async function verificarRespostaRequisicao(
  res: Response,
): Promise<void> {
  if (res.ok) {
    return;
  }

  const mensagem = await res.text();
  const status = res.status;

  throw new RepositorioError(mensagem, status);
}
