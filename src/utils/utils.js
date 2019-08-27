
import ReactDOM from 'react-dom';

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

export function regexer(canvas) {
  let re = /HeadshotComponent|(?<=<!-- HeadshotSrcStart --><\/span><img alt="" src=")(.*?)(?="><span><!-- HeadshotSrcEnd -->)|CardComponent|(?<=<!-- CardHeaderStart --><\/span><div class="header">)(.*?)(?=<\/div><span><!-- CardHeaderEnd -->)|(?<=<!-- CardImgStart --><\/span><div class="image"><img src=")(.*?)(?="><\/div><span><!-- CardImgEnd -->)|(?<=<!-- CardCaptionStart --><\/span><span class="date">)(.*?)(?=<\/span><span><!-- CardCaptionEnd -->)|(?<=<!-- CardDescriptionStart --><\/span><div class="description">)(.*?)(?=<\/div><span><!-- CardDescriptionEnd -->)|(?<=<!-- CardFooterStart --><\/span><div class="extra content">)(.*?)(?=<\/div><span><!-- CardFooterEnd -->)|ParagraphComponent|(?<=<!-- ParagraphContentStart --><\/p><p>)(.*?)(?=<\/p><p><!-- ParagraphContentEnd -->)|HeaderComponent|(?<="width: 1200px; height: 600px; background-image: url\(&quot;)(.*?)(?=&quot;\); background-repeat: no-repeat;")|(?<=<!-- HeaderTitleStart --><\/span><p style="color: white; font-size: 48px; font-family: Corben, cursive; padding-top: 16%;">)(.*?)(?=<\/p><span><!-- HeaderTitleEnd -->)|SidewaysCardComponent|(?<=<!-- SidewaysCardHeaderStart --><\/span><div class="header">)(.*?)(?=<\/div><span><!-- SidewaysCardHeaderEnd -->)|(?<=<!-- SidewaysCardImgStart --><\/span><div class="image"><img src=")(.*?)(?="><\/div><span><!-- SidewaysCardImgEnd -->)|(?<=<!-- SidewaysCardCaptionStart --><\/span><span class="date">)(.*?)(?=<\/span><span><!-- SidewaysCardCaptionEnd -->)|(?<=<!-- SidewaysCardDescriptionStart --><\/span><div class="description">)(.*?)(?=<\/div><span><!-- SidewaysCardDescriptionEnd -->)/g;
  let output = canvas.match(re);
  return output;
}
