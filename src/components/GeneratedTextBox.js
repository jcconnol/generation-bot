import React, { useEffect, useState } from 'react';
import ShowGenText from './ShowGenText';
import ClipLoader from "react-spinners/ClipLoader";

function GeneratedTextBox(props) {
    const [textCategory, setTextCategory] = useState("");
    const [loading, setLoading] = useState(true);
    const [generatedItems, setGeneratedItems] = useState([]);

    const fetchGeneratedText = async () => {
        console.log("run!")
        console.log(props.textOption)
        console.log(textCategory)
        switch (props.textOption) {
          case 'Tweet':
            setTextCategory("tweet")
            break
          case 'Rap Song':
            setTextCategory("rapSong")
            break
          case 'Poem':
            setTextCategory("poem")
            break
          case 'Webpage':
            setTextCategory("site")
            break
          default:
            setTextCategory("")
            break
        }

        if(textCategory){
          const params = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                  'category': textCategory,
                  'wordCount': 45 
                })
          }

          await fetch(`https://l6ai92ysdi.execute-api.us-east-2.amazonaws.com/dev/api/generate`, params)
            .then(response => {
              console.log("fetched!")
              return response.json()
            })
            .then(data => {
              console.log(data)
              console.log(data.phrases)
              setGeneratedItems(data.phrases)
              setLoading(false);
            })
            .catch(err =>{
              console.log(err);
              setGeneratedItems(['Error fetching generated text!'])
              setLoading(false);
            })
        }
      };
    
      useEffect(() => {
        fetchGeneratedText()
          
      }, [])

    return (
        <div>
            {loading ? <ClipLoader /> : <ShowGenText items={generatedItems} />}
        </div>
    );
}

export default GeneratedTextBox;