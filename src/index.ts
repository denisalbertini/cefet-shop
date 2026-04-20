import page from 'page';
import { FabricaControladora } from './fabricas/FabricaControladora';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// document.addEventListener('click', (e) => {
//     const alvo = e.target as HTMLElement;
//     const link = alvo.closest('a[data-link]') as HTMLAnchorElement | null;

//     if (!link) return;

//     if (e.ctrlKey || e.metaKey || e.button === 1) return;

//     e.preventDefault();
//     page(link.getAttribute('href')!);
// });

// page('/usuarios', () => {
//     FabricaControladora.controladoraUsuario().listarUsuarios();
// });

// page('/usuarios/:id', (ctx) => {
//     const id = Number(ctx.params.id);
//     FabricaControladora.controladoraUsuario().verDetalhesUsuario(id);
// });

const controladoraCarrinhos = FabricaControladora.controladoraCarrinhos();

page('/carrinho', async () => {
    const res = await fetch('/pages/carrinho.html');

    if (res.ok) {
        const html = await res.text();
        document.querySelector('#app')!.innerHTML = html;
    }

    controladoraCarrinhos.visaoCarrinhos.iniciar();
});

page();
