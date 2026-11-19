export class CurriculoView {
    static obterValoresFormulario() {
        const modeloSelecionado = document.querySelector('input[name="modelo"]:checked');
        return {
            nome: document.getElementById('nome').value.trim(),
            contato: document.getElementById('contato').value.trim(),
            email: document.getElementById('email').value.trim(),
            nacionalidade: document.getElementById('nacionalidade').value.trim(),
            idade: document.getElementById('idade').value.trim(),
            cidade: document.getElementById('cidade').value.trim(),
            bairro: document.getElementById('bairro').value.trim(),
            cnh: document.getElementById('cnh').value,
            area: document.getElementById('area').value.trim(),
            cargo: document.getElementById('cargo').value.trim(),
            objetivo: document.getElementById('objetivo').value.trim(),
            perfil: document.getElementById('perfil').value.trim(),
            qualificacoes: document.getElementById('qualificacoes').value.trim(),
            formacao: document.getElementById('formacao').value.trim(),
            experiencia: document.getElementById('experiencia').value.trim(),
            modelo: modeloSelecionado ? modeloSelecionado.value : "1"
        };
    }

    static validarCampos(dados) {
        if (!dados.nome || !dados.cargo || !dados.contato || !dados.email) {
            alert("Por favor, preencha os campos obrigatórios (Nome, Contato, E-mail e Cargo Pretendido)!");
            return false;
        }
        return true;
    }
}