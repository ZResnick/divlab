import React from 'react';

export default function Paragraph(props) {
	let divStyle = {
		color: 'black',
		height: '100%',
		width: '100%',
	};

	const { content, id } = props.info;
	return content.length || id.length ? (
		<div style={divStyle} id={id} name="ParagraphComponent">
			<p
				dangerouslySetInnerHTML={{ __html: '<!-- ParagraphContentStart -->' }}
			/>
			<p>{content}</p>
			<p dangerouslySetInnerHTML={{ __html: '<!-- ParagraphContentEnd -->' }} />
		</div>
	) : (
		<img alt="" src="images/ParagraphExample.png" />
	);
}
