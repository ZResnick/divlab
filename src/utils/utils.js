import React from 'react';
import ReactDOM from 'react-dom';

import ParagraphForm from '../components/divlab_components/ParagraphForm';

// export function setLocalStorageHTML() {
// 	console.log(document.querySelector('.react-grid-layout'));

// 	if (document.querySelector('.react-grid-layout')) {
// 		localStorage.setItem('canvas', document.querySelector('.react-grid-layout').innerHTML);
// 		console.log('setLocalStorageHTML ran succesfully!');
// 	}
// }

export function setHTML() {
	let canvas = document.querySelector('.react-grid-layout');
	return canvas.innerHTML;
}

export function reactDomRender(state) {
	if (document.querySelector('.react-grid-layout')) {
		ReactDOM.render(
			state.usedComponents[0],
			document.querySelector('.react-grid-layout')
		);
	}
}
