// Função para substituir as tags por estilos
const replaceTags = () => {
    // Seleciona todos os elementos com a classe 'crm-kanban-item-fields-item'
    const items = document.querySelectorAll('.crm-kanban-item-fields-item');

    const colors = {
        // Classes do lead
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
        'Due this week': 'due-this-week', // Cinza escuro
        'Due today': 'due-today', // Verde escuro
        'Overdue': 'overdue', // Todo o card em vermelho claro
        'Nova/vazia': 'new-empty',
        'Moveout': 'moveout',
    };

    items.forEach(item => {
        // Verifica se o título do item contém "Lead", "Status" ou "Business temperature"
        const title = item.querySelector('.crm-kanban-item-fields-item-title-text');
        if (title && (title.textContent.trim() === 'Lead' || title.textContent.trim() === 'Status' || title.textContent.trim() === 'Business temperature' || title.textContent.trim() === 'Status PM')) {
            const tag = item.querySelector('.crm-kanban-item-fields-item-value');

            if (!tag.dataset.originalContent) {
                tag.dataset.originalContent = tag.textContent;
            }

            const words = tag.dataset.originalContent.split(',').map(word => word.trim());
            tag.innerHTML = '';

            words.forEach(word => {
                if (colors[word]) {  // Adiciona apenas se a cor estiver definida
                    const span = document.createElement('span');
                    span.textContent = word;
                    span.className = `${colors[word]} tags-color`; // Apenas as classes correspondentes

                    tag.appendChild(span);

                    // Adiciona o fundo vermelho à classe '.crm-kanban-item' se for 'Overdue'
                    if (word === 'Overdue') {
                        const card = item.closest('.crm-kanban-item');
                        if (card) {
                            card.style.backgroundColor = '#CB5449';
                        }
                    }

                    if (word === 'Due this week' || word === 'Due today') {
                        const card = item.closest('.crm-kanban-item');
                        if (card) {
                            card.style.backgroundColor = '';
                        }
                    }
                }
            });
        }
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
        const items = document.querySelectorAll('.crm-kanban-item-fields-item');

        // Se encontrar os elementos e ainda não tiver executado
        if (items.length > 0 && !executedOnce) {
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
