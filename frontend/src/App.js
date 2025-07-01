import {useState, useEffect } from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import { Container,Row,Col } from 'react-bootstrap';

const API_URL = process.env.API_URL || 'http://192.168.0.105:5050';



const App = () => {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);

  const getSaveImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/images`);
      setImages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => 
    {
      getSaveImages()
    },
    []);
  //console.log(images);

  const handleSerachSubmit = async (e) => {
  e.preventDefault();
  //fetch(`${API_URL}/new-image?query=${word}`)
   // .then((res) => res.json())
    //.then((data) =>{
     // setImages([{...data, title:word}, ...images]);
      
    //})
    //.catch((err) => {
     // console.log(err);
    //});
    
    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`);
      setImages([{...res.data, title:word}, ...images]);
      
    } catch (error) {
      console.log(error);
    }
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
