import React from 'react';

export default function HeadshotComponent(props) {
  let { imageUrl } = props.info;

  let divStyle = {
    width: '360px',
    height: '360px',
  };

  return imageUrl.length ? (
    <div style={divStyle}>
      <img alt="" src={imageUrl} />
    </div>
  ) : (
    <img alt="" src="images/HeadshotExample.png" />
  );
}
