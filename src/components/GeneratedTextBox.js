import React, { useEffect, useState } from 'react';
import ShowGenText from './ShowGenText';
import ClipLoader from "react-spinners/ClipLoader";

function GeneratedTextBox({ textOption }) {
    var textCategory;
    let [loading, setLoading] = useState(true);
    let [items, setItems] = useState([]);

    const fetchGeneratedText = async () => {
      console.log("run!")
      console.log(textOption)
      console.log(textCategory)
      switch (textOption) {
          case 'Tweet':
              textCategory = "tweet"
              break
          case 'Rap Song':
            textCategory = "rapSong"
            break
          case 'Poem':
              textCategory = "poem"
              break
          case 'Webpage':
              textCategory = "site"
              break
          default:
              textCategory = null
              break
      }

        const params = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                "category": textCategory,
                "wordCount": 45 
             })
        }

        await fetch(`https://l6ai92ysdi.execute-api.us-east-2.amazonaws.com/dev/api/generate`, params)
          .then(response => {
            return response.json()
          })
          .then(data => {
            console.log(data)
            console.log(data.phrases)
            setItems(data.phrases)
            setLoading(false);
          })
          .catch(err =>{
            console.log(err);
            setItems(['Error fetching tickets!'])
            setLoading(false);
          })
      };
    
      useEffect(() => {
        fetchGeneratedText()
      }, [])

    return (
        <div>
            { textCategory }
            {loading ? <ClipLoader /> : <ShowGenText items={items} />}
        </div>
    );
}

export default GeneratedTextBox;