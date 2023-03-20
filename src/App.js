import './App.css';
import {useRef,useEffect,useState} from 'react';
function App() {
  const inputElement = useRef();
  const [name, setname]=useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setitem] = useState("");
  const focusInput = () => {
    setname(inputElement.current.value);
  };

  useEffect(() => {
    fetch("https://api.agify.io/?name="+name)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setitem(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [name]);
  return (
    <div className="App">
      <div className='App-header'>
        <h1>A Fun App to know your age</h1>
        Enter your name <input ref={inputElement} ></input>
        <button onClick={focusInput}>Get Age</button>
        {name !='' && <h1>Great !! <br/> Your age  is<br/> {item.age}</h1> }
      </div>
    </div>
  );
}

export default App;
