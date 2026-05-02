export class FormatadorMensagem {
  public static formatarMensagemErro(erros: string[]) {
    return erros.join('\n');
  }
}
