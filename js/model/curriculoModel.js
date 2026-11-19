export class CurriculoModel {
    constructor(dados) {
        this.nome = dados.nome;
        this.contato = dados.contato;
        this.email = dados.email;
        this.nacionalidade = dados.nacionalidade;
        this.idade = dados.idade;
        this.cidade = dados.cidade;
        this.bairro = dados.bairro;
        this.cnh = dados.cnh;
        this.area = dados.area;
        this.cargo = dados.cargo;
        this.objetivo = dados.objetivo;
        this.perfil = dados.perfil;
        this.qualificacoes = dados.qualificacoes;
        this.formacao = dados.formacao;
        this.experiencia = dados.experiencia;
        this.modelo = dados.modelo || "1";
    }

    gerarPDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        if (this.modelo === "1") {
            this.gerarModelo1(doc);
        } else if (this.modelo === "2") {
            this.gerarModelo2(doc);
        } else {
            this.gerarModelo3(doc);
        }

        doc.save(`Curriculo_${this.nome.replace(/\s+/g, '_')}.pdf`);
    }

    // -------------------------------------------------------------------------
    // MODELO 1: Moderno Lateral (Com barra lateral azul à esquerda)
    // -------------------------------------------------------------------------
    gerarModelo1(doc) {
        // Barra lateral esquerda azul preenchendo toda a altura da página
        doc.setFillColor(37, 99, 235);
        doc.rect(0, 0, 65, 297, "F");

        // Nome principal na área direita
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(15);
        doc.setTextColor(30, 41, 59);
        doc.text(this.nome, 70, 16);

        doc.setFont("Helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        let subtitulo = `Cargo: ${this.cargo}`;
        if (this.area) subtitulo += ` | Área: ${this.area}`;
        doc.text(subtitulo, 70, 23);

        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.4);
        doc.line(70, 27, 200, 27);

        // Bloco Lateral: Contato e Dados Pessoais (texto em branco)
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(9.5);
        doc.setTextColor(255, 255, 255);
        doc.text("CONTATO & DADOS", 6, 16);
        
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(8);
        let dadosPessoaisTexto = `Tel: ${this.contato}\nE-mail: ${this.email}`;
        if (this.cidade || this.bairro) dadosPessoaisTexto += `\nLocal: ${this.cidade} - ${this.bairro}`;
        if (this.idade) dadosPessoaisTexto += `\nIdade: ${this.idade} anos`;
        if (this.nacionalidade) dadosPessoaisTexto += `\nNacionalidade: ${this.nacionalidade}`;
        if (this.cnh && this.cnh !== "Não") dadosPessoaisTexto += `\nCNH: ${this.cnh}`;

        const splitLateral = doc.splitTextToSize(dadosPessoaisTexto, 53);
        doc.text(splitLateral, 6, 23);

        // Conteúdo Principal com espaçamento vertical distribuído
        let yPos = 36;

        const adicionarSecao = (titulo, texto) => {
            if (!texto) return;
            doc.setFont("Helvetica", "bold");
            doc.setFontSize(9.5);
            doc.setTextColor(37, 99, 235);
            doc.text(titulo, 70, yPos);

            doc.setFont("Helvetica", "normal");
            doc.setFontSize(8.5);
            doc.setTextColor(50, 50, 50);
            const splitTexto = doc.splitTextToSize(texto, 132);
            doc.text(splitTexto, 70, yPos + 5);
            
            // Espaçamento vertical ampliado para ocupar bem a página
            yPos += 12 + (splitTexto.length * 4.5);
        };

        adicionarSecao("Objetivo Profissional", this.objetivo);
        adicionarSecao("Perfil Profissional", this.perfil);
        adicionarSecao("Qualificações e Habilidades", this.qualificacoes);
        adicionarSecao("Formação Acadêmica", this.formacao);
        adicionarSecao("Histórico Profissional", this.experiencia);
    }

    // -------------------------------------------------------------------------
    // MODELO 2: Clássico Centralizado
    // -------------------------------------------------------------------------
    gerarModelo2(doc) {
        // Nome centralizado
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(18);
        doc.setTextColor(30, 41, 59);
        doc.text(this.nome, 105, 16, { align: "center" });

        // Contato centralizado
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(100, 100, 100);
        let subCabecalho = `Tel: ${this.contato}  |  E-mail: ${this.email}`;
        if (this.cidade) subCabecalho += `  |  ${this.cidade} (${this.bairro})`;
        doc.text(subCabecalho, 105, 22, { align: "center" });

        // Dados Extras centralizados
        let dadosExtras = [];
        if (this.idade) dadosExtras.push(`Idade: ${this.idade} anos`);
        if (this.nacionalidade) dadosExtras.push(`Nacionalidade: ${this.nacionalidade}`);
        if (this.cnh && this.cnh !== "Não") dadosExtras.push(`CNH: ${this.cnh}`);
        if (this.cargo) dadosExtras.push(`Cargo Pretendido: ${this.cargo}`);
        
        if (dadosExtras.length > 0) {
            doc.text(dadosExtras.join("  •  "), 105, 28, { align: "center" });
        }

        doc.setDrawColor(37, 99, 235);
        doc.setLineWidth(0.6);
        doc.line(20, 32, 190, 32);

        let yPos = 40;
        const adicionarSecaoCentral = (titulo, texto) => {
            if (!texto) return;
            doc.setFont("Helvetica", "bold");
            doc.setFontSize(10);
            doc.setTextColor(37, 99, 235);
            doc.text(titulo, 20, yPos);

            doc.setFont("Helvetica", "normal");
            doc.setFontSize(8.5);
            doc.setTextColor(50, 50, 50);
            const splitTexto = doc.splitTextToSize(texto, 170);
            doc.text(splitTexto, 20, yPos + 5);
            
            yPos += 13 + (splitTexto.length * 4.5);
        };

        adicionarSecaoCentral("OBJETIVO PROFISSIONAL", this.objetivo);
        adicionarSecaoCentral("PERFIL PROFISSIONAL", this.perfil);
        adicionarSecaoCentral("QUALIFICAÇÕES E HABILIDADES", this.qualificacoes);
        adicionarSecaoCentral("FORMAÇÃO ACADÊMICA", this.formacao);
        adicionarSecaoCentral("HISTÓRICO PROFISSIONAL", this.experiencia);
    }

    // -------------------------------------------------------------------------
    // MODELO 3: Executivo Minimalista (Com faixa superior)
    // -------------------------------------------------------------------------
    gerarModelo3(doc) {
        // Faixa superior cinza suave
        doc.setFillColor(241, 245, 249);
        doc.rect(0, 0, 210, 34, "F");

        doc.setFont("Helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(15, 23, 42);
        doc.text(this.nome, 20, 14);

        doc.setFont("Helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(100, 116, 139);
        doc.text(`Tel: ${this.contato}  |  E-mail: ${this.email}  |  Cargo Pretendido: ${this.cargo}`, 20, 21);

        let linhaExtra = [];
        if (this.cidade) linhaExtra.push(`Local: ${this.cidade} - ${this.bairro}`);
        if (this.idade) linhaExtra.push(`Idade: ${this.idade} anos`);
        if (this.nacionalidade) linhaExtra.push(`Nacionalidade: ${this.nacionalidade}`);
        if (this.cnh && this.cnh !== "Não") linhaExtra.push(`CNH: ${this.cnh}`);
        
        if (linhaExtra.length > 0) {
            doc.text(linhaExtra.join("  •  "), 20, 27);
        }

        let yPos = 43;
        const adicionarSecaoMin = (titulo, texto) => {
            if (!texto) return;
            doc.setFont("Helvetica", "bold");
            doc.setFontSize(10);
            doc.setTextColor(15, 23, 42);
            doc.text(titulo, 20, yPos);

            doc.setFont("Helvetica", "normal");
            doc.setFontSize(8.5);
            doc.setTextColor(51, 65, 85);
            const splitTexto = doc.splitTextToSize(texto, 170);
            doc.text(splitTexto, 20, yPos + 5);
            
            yPos += 13 + (splitTexto.length * 4.5);
        };

        adicionarSecaoMin("OBJETIVO PROFISSIONAL", this.objetivo);
        adicionarSecaoMin("PERFIL PROFISSIONAL", this.perfil);
        adicionarSecaoMin("QUALIFICAÇÕES E HABILIDADES", this.qualificacoes);
        adicionarSecaoMin("FORMAÇÃO ACADÊMICA", this.formacao);
        adicionarSecaoMin("HISTÓRICO PROFISSIONAL", this.experiencia);
    }
}