document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", function () {
  initDigitacao();
  initRevelar();
  initMenu();
  initLogin();
  initCarrossel();
  initRolagem();
  initGaleriaPixel();
});

function initMenu() {
  const botao = document.getElementById("mostrarBtn");
  const lista = document.getElementById("listaNav");
  if (!botao || !lista) return;

  botao.addEventListener("click", function (evento) {
    evento.stopPropagation();
    const aberto = lista.classList.toggle("aberto");
    botao.setAttribute("aria-expanded", aberto ? "true" : "false");
  });
  document.addEventListener("click", function (evento) {
    if (!lista.contains(evento.target) && evento.target !== botao) {
      lista.classList.remove("aberto");
      botao.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") {
      lista.classList.remove("aberto");
      botao.setAttribute("aria-expanded", "false");
    }
  });
}

function initLogin() {
  const botao = document.querySelector(".entrar");
  const campoUsuario = document.getElementById("text");
  const campoSenha = document.getElementById("password");
  if (!botao || !campoUsuario || !campoSenha) return;

  const contas = [
    { usuario: "jo",  senha: "1234",  destino: "carrosel.html", mensagem: "Isso ae" },
    { usuario: "rip", senha: "spyke", destino: "pyke.html",     mensagem: "Homenagem ao companheiro mais fiel que já tive" }
  ];

  function entrar() {
    const usuario = campoUsuario.value.trim();
    const senha = campoSenha.value;

    const conta = contas.find(function (c) {
      return c.usuario === usuario && c.senha === senha;
    });

    if (conta) {
      alert(conta.mensagem);
      window.location.href = conta.destino;
    } else {
      alert("Tente novamente");
      campoSenha.value = "";
      campoSenha.focus();
    }
  }

  botao.addEventListener("click", entrar);

  [campoUsuario, campoSenha].forEach(function (campo) {
    campo.addEventListener("keydown", function (evento) {
      if (evento.key === "Enter") entrar();
    });
  });
}

function initCarrossel() {
  const carrossel = document.querySelector(".carousel");
  if (!carrossel) return;

  const slides = carrossel.querySelectorAll(".slide");
  if (slides.length === 0) return;

  let atual = 0;
  let intervalo = null;

  function mostrar(indice) {
    slides.forEach(function (slide, i) {
      slide.classList.toggle("active", i === indice);
    });
  }

  function proximo() {
    atual = (atual + 1) % slides.length;
    mostrar(atual);
  }

  function iniciar() {
    if (intervalo === null) intervalo = setInterval(proximo, 5000);
  }

  function parar() {
    clearInterval(intervalo);
    intervalo = null;
  }

  mostrar(atual);
  iniciar();

  carrossel.addEventListener("mouseenter", parar);
  carrossel.addEventListener("mouseleave", iniciar);

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) parar();
    else iniciar();
  });
}

function initRolagem() {
  const subir = document.querySelector(".pageup");
  const descer = document.querySelector(".pagedown");
  if (!subir && !descer) return;

  function rolar(direcao) {
    const altura = window.innerHeight || document.documentElement.clientHeight;
    window.scrollBy({ top: altura * direcao, behavior: "smooth" });
  }

  if (subir) subir.addEventListener("click", function () { rolar(-1); });
  if (descer) descer.addEventListener("click", function () { rolar(1); });
}

const OBRAS_PIXEL = [
  { url: "imagens/gifmaker_me (2).gif",    title: "Galhinho",             tipo: "Animação" },
  { url: "imagens/gifmaker_me (3).gif",    title: "Abutre",               tipo: "Animação" },
  { url: "imagens/gifmaker_me (4).gif",    title: "Deley slash",          tipo: "Animação" },
  { url: "imagens/gifmaker_me.gif",        title: "Milharal",             tipo: "Animação" },
  { url: "pixel/savage.gif",               title: "Pato agiota",          tipo: "Animação" },
  { url: "pixel/uhu.jpg",                  title: "Milharal — Início",    tipo: "Estudo" },
  { url: "pixel/não aguento mais ;-;.jpg", title: "Feudal-tree",          tipo: "Cenário" }
];

