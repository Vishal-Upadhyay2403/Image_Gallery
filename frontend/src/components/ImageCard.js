import React from "react";
import { Card,Button, Nav } from "react-bootstrap";

const ImageCard = ({image, deleteImage, saveImage }) => {

  const autherName = image.user?.name;
  const authorPortfolioURL = image.user?.portfolio_url;

  return(
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top"
       src= {image.urls.small} />
      <Card.Body>
        <Card.Title>{image.title?.toUpperCase()}</Card.Title>
        <Card.Text>
         {image.description || image.alt_description}
        </Card.Text>
        <Button variant="primary" onClick={() => deleteImage(image.id)}>Delete</Button>{' '}
        {!image.saved && (
          <Button variant="secondary" onClick={() => saveImage(image.id)}>
          Save
          </Button>
          )
        }
      </Card.Body>
      <Card.Footer className="text-center text-muted">
        {authorPortfolioURL && (
          <Nav.Link href = {authorPortfolioURL} target="_blank">{autherName}</Nav.Link>
        )}
        {autherName}
      </Card.Footer>
    </Card>
  )

};

export default ImageCard;