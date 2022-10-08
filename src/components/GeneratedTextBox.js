import React, { useEffect, useState } from 'react';
import ShowGenText from './ShowGenText';
import ClipLoader from "react-spinners/ClipLoader";

function GeneratedTextBox({ textOption }) {
    const [textCategory, setTextCategory] = useState("");
    const [loading, setLoading] = useState(true);
    let items = [];

    const fetchGeneratedText = async () => {
      console.log("run!")
      console.log(textOption)
      console.log(textCategory)
      switch (textOption) {
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

        console.log("making request!")

        await fetch(`https://l6ai92ysdi.execute-api.us-east-2.amazonaws.com/dev/api/generate`, params)
          .then(async response => {
            let whatever = await response.json()
            console.log(whatever)
            return response.json()
          })
          .then(data => {
            console.log(data)
            console.log(data.phrases)
            items = data.phrases
            setLoading(false);
          })
          .catch(err =>{
            console.log(err);
            items = ['Error fetching generated text!']
            setLoading(false);
          })
      }
    };
  
    useEffect(() => {
      fetchGeneratedText()
    });

    return (
        <div>
            {loading ? <ClipLoader /> : <ShowGenText items={items} />}
        </div>
    );
}

export default GeneratedTextBox;