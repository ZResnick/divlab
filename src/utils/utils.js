import React from 'react';
import ReactDOM from 'react-dom';

import ParagraphForm from '../components/divlab_components/ParagraphForm';

export function setLocalStorageHTML() {
  console.log(document.querySelector('.react-grid-layout'));

  if (document.querySelector('.react-grid-layout')) {
    localStorage.setItem(
      'canvas',
      document.querySelector('.react-grid-layout').innerHTML
    );
    console.log('setLocalStorageHTML ran succesfully!');
  }
}

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

export function paragraphContentParser(canvas) {
  let paragraphRegex = /(?<=<!-- ParagraphContentStart --><\/p><p>)(.*?)(?=<\/p><p><!-- ParagraphContentEnd -->)/g;
  let output = canvas.match(paragraphRegex);
  let output1 = [...canvas.matchAll(paragraphRegex)];
  console.log(output1);
  // console.log('FOUND>', output1[2][0], 'INDEX>', output1[2]['index']);
  // let array;
  // while ((array = paragraphRegex.exec(canvas)) !== null) {
  // 	console.log(
  // 		`Found ${array[0]}. Next starts at ${paragraphRegex.lastIndex}`
  // 	);
  // }
  return output;
}

/*
For more complicated components, it may be easiest to regex for a whole component, then regex through that string for the content specific to that single component



We need to make a version of the above function for each component.

We then need to make one function FORMATTER that aggregates those functions and returns an ordered array (ordered by the index they were found at).

That function is what needs to be called on line 98 of divlab2.

Inside the for loop is where we'll put the switch statement that will search by type nd inject the props
*/
