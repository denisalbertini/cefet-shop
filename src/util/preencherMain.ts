const main = document.querySelector('main')!;

export async function preencherMain(caminho: string): Promise<void> {
  const res = await fetch(caminho);

  if (!res.ok) {
    console.error(`Erro ao buscar a página ${caminho}`);
  }

  const html = await res.text();

  main.innerHTML = html;
}
