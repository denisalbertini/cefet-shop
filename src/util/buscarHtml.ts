export async function buscarHtml(caminho: string): Promise<string> {
  const res = await fetch(caminho);

  if (!res.ok) {
    console.error(`Erro ao buscar a página ${caminho}`);
  }

  const html = await res.text();

  return html;
}
