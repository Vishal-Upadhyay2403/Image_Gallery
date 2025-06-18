import React from "react";
import { Button, Jumbotron } from "react-bootstrap";


const Welcome = () => (
  <Jumbotron>
    <h1>Images Gallery</h1>
    <p>
      this is the simple application uses unsplash api.
    </p>
    <p>
      <Button variant="primary" href="https://unsplash.com"
      target="_blank">Learn More</Button>
    </p>
  </Jumbotron>
);


export default Welcome;