import React, { useState, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import styles from 'react-dropdown/style.css';
import ShowGenText from '../components/ShowGenText';
import PaginatedItems from "../components/ItemPage";
import "../styles/home.css"
import "../styles/pagination.css"
import ClipLoader from "react-spinners/ClipLoader";

function Home() {
    var phrases = [] 
    const options = [
        'Poem', 'Tweet', 'Webpage', 'Rap Song'
    ];

    var defaultOption = options[0];
    const [textOption, setTextOpt] = useState("Poem")
    const [generatedItems ,setGeneratedItems] = useState([])
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);

    const fetchGeneratedText = async (textCategory) => {
        var genLimit = 5;
        var wordCount = 45;
        switch (textCategory) {
          case 'Tweet':
            textCategory = "tweets"
            genLimit = 15;
            wordCount = 45;
            break
          case 'Rap Song':
            textCategory = "rapSongs"
            genLimit = 5;
            wordCount = 45;
            break
          case 'Poem':
            textCategory = "poems"
            genLimit = 15;
            wordCount = 45;
            break
          case 'Webpage':
            textCategory = "sites"
            genLimit = 3;
            wordCount = 45;
            break
          default:
            textCategory = ""
            genLimit = 0;
            wordCount = 1;
            break
        }

        if(textCategory){
          const params = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                  'category': textCategory,
                  'wordCount': wordCount,
                  'genLimit': genLimit
                })
          }

          phrases = ['Error fetching generated text!']

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
            })
          
          await setGeneratedItems(phrases)
          await setLoading(false);
          console.log("generated items")
          console.log(phrases)
          console.log(loading)
        }
    };

    const onSelect = async (event) => {
        // fetchGeneratedText(event.value)
        setTextOpt("")
        setTextOpt(event.value)
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
                <div className='paginated-items'>
                    {/* {loading ? <ClipLoader /> : <ShowGenText textOption={textOption}  items={generatedItems} />} */}
                    <PaginatedItems items={generatedItems} itemsPerPage={1} />
                    {/* <ShowGenText textOption={textOption}  items={phrases} /> */}
                </div>
            </div>
        </div>
    );
}

export default Home;