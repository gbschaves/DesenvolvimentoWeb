// ./js/app.js

// 1. Obtenha a referência ao elemento que você quer manipular
// O elemento só será encontrado se o HTML tiver o ID 'main-title'
const mainTitleElement = document.getElementById("main-title");

// 2. Crie uma função que simula o useState para o nosso título
function useMainTitle(initialTitle) {
  let currentTitle = initialTitle; // O estado interno para o título

  // Função que "renderiza" o título na UI
  function renderTitle() {
    if (mainTitleElement) {
      // Garante que o elemento existe antes de tentar manipulá-lo
      mainTitleElement.textContent = currentTitle;
    } else {
      console.error(
        "Elemento com ID 'main-title' não encontrado. Verifique seu HTML."
      );
    }
  }

  // Função que "seta" um novo título (nosso setter de estado)
  function setMainTitle(newTitle) {
    currentTitle = newTitle; // Atualiza o estado
    renderTitle(); // Rerenderiza a UI para mostrar o novo título
  }

  // Renderiza o título inicial na primeira vez que a função é chamada
  renderTitle();

  // Retorna a função setter para que possamos usá-la externamente
  return [currentTitle, setMainTitle]; // Simula o retorno de um useState: [valor, setter]
}

// 3. Inicialize o nosso "estado" para o título principal
// Aqui estamos usando a função como se fosse o useState do React
const [pageTitle, setPageTitle] = useMainTitle("Bem vindo ao SafeReborn");

// 4. Adicione event listener para simular a mudança de "página"
// E mudar o título quando o evento ocorre
const btnPage1 = document.getElementById("btn-page1");

if (btnPage1) {
  btnPage1.addEventListener("click", (event) => {
    event.preventDefault(); // IMPORTANTE: Previne o comportamento padrão do link (recarregar a página)
    setPageTitle("Explore Nossos Serviços"); // Mude o título
    // Você pode adicionar mais lógicas aqui para mudar outros conteúdos da 'main'
    // Por exemplo, mostrar/esconder diferentes divs ou mudar o innerHTML da main
  });
} else {
  console.error(
    "Elemento com ID 'btn-page1' não encontrado. Verifique seu HTML."
  );
}

// Removendo a lógica para btnPage2, já que ele não está no HTML atual
// if (btnPage2) {
//     btnPage2.addEventListener('click', () => {
//         setPageTitle("Contate a Equipe SafeReborn");
//     });
// }
