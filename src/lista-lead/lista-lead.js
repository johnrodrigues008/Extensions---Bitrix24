// Função para substituir as tags por estilos
const replaceTags = () => {
      // Seletor mais específico para encontrar o campo desejado
      const tagsCard = document.querySelectorAll('td.main-grid-cell.main-grid-cell-left[data-editable="true"] > div.main-grid-cell-inner > span.main-grid-cell-content[data-prevent-default="true"]');

      const colors = {
            'WhatsApp': 'whatsapp-color',
            'Facebook': 'facebook-color',
            'Instagram': 'instagram-color',
            'Landing Page': 'landing-page-color',
            'Email': 'email-color',
            'Youtube': 'youtube-color',
            'Site': 'site-color',
            'Personal Lead': 'personal-lead',
            'Offer Free': 'offer-free',
            'Listing to lease': 'listing-lease',
            'Vacant Land': 'vacant-land',
            'IN HOLD': 'in-hold',
            'New Construction': 'new-construction',
            'Representing Seller': 'representing-seller',
            'Pendências': 'pendencias',
            'Representing Buyer': 'representing-buyer',

            // Classes do business temperature
            '25%': 'twenty-five-percent', // 25% Branco
            '50%': 'fifty-percent', // 50% Cinza escuro
            '75%': 'seventy-five-percent', // 75% laranja
            '90%': 'ninety-percent',// 90% verde escuro
            '100%': 'one-hundred-percent',// 100% azul escuro
            // Classes dos status
            'Due this week': 'due-this week', // Cinza escuro
            'Due today': 'due-today', // Verde escuro
            'Overdue': 'overdue', // Todo o card em vermelho claro
            'Nova/vazia': 'new-empty',
            'Moveout': 'moveout',
      };

      tagsCard.forEach(tag => {
            if (!tag.dataset.originalContent) {
                  tag.dataset.originalContent = tag.innerHTML;
            }

            // Extrai as palavras, considerando que podem estar separadas por <br>
            const words = tag.dataset.originalContent.split(/<br\s*\/?>/i).map(word => word.trim());

            // Filtra palavras vazias ou sem correspondência nas cores
            const filteredWords = words.filter(word => word && colors[word]);

            // Se não houver tags válidas, não faça alterações
            if (filteredWords.length === 0) {
                  return;
            }

            tag.innerHTML = '';

            filteredWords.forEach(word => {
                  const span = document.createElement('span');
                  span.textContent = word;
                  span.className = colors[word]; // Define apenas a cor correspondente, sem default

                  // Adiciona o span com a classe de cor correspondente
                  tag.appendChild(span);

                  // Adiciona uma quebra de linha, exceto após o último elemento
                  if (word !== filteredWords[filteredWords.length - 1]) {
                        tag.appendChild(document.createElement('br'));
                  }
            });
      });
};

// Variável de controle para o observador e execução
let observer = null;
let executedOnce = false;

// Função para iniciar o observador
const startObserver = () => {
      if (observer) {
            observer.disconnect();
      }

      observer = new MutationObserver((mutationsList, observerInstance) => {
            const tagsCard = document.querySelectorAll('td.main-grid-cell.main-grid-cell-left[data-editable="true"] > div.main-grid-cell-inner > span.main-grid-cell-content[data-prevent-default="true"]');

            // Se encontrar os elementos e ainda não tiver executado
            if (tagsCard.length > 0 && !executedOnce) {
                  executedOnce = true;

                  // Aguarda um pequeno atraso antes de executar para evitar sobrecarga
                  setTimeout(() => {
                        replaceTags();
                        executedOnce = false; // Permite que a função seja executada novamente em futuras mudanças
                  }, 1); // Tempo de delay em milissegundos
            }
      });

      // Inicia o observador de mutações
      observer.observe(document.body, { childList: true, subtree: true });
};

// Função para monitorar mudanças na URL e reiniciar o observador
const monitorURLChanges = () => {
      let lastUrl = window.location.href;

      new MutationObserver(() => {
            const currentUrl = window.location.href;
            if (currentUrl !== lastUrl) {
                  lastUrl = currentUrl;
                  // Reinicia o observador quando a URL mudar
                  startObserver();
            }
      }).observe(document.body, { childList: true, subtree: true });
};

// Chama a função para iniciar o observador e monitorar a URL
startObserver();
monitorURLChanges();
