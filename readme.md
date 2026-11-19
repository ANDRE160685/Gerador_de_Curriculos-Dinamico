# Gerador Dinâmico de Currículos e Portal de Vagas 📄💼

> Projeto de extensão universitária desenvolvido no âmbito da disciplina **Sistemas de Informação e Sociedade**, voltado para a **Inclusão Digital e Apoio à Empregabilidade**.

---

## 🎯 Sobre o Projeto

Este projeto tem como objetivo democratizar o acesso a ferramentas profissionais de criação de currículos e facilitar a busca por oportunidades no mercado de trabalho. A aplicação é totalmente web, gratuita e desenvolvida para auxiliar trabalhadores e estudantes na elaboração de currículos limpos, diretos e prontos para envio em formato PDF.

---

## ✨ Principais Funcionalidades

* **Gerador de Currículos Dinâmico:** Preenchimento de dados pessoais, objetivos, perfil profissional, qualificações, formação acadêmica e histórico profissional.
* **Múltiplos Modelos Visuais (A4):** Escolha entre três layouts profissionais com pré-visualização interativa em modal:
* *Modelo 1: Moderno Lateral* (com bloco lateral azul e divisões estruturadas).
* *Modelo 2: Clássico Centralizado* (visual limpo com destaque superior).
* *Modelo 3: Executivo Minimalista* (faixa superior suave e organização corporativa).


* **Geração de PDF Instantânea:** Utilização da biblioteca `jsPDF` para exportação direta do documento formatado no padrão ideal para impressão e envio.
* **Salvamento Automático (Rascunho):** Persistência de dados em tempo real utilizando o `localStorage` do navegador, evitando a perda de informações caso a página seja fechada.
* **Portal de Vagas e Requisitos:** Banco de dados integrado com dezenas de cargos catalogados por categorias (Operacional, Logística, TI, Administrativo, Saúde, Engenharia, Financeiro e Executivo) que exibe o foco de atuação, requisitos do mercado e permite busca direcionada na web.
* **Tutorial em Vídeo Integrado:** Espaço explicativo na página inicial para orientar usuários com menor familiaridade digital.

---

## 🛠️ Tecnologias Utilizadas

O projeto segue uma arquitetura modular inspirada no padrão **MVC (Model-View-Controller)** no lado do cliente:

* **HTML5 & CSS3:** Estruturação semântica e estilização moderna com variáveis CSS (`:root`), Flexbox, CSS Grid e design responsivo.
* **JavaScript (ES6+):** Lógica modularizada separando Model, View, Controller e Utilitários.
* **jsPDF:** Biblioteca externa via CDN para renderização e exportação de arquivos PDF diretamente no navegador.

---

## 📂 Estrutura de Arquivos

```text
seu-projeto/
│
├── index.html          # Página inicial com apresentação e tutorial em vídeo
├── gerador.html        # Página principal com o formulário de criação e modais A4
├── vagas.html          # Portal de consulta de requisitos e busca de vagas
├── quem-somos.html     # Página institucional sobre o projeto de extensão
│
├── css/
│   └── style.css       # Estilos globais, variáveis, modais e responsividade
│
├── js/
│   ├── model/
│   │   └── curriculoModel.js    # Regras de negócio e geração dos 3 modelos em PDF
│   ├── view/
│   │   └── curriculoView.js     # Manipulação do DOM e validação de formulários
│   ├── controller/
│   │   └── curriculoController.js # Orquestração de eventos, submit e persistência
│   └── utils/
│       └── storage.js           # Gerenciamento do localStorage (rascunhos)
│
└── videos/
    └── explicacao.mp4  # Vídeo tutorial explicativo do sistema

```

---

## 🚀 Como Executar o Projeto

Como a aplicação é construída com **módulos JavaScript (`type="module"`)**, os navegadores modernos exigem que os arquivos sejam carregados através de um servidor HTTP local (devido às políticas de segurança de CORS).

1. Clone ou baixe este repositório em sua máquina.
2. Abra a pasta do projeto no **Visual Studio Code (VS Code)**.
3. Instale e utilize a extensão **Live Server** (ou execute um servidor local simples via Python/Node.js).
4. Clique em **"Go Live"** no canto inferior direito do VS Code para abrir a aplicação no seu navegador padrão.

---

## 👥 Autoria

Desenvolvido como parte das atividades práticas do projeto de extensão em **Sistemas de Informação e Sociedade**, com foco em impacto social, acessibilidade tecnológica e inclusão digital.
---

### 🏛️ 1. Estrutura de Páginas (HTML e Estilização)

