import React from 'react';
import { Card, Image } from 'semantic-ui-react';

const SidewaysCardComponent = props => {
  const { name, description, caption, imageUrl } = props.info;
  return name.length ||
    description.length ||
    caption.length ||
    imageUrl.length ? (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Image src={imageUrl} wrapped ui={false} />

      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          <span className="date">{caption}</span>
        </Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
    </Card>
  ) : (
    <div>
      <Image alt="" src="images/CardExample.png" />
    </div>
  );
};

export default SidewaysCardComponent;
