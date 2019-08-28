import React from 'react';

export default function HeaderComponent(props) {
  const { backgroundUrl, title, navlinks } = props.info;
  let temp = navlinks && navlinks.split(' || ');
  let links = temp && temp.map(el => el.split(', '));

  let divStyle = {
    width: '1200px',
    height: '600px',
    // width: 'inherit',
    // height: '100%',
    backgroundImage: `url(${backgroundUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  let headerStyle = {
    color: 'white',
    fontSize: '48px',
    maxWidth: '66%',
    fontFamily: 'Shrikhand, cursive',
  };

  let navbarStyle = {
    padding: '25px',
    position: 'absolute',
    top: '8px',
    right: '12px',
  };

  let navLinkStyle = {
    color: 'white',
    fontSize: '20px',
    fontFamily: 'Lato, sans-serif',
    marginRight: '3%',
    borderStyle: 'solid',
    padding: '5px',
    paddingLeft: '8px',
    paddingRight: '8px',
    borderRadius: '20px',
  };
  return backgroundUrl.length || title.length || navlinks.length ? (
    <div style={divStyle} name="HeaderComponent">
      <div style={navbarStyle}>
        {links &&
          links.map(link => {
            return (
              <a style={navLinkStyle} href={`#${link[1]}`}>
                {link[0]}
              </a>
            );
          })}
      </div>

      <span dangerouslySetInnerHTML={{ __html: '<!-- HeaderTitleStart -->' }} />
      <p style={headerStyle}>{title}</p>
      <span dangerouslySetInnerHTML={{ __html: '<!-- HeaderTitleEnd -->' }} />
    </div>
  ) : (
    <img alt="" src="images/HeaderExample.png" />
  );
}
