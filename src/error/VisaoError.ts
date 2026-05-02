export class VisaoError {
    exibirErro(erro: Error) {
        alert(erro.message);

        console.error(erro);
    }
}
