import React, { useState } from 'react';
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
    const [textOption, setTextOpt] = useState(defaultOption)
    const [textCategory, setTextCategory] = useState("")
    const [generatedItems ,setGeneratedItems] = useState([])
    const [loading, setLoading] = useState(false);

    const fetchGeneratedText = async () => {
        console.log("run!")
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

    const onSelect = async (event) => {
        console.log(event.value)
        await fetchGeneratedText()
    }

    return (
        <div>
            <h1 className='center-header'>
                Generate a 
                <Dropdown 
                    className='gen-option-dropdown'
                    menuClassName='gen-dropdown-menu'
                    options={options}
                    onChange={onSelect}
                    value={defaultOption} />
            </h1>
            {/* <div className='regerate-button-container'>
                <button className='regerate-button' onClick={onSelect}>Retrieve</button>
            </div> */}
            <div className='gen-text-container'>
                <div>
                    {loading ? <ClipLoader /> : <ShowGenText textOption={textOption}  items={generatedItems} />}
                </div>
            </div>
        </div>
    );
}

export default Home;