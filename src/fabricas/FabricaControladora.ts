import { ControladoraCarrinhos } from '../carrinhos/ControladoraCarrinhos';
import { GestorCarrinhos } from '../carrinhos/GestorCarrinhos';
import { RepositorioCarrinhosEmHttp } from '../carrinhos/RepositorioCarrinhosEmHttp';
import { ControladoraUsuario } from '../usuarios/ControladoraUsuario';
import { GestorUsuario } from '../usuarios/GestorUsuario';
import { RepositorioUsuarioEmHttp } from '../usuarios/RepositorioUsuarioEmHttp';
import { VisaoUsuarioEmHtml } from '../usuarios/VisaoUsuarioEmHtml';

export class FabricaControladora {
    static controladoraUsuario(): ControladoraUsuario {
        const repositorio = new RepositorioUsuarioEmHttp();
        const gestor = new GestorUsuario(repositorio);
        const visao = new VisaoUsuarioEmHtml();
        const controladora = new ControladoraUsuario(gestor, visao);
        return controladora;
    }

    static controladoraCarrinhos(): ControladoraCarrinhos {
        const repositorio = new RepositorioCarrinhosEmHttp();
        const gestor = new GestorCarrinhos(repositorio);

        return new ControladoraCarrinhos(gestor);
    }
}
