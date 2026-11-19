export class CurriculoStorage {
    static salvarDados(dados) {
        localStorage.setItem('curriculo_rascunho', JSON.stringify(dados));
    }

    static carregarDados() {
        const salvo = localStorage.getItem('curriculo_rascunho');
        return salvo ? JSON.parse(salvo) : null;
    }

    static limparDados() {
        localStorage.removeItem('curriculo_rascunho');
    }
}


