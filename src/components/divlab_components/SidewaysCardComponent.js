import React from 'react';
import { Card, Image } from 'semantic-ui-react';

const SidewaysCardComponent = props => {
  const { name, description, caption, imageUrl } = props.info;
  return name.length ||
    description.length ||
    caption.length ||
    imageUrl.length ? (
    <Card name="SidewaysCardComponent"
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <span dangerouslySetInnerHTML={{ __html: '<!-- SidewaysCardImgStart -->' }} />
      <Image src={imageUrl} wrapped ui={false} />
      <span dangerouslySetInnerHTML={{ __html: '<!-- SidewaysCardImgEnd -->' }} />
      <Card.Content>
			<span
          dangerouslySetInnerHTML={{ __html: '<!-- SidewaysCardHeaderStart -->' }}
        />
        <Card.Header>{name}</Card.Header>
				<span
          dangerouslySetInnerHTML={{ __html: '<!-- SidewaysCardHeaderEnd -->' }}
        />
        <Card.Meta>
				<span
            dangerouslySetInnerHTML={{ __html: '<!-- SidewaysCardCaptionStart -->' }}
          />
          <span className="date">{caption}</span>
					<span
            dangerouslySetInnerHTML={{ __html: '<!-- SidewaysCardCaptionEnd -->' }}
          />
        </Card.Meta>
				<span
          dangerouslySetInnerHTML={{ __html: '<!-- SidewaysCardDescriptionStart -->' }}
        />
        <Card.Description>{description}</Card.Description>
				<span
          dangerouslySetInnerHTML={{ __html: '<!-- SidewaysCardDescriptionEnd -->' }}
        />
      </Card.Content>
    </Card>
  ) : (
    <div>
      <Image alt="" src="images/CardExample.png" />
    </div>
  );
};

export default SidewaysCardComponent;
