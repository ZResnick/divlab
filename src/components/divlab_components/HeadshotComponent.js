import React from 'react';

export default function HeadshotComponent(props) {
	let { imageUrl } = props.info;

	let divStyle = {
		height: '100%',
		width: '100%',
		margin: '0px',
		display: 'block',
	};

	return imageUrl.length ? (
		<div style={divStyle} name="HeadshotComponent">
			<span dangerouslySetInnerHTML={{ __html: '<!-- HeadshotSrcStart -->' }} />
			<img alt="" src={imageUrl} />
			<span dangerouslySetInnerHTML={{ __html: '<!-- HeadshotSrcEnd -->' }} />
		</div>
	) : (
		<img alt="" src="images/HeadshotExample.png" />
	);
}