function initGaleriaPixel() {
  const grade = document.getElementById("grade");
  if (!grade) return;

  const paginacao = document.getElementById("paginacao");
  const contador = document.getElementById("contador");
  const chao = document.getElementById("chao");
  const porPagina = 8;
  let paginaAtual = 1;

  function criarPeca(obra, indice) {
    const peca = document.createElement("button");
    peca.className = "peca";
    peca.type = "button";
    peca.setAttribute("aria-label", "Ampliar " + obra.title);

    const moldura = document.createElement("div");
    moldura.className = "moldura";

    const img = document.createElement("img");
    img.src = obra.url;
    img.alt = obra.title;
    img.loading = "lazy";

    const lupa = document.createElement("div");
    lupa.className = "lupa";
    lupa.textContent = "Ampliar";

    moldura.appendChild(img);
    moldura.appendChild(lupa);

    const ficha = document.createElement("div");
    ficha.className = "ficha";

    const nome = document.createElement("div");
    nome.className = "nome";
    nome.textContent = obra.title;

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = obra.tipo;

    ficha.appendChild(nome);
    ficha.appendChild(meta);
    peca.appendChild(moldura);
    peca.appendChild(ficha);

    peca.addEventListener("click", function () { abrirLightbox(indice); });
    return peca;
  }

  function mostrarPagina(pagina) {
    grade.innerHTML = "";
    const inicio = (pagina - 1) * porPagina;
    const fim = Math.min(inicio + porPagina, OBRAS_PIXEL.length);

    for (let i = inicio; i < fim; i++) {
      grade.appendChild(criarPeca(OBRAS_PIXEL[i], i));
    }

    if (contador) {
      contador.textContent = OBRAS_PIXEL.length + " peças";
    }
  }

  function criarPaginacao() {
    if (!paginacao) return;
    paginacao.innerHTML = "";

    const total = Math.ceil(OBRAS_PIXEL.length / porPagina);
    if (total <= 1) return;

    for (let i = 1; i <= total; i++) {
      const botao = document.createElement("button");
      botao.type = "button";
      botao.textContent = i;
      botao.addEventListener("click", function () {
        paginaAtual = i;
        mostrarPagina(paginaAtual);
        marcarAtivo();
      });
      paginacao.appendChild(botao);
    }
    marcarAtivo();
  }

  function marcarAtivo() {
    if (!paginacao) return;
    paginacao.querySelectorAll("button").forEach(function (botao, i) {
      botao.classList.toggle("active", i + 1 === paginaAtual);
    });
  }

  function abrirLightbox(indice) {
    const obra = OBRAS_PIXEL[indice];

    const overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-label", obra.title);

    const fechar = document.createElement("span");
    fechar.className = "fechar";
    fechar.textContent = "×";

    const img = document.createElement("img");
    img.src = obra.url;
    img.alt = obra.title;

    const rotulo = document.createElement("div");
    rotulo.className = "rotulo-obra";
    rotulo.textContent = obra.title + " — " + obra.tipo;

    overlay.appendChild(fechar);
    overlay.appendChild(img);
    overlay.appendChild(rotulo);
    document.body.appendChild(overlay);

    function remover() {
      overlay.remove();
      document.removeEventListener("keydown", aoTeclar);
    }

    function aoTeclar(evento) {
      if (evento.key === "Escape") remover();
    }

    overlay.addEventListener("click", remover);
    document.addEventListener("keydown", aoTeclar);
  }

  function montarChao() {
    if (!chao) return;
    const tiles = ["pixel/chaosv2_01.png", "pixel/chaosv2_02.png"];
    const quantidade = Math.ceil(window.innerWidth / 100) + 2;
    chao.innerHTML = "";
    for (let i = 0; i < quantidade; i++) {
      const img = document.createElement("img");
      img.src = tiles[i % 3 === 2 ? 1 : 0];
      img.alt = "";
      chao.appendChild(img);
    }
  }

  window.addEventListener("resize", montarChao);

  mostrarPagina(paginaAtual);
  criarPaginacao();
  montarChao();
}

function showContainer() {
  const body = document.querySelector('body');
  const toogle = document.querySelector('.toggle-button');
  const toogle2 = document.querySelector('.toggle-button2');
  const audio = new Audio('epoch/0AC_00.wav');
  const audio2 = new Audio('epoch/0DC_00.wav');
  const con = document.querySelector('.container');

  if (con.style.display == 'none') {
    toogle.classList.add('epoch-go');
    audio.play();
    setTimeout(function () {
      audio2.play();
      body.classList.add('shake-animation');
    }, 7000);
    setTimeout(function () {
      body.classList.remove('shake-animation');
      con.style.display = 'flex';
      toogle2.style.display = 'flex';
      toogle.classList.remove('epoch-go');
      toogle.style.display = 'none';
    }, 10000);
  } else {
    con.style.display = 'none';
  }
}

let activeGallery = '';

function showGallery(galleryId) {
  document.querySelectorAll('.gallery').forEach(function (gallery) {
    if (gallery.id === galleryId) {
      gallery.style.display = 'flex';
      activeGallery = galleryId;
    } else {
      gallery.style.display = 'none';
    }
  });

  document.querySelectorAll('.button').forEach(function (button) {
    button.classList.toggle(
      'ativo',
      button.getAttribute('onclick') === "showGallery('" + activeGallery + "')"
    );
  });
}

function initDigitacao() {
  const alvo = document.querySelector("[data-digitar]");
  if (!alvo) return;

  const frases = alvo.dataset.digitar.split("|").map(function (f) {
    return f.trim();
  });

  const saida = document.createElement("span");
  saida.className = "digitar";

  const cursor = document.createElement("span");
  cursor.className = "cursor";

  alvo.textContent = "";
  alvo.appendChild(saida);
  alvo.appendChild(cursor);
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    saida.textContent = frases[0];
    cursor.classList.add("fim");
    return;
  }

  let indiceFrase = 0;
  let indiceLetra = 0;
  let apagando = false;

  function passo() {
    const frase = frases[indiceFrase];

    if (!apagando) {
      indiceLetra++;
      saida.textContent = frase.slice(0, indiceLetra);

      if (indiceLetra === frase.length) {
        if (frases.length === 1) {
          cursor.classList.add("fim");
          return;
        }
        apagando = true;
        setTimeout(passo, 2200);
        return;
      }
      setTimeout(passo, 55 + Math.random() * 45);
    } else {
      indiceLetra--;
      saida.textContent = frase.slice(0, indiceLetra);

      if (indiceLetra === 0) {
        apagando = false;
        indiceFrase = (indiceFrase + 1) % frases.length;
        setTimeout(passo, 350);
        return;
      }
      setTimeout(passo, 28);
    }
  }

  setTimeout(passo, 500);
}

function initRevelar() {
  const alvos = document.querySelectorAll(".revelar");
  if (alvos.length === 0) return;
  if (!("IntersectionObserver" in window)) {
    alvos.forEach(function (el) { el.classList.add("visivel"); });
    return;
  }

  const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  alvos.forEach(function (el) { observador.observe(el); });
}
