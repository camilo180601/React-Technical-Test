import { useEffect, useState } from 'react'
import Global from './services/Global';
import './App.css'

function App() {
    const [fact, setFact] : any = useState()
    const [imageUrl, setImageUrl] = useState();

    useEffect(() => {
        fetch(Global.CAT_ENDPOINT_RANDOM)
            .then(res => res.json())
            .then(data => {
                const { fact } = data
                setFact(fact)
            })

    }, []);

    useEffect(() => {
        if(!fact) return
        const firstWord = fact.split(' ', 3).join(' ')
        console.log(firstWord);

        fetch(`https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`)
            .then(res => res.json())
            .then(response => {
                const { url } = response;
                setImageUrl(url);
            })
    }, [fact])

    return (
        <main>
            <h1>App Gatos</h1>
            {fact &&
                <p>{fact}</p>
            }
            {imageUrl &&
                <img src={`${Global.CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`Image extracted using the first three words for ${fact}`} />
            }
        </main>
    )
}

export default App
