import React, { useState, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import styles from 'react-dropdown/style.css';
import ShowGenText from '../components/ShowGenText';
import "../styles/home.css"
import ClipLoader from "react-spinners/ClipLoader";

function Home() {
    const options = [
        'Poem', 'Tweet', 'Webpage', 'Rap Song'
    ];

    var defaultOption = options[0];
    const [textOption, setTextOpt] = useState("Poem")
    const [generatedItems ,setGeneratedItems] = useState([])
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);

    const fetchGeneratedText = async (textCategory) => {
        switch (textCategory) {
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
            textCategory = ""
            break
        }

        if(textCategory){
          console.log("text CAt")
          const params = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                  'category': textCategory,
                  'wordCount': 45 
                })
          }

          var phrases = ['Error fetching generated text!']

          await fetch(`https://l6ai92ysdi.execute-api.us-east-2.amazonaws.com/dev/api/generate`, params)
            .then(response => {
              console.log("fetched!")
              return response.json()
            })
            .then(data => {
              phrases = data.phrases
            })
            .catch(err => {
              console.log(err);
              phrases = ['Error fetching generated text!']
            })
          
          setGeneratedItems(phrases)
          setLoading(false);
          console.log("generated items")
          console.log(phrases)
          console.log(loading)
        }
    };

    const onSelect = async (event) => {
        fetchGeneratedText(event.value)
    }

    useEffect(() => {
      fetchGeneratedText("Poem")
    }, [textOption])

    return (
        <div>
            <h1 className='center-header'>
                Generate a 
                <Dropdown 
                    className='gen-option-dropdown'
                    menuClassName='gen-dropdown-menu'
                    options={options}
                    onChange={onSelect}
                    value={textOption} />
            </h1>
            <div className='gen-text-container'>
                <div>
                    {/* {loading ? <ClipLoader /> : <ShowGenText textOption={textOption}  items={generatedItems} />} */}
                    <ShowGenText textOption={textOption}  items={generatedItems} />
                </div>
            </div>
        </div>
    );
}

export default Home;