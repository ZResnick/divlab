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
  return output;
}
export function headshotParser(canvas) {
  let headshotRegex = /(?<=<!-- HeadshotSrcStart --><\/span><img alt="" src=")(.*?)(?="><span><!-- HeadshotSrcEnd -->)/g;
  let output = canvas.match(headshotRegex);
  let output1 = [...canvas.matchAll(headshotRegex)];
  return output;
}

export function regexer(canvas) {
  let re = /HeadshotComponent|(?<=<!-- HeadshotSrcStart --><\/span><img alt="" src=")(.*?)(?="><span><!-- HeadshotSrcEnd -->)|CardComponent|(?<=<!-- CardHeaderStart --><\/span><div class="header">)(.*?)(?=<\/div><span><!-- CardHeaderEnd -->)|(?<=<!-- CardImgStart --><\/span><div class="image"><img src=")(.*?)(?="><\/div><span><!-- CardImgEnd -->)|(?<=<!-- CardCaptionStart --><\/span><span class="date">)(.*?)(?=<\/span><span><!-- CardCaptionEnd -->)|(?<=<!-- CardDescriptionStart --><\/span><div class="description">)(.*?)(?=<\/div><span><!-- CardDescriptionEnd -->)|(?<=<!-- CardFooterStart --><\/span><div class="extra content">)(.*?)(?=<\/div><span><!-- CardFooterEnd -->)|ParagraphComponent|(?<=<!-- ParagraphContentStart --><\/p><p>)(.*?)(?=<\/p><p><!-- ParagraphContentEnd -->)|HeaderComponent|(?<="width: 1200px; height: 600px; background-image: url\(&quot;)(.*?)(?=&quot;\); background-repeat: no-repeat;")|(?<=<!-- HeaderTitleStart --><\/span><p style="color: white; font-size: 48px; font-family: Corben, cursive; padding-top: 16%;">)(.*?)(?=<\/p><span><!-- HeaderTitleEnd -->)/g;
  let output = canvas.match(re);
  console.log(output);
  return output;
}
