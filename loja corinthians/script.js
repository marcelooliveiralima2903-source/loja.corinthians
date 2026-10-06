let carrinho = [];


// ==========================
// ADICIONAR AO CARRINHO
// ==========================

function adicionar(nome, preco) {

    let produto = carrinho.find(
        item => item.nome === nome
    );

    if (produto) {

        produto.quantidade++;

    } else {

        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });

    }

    atualizarCarrinho();

    alert(
        nome + " foi adicionado ao carrinho!"
    );
}


// ==========================
// ATUALIZAR CARRINHO
// ==========================

function atualizarCarrinho() {

    const itens =
        document.getElementById("itens");

    const contador =
        document.getElementById("contador");

    const totalElemento =
        document.getElementById("total");


    let quantidade = 0;
    let total = 0;


    carrinho.forEach(produto => {

        quantidade += produto.quantidade;

        total +=
            produto.preco *
            produto.quantidade;

    });


    contador.textContent = quantidade;


    if (carrinho.length === 0) {

        itens.innerHTML = `
            <p class="vazio">
                Seu carrinho está vazio.
            </p>
        `;

    } else {

        itens.innerHTML = "";

        carrinho.forEach(
            (produto, index) => {

                const div =
                    document.createElement("div");

                div.className = "item";

                div.innerHTML = `

                    <div>

                        <h4>
                            ${produto.nome}
                        </h4>

                        <p>
                            R$ ${produto.preco
                                .toFixed(2)
                                .replace(".", ",")}
                            × ${produto.quantidade}
                        </p>

                    </div>

                    <button
                        class="remover"
                        onclick="remover(${index})"
                    >
                        🗑️
                    </button>

                `;

                itens.appendChild(div);

            }
        );

    }


    totalElemento.textContent =
        "R$ " +
        total
            .toFixed(2)
            .replace(".", ",");

}


// ==========================
// REMOVER
// ==========================

function remover(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();

}


// ==========================
// ABRIR CARRINHO
// ==========================

function abrirCarrinho() {

    document.getElementById(
        "modal"
    ).style.display = "flex";

}


// ==========================
// FECHAR CARRINHO
// ==========================

function fecharCarrinho() {

    document.getElementById(
        "modal"
    ).style.display = "none";

}


// ==========================
// FINALIZAR
// ==========================

function finalizar() {

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio!"
        );

        return;
    }


    let total = 0;

    carrinho.forEach(produto => {

        total +=
            produto.preco *
            produto.quantidade;

    });


    alert(
        "🏴 Pedido realizado!\n\n" +
        "Total: R$ " +
        total
            .toFixed(2)
            .replace(".", ",") +
        "\n\nVai Corinthians! 🖤🤍"
    );


    carrinho = [];

    atualizarCarrinho();

    fecharCarrinho();

}


// ==========================
// FILTROS
// ==========================

function filtrar(categoria) {

    const produtos =
        document.querySelectorAll(
            ".produto"
        );


    produtos.forEach(produto => {

        if (
            categoria === "todos" ||
            produto.dataset.categoria === categoria
        ) {

            produto.style.display =
                "block";

        } else {

            produto.style.display =
                "none";

        }

    });

}


// ==========================
// FECHAR CLICANDO FORA
// ==========================

document
    .getElementById("modal")
    .addEventListener(
        "click",
        function(event) {

            if (event.target === this) {

                fecharCarrinho();

            }

        }
    );


// Inicializar
atualizarCarrinho();
