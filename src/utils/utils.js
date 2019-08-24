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
  return output;
}
export function headshotParser(canvas) {
  let headshotRegex = /(?<=<!-- HeadshotSrcStart --><\/span><img alt="" src=")(.*?)(?="><span><!-- HeadshotSrcEnd -->)/g;
  let output = canvas.match(headshotRegex);
  let output1 = [...canvas.matchAll(headshotRegex)];
  console.log(output1);

  return output;
}

export function regexer(canvas) {
  let re = /HeadshotComponent|ParagraphComponent|CardComponent|(?<=<!-- HeadshotSrcStart --><\/span><img alt="" src=")(.*?)(?="><span><!-- HeadshotSrcEnd -->)|(?<=<!-- CardHeaderStart --><\/span><div class="header">)(.*?)(?=<\/div><span><!-- CardHeaderEnd -->)|(?<=<!-- CardImgStart --><\/span><div class="image"><img src=")(.*?)(?="><\/div><span><!-- CardImgEnd -->)|(?<=<!-- CardCaptionStart --><\/span><span class="date">)(.*?)(?=<\/span><span><!-- CardCaptionEnd -->)|(?<=<!-- CardDescriptionStart --><\/span><div class="description">)(.*?)(?=<\/div><span><!-- CardDescriptionEnd -->)|(?<=<!-- CardFooterStart --><\/span><div class="extra content">)(.*?)(?=<\/div><span><!-- CardFooterEnd -->)|(?<=<!-- ParagraphContentStart --><\/p><p>)(.*?)(?=<\/p><p><!-- ParagraphContentEnd -->)/g;
  let output = canvas.match(re);
  console.log(output);
  return output;
}
