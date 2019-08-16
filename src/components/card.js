import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

const CardTemplate = props => {
  return (
    <Card>
      <Image src="/images/avatar/large/matthew.png" wrapped ui={false} />
      <Card.Content>
        <Card.Header>{props.name}</Card.Header>
        <Card.Meta>
          <span className="date">Joined in 2015</span>
        </Card.Meta>
        <Card.Description>{props.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="user" />
          22 Friends
        </a>
      </Card.Content>
    </Card>
  );
};

export default CardTemplate;
