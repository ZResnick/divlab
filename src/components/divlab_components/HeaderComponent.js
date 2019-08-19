import React from 'react';

export default function HeaderComponent(props) {
  const { backgroundUrl, title, navlinks } = props.info;
  let temp = navlinks && navlinks.split(' || ');
  let links = temp && temp.map(el => el.split(', '));

  let divStyle = {
    width: '1200px',
    height: '600px',
    backgroundImage: `url(${backgroundUrl})`,
    backgroundSize: 'stretch',
    backgroundRepeat: 'no-repeat'
  };

  let headerStyle = {
    color: 'white',
    fontSize: '48px',
    fontFamily: 'Corben, cursive',
    fontStyle: 'cursive',
    paddingTop: '16%'
  };

  let navbarStyle = {
    paddingTop: '3%',
    textAlign: 'right'
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
    borderRadius: '20px'
  };
  return backgroundUrl.length || title.length || navlinks.length ? (
    <div style={divStyle}>
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
      <p style={headerStyle}>{title}</p>
    </div>
  ) : (
    <img alt="" src="images/HeaderExample.png" />
  );
}