O sistema é composto por quatro páginas principais integradas por uma barra de navegação comum (`.main-nav`) e estilizadas por um arquivo de estilos centralizado (`css/style.css`):

* **Página Inicial (`index.html`):** Funciona como a porta de entrada da plataforma. Destaca o selo de "Projeto de Extensão" e inclui um **tutorial interativo em vídeo** (`videos/explicacao.mp4`). Através de um script JavaScript local, o usuário pode exibir ou ocultar o painel explicativo, controlando a reprodução e pausa do vídeo de forma fluida.
* **Gerador de Currículos (`gerador.html`):** É o núcleo funcional da aplicação. Contém um formulário extenso que recolhe dados cadastrais, informações de contato, endereço, CNH e blocos de texto livre (objetivo, perfil, qualificações, formação e histórico). Inclui também cartões interativos para a seleção de três layouts visuais diferentes e botões que acionam **modais de pré-visualização em proporção A4**.
* **Portal de Vagas e Requisitos (`vagas.html`):** Oferece um seletor robusto com dezenas de cargos catalogados em categorias (desde serviços operacionais e logística até TI, engenharia e cargos executivos). Ao escolher uma função, o sistema exibe dinamicamente o **foco de atuação** e os **requisitos exigidos pelo mercado**, permitindo também transferir o nome do cargo para uma ferramenta de busca externa direcionada por cidade e estado.
* **Quem Somos (`quem-somos.html`):** Página institucional que detalha os valores do projeto (acessibilidade, inclusão digital e foco no cidadão).
* **Estilos (`css/style.css`):** Utiliza variáveis CSS (`:root`) para definir uma paleta de cores corporativa baseada em tons de azul profundo (`#1e40af`, `#2563eb`), fundo cinza claro elegante (`#f1f5f9`) e tipografia moderna (`Inter`). O arquivo gerencia sombras suaves, bordas arredondadas e o comportamento responsivo de grades e modais.

---

### ⚙️ 2. Arquitetura JavaScript Modular (Padrão MVC)

A lógica do gerador de currículos adota o padrão **MVC (Model-View-Controller)** no lado do cliente, garantindo a separação de responsabilidades:

#### 📄 **Model (`js/model/curriculoModel.js`)**

Contém a classe `CurriculoModel`, responsável por armazenar os dados preenchidos e processar a **geração do PDF** utilizando a biblioteca externa **jsPDF** (`jspdf.umd.min.js`).

* Possui métodos específicos para renderizar três modelos gráficos distintos:
* **Modelo 1 (Moderno Lateral):** Desenha uma faixa vertical azul na lateral esquerda da página A4 e distribui os dados de contato sobre ela, alinhando o conteúdo principal à direita.
* **Modelo 2 (Clássico Centralizado):** Organiza as informações principais centralizadas no topo com uma linha divisória elegante.
* **Modelo 3 (Executivo Minimalista):** Insere uma faixa superior cinza suave com os dados do candidato e estrutura as seções corporativas logo abaixo.


* Calcula quebras de texto automáticas (`splitTextToSize`) para evitar sobreposição de linhas e exporta o arquivo final nomeado dinamicamente (`Curriculo_[Nome].pdf`).

#### 👁️ **View (`js/view/curriculoView.js`)**

Contém a classe estática `CurriculoView`, que atua como a interface entre o DOM e os dados:

* `obterValoresFormulario()`: Varre todos os campos de texto, seleções e o modelo de currículo escolhido por rádio (`input[name="modelo"]:checked`), retornando um objeto estruturado unificado.
* `validarCampos(dados)`: Executa uma validação básica exigindo o preenchimento dos campos obrigatórios críticos (Nome, Contato, E-mail e Cargo Pretendido) antes de permitir a exportação.

#### 🎮 **Controller & Utilitários (`js/controller/curriculoController.js` e `js/utils/storage.js`)**

O controlador gerencia o ciclo de vida da página de criação:

1. **Restauração Automática:** Ao carregar a página (`DOMContentLoaded`), verifica se existem dados salvos no navegador e preenche os campos automaticamente.
2. **Persistência em Tempo Real:** Escuta os eventos `input` e `change` do formulário, acionando a classe utilitária `CurriculoStorage` para salvar instantaneamente o rascunho no `localStorage`. Isso garante que o usuário não perca o que digitou caso recarregue ou feche a aba acidentalmente.
3. **Geração do Documento:** Intercepta o evento `submit`, valida os dados, instancia o modelo e dispara a criação do PDF.

---