import { CurriculoModel } from '../model/curriculoModel.js';
import { CurriculoView } from '../view/curriculoView.js';
import { CurriculoStorage } from '../utils/storage.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('curriculoForm');
    if (!form) return;

    // 1. Restaurar dados salvos automaticamente ao abrir a página
    const dadosSalvos = CurriculoStorage.carregarDados();
    if (dadosSalvos) {
        Object.keys(dadosSalvos).forEach(key => {
            const campo = document.getElementById(key);
            if (campo) {
                if (campo.type === 'radio') {
                    const radio = document.querySelector(`input[name="${key}"][value="${dadosSalvos[key]}"]`);
                    if (radio) radio.checked = true;
                } else {
                    campo.value = dadosSalvos[key];
                }
            }
        });
    }

    // 2. Salvar automaticamente sempre que o usuário digitar ou alterar qualquer campo
    form.addEventListener('input', () => {
        const dadosAtuais = CurriculoView.obterValoresFormulario();
        CurriculoStorage.salvarDados(dadosAtuais);
    });

    form.addEventListener('change', () => {
        const dadosAtuais = CurriculoView.obterValoresFormulario();
        CurriculoStorage.salvarDados(dadosAtuais);
    });

    // 3. Gerar PDF ao submeter o formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const dados = CurriculoView.obterValoresFormulario();

        if (CurriculoView.validarCampos(dados)) {
            const curriculo = new CurriculoModel(dados);
            curriculo.gerarPDF();
            
            // Opcional: Se quiser limpar os dados salvos após gerar o PDF com sucesso, 
            // basta descomentar a linha abaixo:
            // CurriculoStorage.limparDados();
        }
    });
});