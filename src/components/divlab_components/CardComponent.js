import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

const CardComponent = props => {
  const { name, description } = props.info;
  return name.length || description.length ? (
    <Card>
      <Image
        src="https://banner2.kisspng.com/20180301/fuq/kisspng-avatar-clip-art-man-avatar-5a980ea414e0e3.9798835715199146600855.jpg"
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          <span className="date">Joined in 2015</span>
        </Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" />
        22 Friends
      </Card.Content>
    </Card>
  ) : (
    <div>
      <Image alt="" src="images/CardExample.png" />
    </div>
  );
};

export default CardComponent;
