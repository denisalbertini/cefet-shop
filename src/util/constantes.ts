export const API = { HOST: 'http://localhost:3000' } as const;

export const MENSAGEM_ERRO = {
    REPOSITORIO: {
        NOT_FOUND: 'O repositório não encontrou o recurso.',
        INTERNAL_SERVER_ERROR: 'O repositório lançou um erro inesperado.',
    },

    ITEM_PARA_LISTAR: {
        QUANTIDADE: 'O atributo quantidade de ItemParaListar deve ser do tipo number.',
        SUBTOTAL: 'O atributo subTotal de ItemParaListar deve ser do tipo string.',
        PRODUTO_ID: 'O atributo produtoId de ItemParaListar deve ser do tipo string.',
        PRODUTO_FOTO: 'O atributo produtoFoto de ItemParaListar deve ser do tipo string.',
        PRODUTO_NOME: 'O atributo produtoNome de ItemParaListar deve ser do tipo string.',
        PRODUTO_ESTOQUE: 'O atributo produtoEstoque de ItemParaListar deve ser do tipo number.',
    },

    CARRINHO_PARA_EXIBIR: {
        TOTAL: 'O atributo total de CarrinhoParaExibir deve ser do tipo string.',
    },

    REPOSITORIO_CARRINHOS: { ITENS: 'O carrinho não retornou um array de itens.' },
} as const;
