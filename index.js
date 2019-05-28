import fuzzysort from 'fuzzysort';

/**
 * @return {Array<{title: string, node: Node}>} List of page label and node to click on
 */
const getPages = () =>
    Array.from(document.querySelectorAll('[class*="pages_panel--renameableNodeText"]'))
    	.map(n => ({title: n.textContent, node: n.closest('[class*=pageRow]')}));

const updateResultList = (container, list, current = 0) => {
    container.innerHTML = '';
    for (let i = 0; i < list.length; i++) {
        if (current === i)
            container.innerHTML += '> ';
        container.innerHTML += list[i].title + '</br>';
    }
};

const createSelector = () => {
    const container = document.createElement('DIV');
    const pagesList = document.querySelector('[class*="pages_panel--pagesList"]');
    container.innerHTML = '<div class="page-selector"><input id="page-selector-input" type="search" style="border:0;width:100%;padding:8px 16px"><div class="page-selector__list"></div></div>';
    pagesList.parentNode.insertBefore(container, pagesList);
    const input = container.querySelector('input');
    const resultContainer = container.querySelector('.page-selector__list');
    let pages = getPages();
    let resultList = [];
    let current = 0;
    input.placeholder = 'Go to Page';
    input.addEventListener('focus', () => pages = getPages());
    input.addEventListener('keypress', (e) => {
        if (e.keyCode == 40) {
            current = (current + 1) % resultList.length;
            updateResultList(resultContainer, resultList, current);
        }
        else if (e.keyCode == 38) {
            current = (current - 1 + resultList.length) % resultList.length;
            updateResultList(resultContainer, resultList, current);
        }
        else if (e.keyCode == 13) {
            const item = resultList[current];
            if (item && item.node)
                item.node.click();
            resultList = [];
            input.value = '';
            current = 0;
            updateResultList(resultContainer, resultList, current);
        }
        else {
            current = 0;
            if (!pages) {
            	pages = getPages();
            }
            const results = fuzzysort.go(input.value, getPages(), {key: 'title'});
            resultList = results.map(r => r.obj);
            updateResultList(resultContainer, resultList, current);
        }
    });
    input.addEventListener('keydown', (e) => {
        if (e.keyCode == 40) {
            current = (current + 1) % resultList.length;
            updateResultList(resultContainer, resultList, current);
        }
        else if (e.keyCode == 38) {
            current = (current - 1 + resultList.length) % resultList.length;
            updateResultList(resultContainer, resultList, current);
        }
    });
    updateResultList(resultContainer, resultList, current);
    document.addEventListener('keydown', e => {
    	if (document.activeElement && document.activeElement.tagName == 'INPUT') {
    		return;
    	}
    	if ((e.which || e.keyCode) == 80 && e.shiftKey) {
    		input.focus();
    	}
    });
};

// wait for page to have loaded
// the elements will probably be removed by updates through the UI
const init = () => {
	if (document.querySelector('[class*="pages_panel--pagesList"]') == null) {
		setTimeout(init, 1000);
	}
	createSelector();
}
setTimeout(init, 1000);
