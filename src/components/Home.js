import { Card, Image } from 'semantic-ui-react';
import React from 'react';

export default function Home() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <div id="homepage">
        <h1 className="animate-welcome">{'<divlab />'}</h1>
        <h3 className="animate-caption">THE FUTURE OF WEB DESIGN</h3>
      </div>

      {/* <div id="rightHomepage">
        <p>Hello</p>
      </div> */}
    </div>
  );
}
