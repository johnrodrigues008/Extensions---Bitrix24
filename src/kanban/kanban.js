const replaceTags = () => {
    const columns = document.querySelectorAll('.main-kanban-column');

    columns.forEach(column => {
        const titleElement = column.querySelector('.main-kanban-column-title-text-inner');
        const titleText = titleElement ? titleElement.textContent.trim().toLowerCase() : '';

        let isHOAColumn = (titleText === 'hoa');
        let isOtherColumn = ['repairs', 'warranty', 'grama', 'limpeza piscina', 'piscina', 'inventário', 'grama/piscina', 'repairs/to do\'s'].includes(titleText);

        const cards = column.querySelectorAll('.crm-kanban-item');

        cards.forEach(card => {
            const tagItems = card.querySelectorAll('.crm-kanban-item-fields-item-value');

            let containsHOA = false;

            tagItems.forEach(tag => {
                if (tag.textContent.includes('HOA')) {
                    containsHOA = true;
                }
            });

            if (containsHOA) {
                if (isHOAColumn) {
                    card.classList.add('hoa-background');
                } else if (isOtherColumn) {
                    card.classList.add('specific-background');
                }
            }
        });
    });

    const items = document.querySelectorAll('.crm-kanban-item-fields-item');

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

        '25%': 'twenty-five-percent',
        '50%': 'fifty-percent',
        '75%': 'seventy-five-percent',
        '90%': 'ninety-percent',
        '100%': 'one-hundred-percent',

        'Due this week': 'due-this-week',
        'Due today': 'due-today', 
        'Overdue': 'overdue', 
        'Nova/vazia': 'new-empty',
        'Moveout': 'moveout',

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

    items.forEach(item => {
        const title = item.querySelector('.crm-kanban-item-fields-item-title-text');
        if (title && (title.textContent.trim() === 'Lead' || title.textContent.trim() === 'Status' || title.textContent.trim() === 'Business temperature' || title.textContent.trim() === 'Status PM' || title.textContent.trim() === 'Etiquetas')) {
            const tag = item.querySelector('.crm-kanban-item-fields-item-value');

            if (!tag.dataset.originalContent) {
                tag.dataset.originalContent = tag.textContent;
            }

            const words = tag.dataset.originalContent.split(',').map(word => word.trim());
            tag.innerHTML = '';

            words.forEach(word => {
                if (colors[word]) { 
                    const span = document.createElement('span');
                    span.textContent = word;
                    span.className = `${colors[word]} tags-color`;

                    tag.appendChild(span);

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

let observer = null;
let executedOnce = false;

const startObserver = () => {
    if (observer) {
        observer.disconnect();
    }

    observer = new MutationObserver((mutationsList, observerInstance) => {
        const items = document.querySelectorAll('.crm-kanban-item-fields-item');

        if (items.length > 0 && !executedOnce) {
            executedOnce = true;

            setTimeout(() => {
                replaceTags();
                executedOnce = false;
            }, 500);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
};

startObserver();