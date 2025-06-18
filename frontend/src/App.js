import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header';
import Search from './components/Search';


const UNSPLACE_KEY = process.env.REACT_APP_UNSPLACE_KEY

const App = () => {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);
  console.log(images);

  const handleSerachSubmit = (e) => {
  e.preventDefault();
  //console.log(word);
  //console.log(UNSPLACE_KEY);
  fetch(`https://api.unsplash.com/photos/random/?query=${word}&client_id=${UNSPLACE_KEY}`)
    .then((res) => res.json())
    .then((data) =>{
      setImages([data, ...images]);
      
    })
    .catch((err) => {
      console.log(err);
    });
    setWord('');
};

//console.log(word);

  return (
    <div className="App">
      <Header title="Images Gallery"/>
      <Search word={word} setWord = {setWord} handleSubmit={handleSerachSubmit}/>
    </div>
  );
}

export default App;
