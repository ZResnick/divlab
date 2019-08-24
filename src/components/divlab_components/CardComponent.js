import React from 'react';
import { Card, Image } from 'semantic-ui-react';

const CardComponent = props => {
  const { name, description, footer, caption, imageUrl } = props.info;

  return name.length ||
    description.length ||
    footer.length ||
    caption.length ||
    imageUrl.length ? (
    <Card name="CardComponent">
      <span dangerouslySetInnerHTML={{ __html: '<!-- CardImgStart -->' }} />
      <Image src={imageUrl} wrapped ui={false} />
      <span dangerouslySetInnerHTML={{ __html: '<!-- CardImgEnd -->' }} />

      <Card.Content>
        <span
          dangerouslySetInnerHTML={{ __html: '<!-- CardHeaderStart -->' }}
        />
        <Card.Header>{name}</Card.Header>
        <span dangerouslySetInnerHTML={{ __html: '<!-- CardHeaderEnd -->' }} />

        <Card.Meta>
          <span
            dangerouslySetInnerHTML={{ __html: '<!-- CardCaptionStart -->' }}
          />
          <span className="date">{caption}</span>
          <span
            dangerouslySetInnerHTML={{ __html: '<!-- CardCaptionEnd -->' }}
          />
        </Card.Meta>

        <span
          dangerouslySetInnerHTML={{ __html: '<!-- CardDescriptionStart -->' }}
        />
        <Card.Description>{description}</Card.Description>
        <span
          dangerouslySetInnerHTML={{ __html: '<!-- CardDescriptionEnd -->' }}
        />
      </Card.Content>

      <span dangerouslySetInnerHTML={{ __html: '<!-- CardFooterStart -->' }} />
      <Card.Content extra>{footer}</Card.Content>
      <span dangerouslySetInnerHTML={{ __html: '<!-- CardFooterEnd -->' }} />
    </Card>
  ) : (
    <div>
      <Image alt="" src="images/CardExample.png" />
    </div>
  );
};

export default CardComponent;
