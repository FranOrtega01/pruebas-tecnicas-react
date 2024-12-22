import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [fact, setFact] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
      fetch("https://catfact.ninja/fact")
        .then(res => {
          if(!res.ok) throw new Error("Error fetching fact!");
          return res.json();
        })
        .then(data => {
          const {fact} = data;
          setFact(fact);
        })
  }, []);

  return (
    <>
    <h1>Factos de gatos</h1>
      {fact && <p>{fact}</p> }
      {fact && <img src={`https://cataas.com/cat/says/${fact.split(" ")[0]}`} />}
    </>
  )
}

export default App
