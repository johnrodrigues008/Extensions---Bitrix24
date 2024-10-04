// Mapeamento das URLs para as funções correspondentes
const urlActions = {
      "https://wra-usa.bitrix24.com/crm/deal/kanban": handleKanbanTab,
      // "https://wra-usa.bitrix24.com/crm/deal/details/": handleKanbanCardTab,
      "https://wra-usa.bitrix24.com/crm/deal/category": handleListaLeadTab,
      "https://wra-usa.bitrix24.com/crm/deal/kanban/category/1/": handleTcWraTab,
};

// Função para encontrar a URL correspondente
function findMatchingAction(url) {
      return Object.keys(urlActions).find(key => url.includes(key));
}

// Listener para tabs.onUpdated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (changeInfo.status === 'complete' && tab.url) {
            const actionKey = findMatchingAction(tab.url);
            if (actionKey) {
                  urlActions[actionKey](tabId);
            }
      }
});

// Função para a URL Kanban
function handleKanbanTab(tabId) {
      chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["./src/kanban/kanban.js"]
      });
      chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./src/kanban/kanban.css"]
      });
}

// Função para a URL Lista Lead
function handleListaLeadTab(tabId) {
      chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["./src/lista-lead/lista-lead.js"]
      });
      chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./src/lista-lead/lista-lead.css"]
      });
}

function handleTcWraTab(tabId) {
      console.log('Executando handleTcWraTab para tabId:', tabId);
      chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["./src/tc-wra/tc-wra.js"]
      });
      chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./src/tc-wra/tc-wra.css"]
      });
}
