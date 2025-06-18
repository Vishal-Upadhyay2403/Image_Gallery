import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import { Container,Row,Col } from 'react-bootstrap';

const UNSPLACE_KEY = process.env.REACT_APP_UNSPLACE_KEY

const App = () => {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);
  //console.log(images);

  const handleSerachSubmit = (e) => {
  e.preventDefault();
  //console.log(word);
  //console.log(UNSPLACE_KEY);
  fetch(`https://api.unsplash.com/photos/random/?query=${word}&client_id=${UNSPLACE_KEY}`)
    .then((res) => res.json())
    .then((data) =>{
      setImages([{...data, title:word}, ...images]);
      
    })
    .catch((err) => {
      console.log(err);
    });
    setWord('');
};

//console.log(word);
const handleDeleteImage = (id) => {
  setImages(images.filter((image) => image.id !== id));
};

  return (
    <div className="App">
      <Header title="Images Gallery"/>
      <Search word={word} setWord = {setWord} handleSubmit={handleSerachSubmit}/>
      <Container className='mt-4'>
        {images.length ? (
          <Row xs={1} md={2} lg={3}>
            {images.map((image, i) => (
            <Col key={i} className='pd-3'>
            <ImageCard  image={image} deleteImage= {handleDeleteImage} />
          </Col>
      ))}
        </Row>) : ( <Welcome/> 
      ) }
      </Container>
    </div>
  );
}

export default App;
