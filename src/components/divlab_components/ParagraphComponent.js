import React from 'react';

export default function Paragraph(props) {
  let divStyle = {
    color: 'black',
  };

  const { content } = props.info;
  return content.length ? (
    <div style={divStyle}>{content}</div>
  ) : (
    <img alt="" src="images/ParagraphExample.png" />
  );
}
