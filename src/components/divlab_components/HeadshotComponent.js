import React from 'react';

export default function HeadshotComponent(props) {
  let { imageUrl } = props.info;

  let divStyle = {
    height: '100%',
    width: '100%',
    margin: '0px',
    display: 'block'
  };

  return imageUrl.length ? (
    <div style={divStyle}>
      <img alt="" src={imageUrl} />
    </div>
  ) : (
    <img alt="" src="images/HeadshotExample.png" />
  );
}
