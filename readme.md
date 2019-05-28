# Figma Page-Browser Userscript
A userscript to generate a very basic input field to go to a page without lenghty search in the page list.  
(Only intended for the browser-version and not tested in editing mode - will probably not work there, see below).

Creates a (rather unstyled) input where you can fuzzy-search for a page, cycle with your arrow up- and down-keys through the results and go to the selected page with the submit button.  

## Usage
To be used with a userscript manager browser-plugin, e.g. [Tampermonkey](https://www.tampermonkey.net/).  
Either copy and paste the contents of `dist.js` or add a direct link to the raw file.  

For evaluation of the functionality you can of course just paste the `dist.js` file into your debug console.

## Building
* Install (`npm i`)
* Build (`npm run build`)
* Use `dist.js`

## Known issues/limitations
* The element injection somewhat relies on the used css class names, so it might break, if the class names drastically change
* Switching between "Assets" and "Layers" is not part of my use-case, so the element only injects itself (once) into the pages list, once that is loaded. It will probably be removed by the react UI on changing the view.
* The UI hijacks all kinds of events, so the search input cannot be focussed e.g. with a hotkey (yet).
