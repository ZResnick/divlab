import React from 'react';

export default function HeadshotComponent(props) {
  let { imageUrl } = props.info;
  let divStyle = {
    width: '360px',
    height: '360px',
  };

  return (
    <div style={divStyle}>
      <img alt="" src={imageUrl} />
    </div>
  );
}
