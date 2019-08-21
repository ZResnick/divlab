import React from 'react';
import ReactDOM from 'react-dom';

import ParagraphForm from '../components/divlab_components/ParagraphForm';

// export function setLocalStorageHTML() {
// 	console.log(document.querySelector('#n0'));

// 	if (document.querySelector('#n0')) {
// 		localStorage.setItem('canvas', document.querySelector('#n0').innerHTML);
// 		console.log('setLocalStorageHTML ran succesfully!');
// 	}
// }

// export function setHTML() {
// 	console.log(document.querySelector('#n0'));

// 	if (document.querySelector('#n0')) {
// 		const storageHTML = localStorage.getItem('canvas');
// 		let canvas = document.querySelector('#n0');
// 		canvas.innerHTML = storageHTML;
// 	}
// }

export function reactDomRender(state) {
	if (document.querySelector('#n0')) {
		ReactDOM.render(state.usedComponents[0], document.querySelector('#n0'));
	}
}
