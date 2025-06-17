import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header';
import Search from './components/Search';




const App = () => {
  const [word, setWord] = useState('');

  const handleSerachSubmit = (e) => {
  e.preventDefault();
  console.log(word);
}

//console.log(word);
  return (
    <div className="App">
      <Header title="Images Gallery"/>
      <Search word={word} setWord = {setWord} handleSubmit={handleSerachSubmit}/>
    </div>
  );
}

export default App;
