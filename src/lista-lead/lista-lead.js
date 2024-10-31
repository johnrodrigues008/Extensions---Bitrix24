const replaceTags = () => {
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
            '25%': 'twenty-five-percent',
            '50%': 'fifty-percent',
            '75%': 'seventy-five-percent',
            '90%': 'ninety-percent',
            '100%': 'one-hundred-percent',
            // Classes dos status
            'Due this week': 'due-this week',
            'Due today': 'due-today',
            'Overdue': 'overdue',
            'Nova/vazia': 'new-empty',
            'Moveout': 'moveout',

            /* Marketing */
            'PRONTO PARA REVISÃO': 'moveout-color',
            'ESPERANDO RESPOSTA': 'waiting-response-color',
            'FEITO': 'done-color',
            'EM ANDAMENTO': 'in-progress-color',
            'FAZER PEDIDO NA GRÁFICA': 'order-print-color',
            'ESPERANDO FOTO': 'waiting-photo-color',
            'FAZENDO ARTE': 'creating-art-color',
            'POR DEMANDA': 'on-demand-color',
            'NAO INICIADO': 'not-started-color',
            'STAND BY': 'stand-by-color',
            'ESPERANDO APROVAÇÃO': 'waiting-approval-color',
            'ATUALIZAR': 'update-color',
            'PEDIDO EFETUADO': 'order-placed-color',
            'EM BRIEFING': 'in-briefing-color',
            'EM ANÁLISE': 'in-analysis-color',
            'PRODUÇÃO DE CONTEÚDO': 'content-production-color',
            'TAREFA FIXA': 'fixed-task-color',
      };

      tagsCard.forEach(tag => {
            if (!tag.dataset.originalContent) {
                  tag.dataset.originalContent = tag.innerHTML;
            }

            const words = tag.dataset.originalContent.split(/<br\s*\/?>/i).map(word => word.trim());

            const filteredWords = words.filter(word => word && colors[word]);

            if (filteredWords.length === 0) {
                  return;
            }

            tag.innerHTML = '';

            filteredWords.forEach(word => {
                  const span = document.createElement('span');
                  span.textContent = word;
                  span.className = colors[word];

                  tag.appendChild(span);

                  if (word !== filteredWords[filteredWords.length - 1]) {
                        tag.appendChild(document.createElement('br'));
                  }
            });
      });
};

let observer = null;
let executedOnce = false;

const startObserver = () => {
      if (observer) {
            observer.disconnect();
      }

      observer = new MutationObserver((mutationsList, observerInstance) => {
            const tagsCard = document.querySelectorAll('td.main-grid-cell.main-grid-cell-left[data-editable="true"] > div.main-grid-cell-inner > span.main-grid-cell-content[data-prevent-default="true"]');

            if (tagsCard.length > 0 && !executedOnce) {
                  executedOnce = true;
                  setTimeout(() => {
                        replaceTags();
                        executedOnce = false;
                  }, 1);
            }
      });

      observer.observe(document.body, { childList: true, subtree: true });
};

const monitorURLChanges = () => {
      let lastUrl = window.location.href;

      new MutationObserver(() => {
            const currentUrl = window.location.href;
            if (currentUrl !== lastUrl) {
                  lastUrl = currentUrl;
                  startObserver();
            }
      }).observe(document.body, { childList: true, subtree: true });
};

startObserver();
monitorURLChanges();
