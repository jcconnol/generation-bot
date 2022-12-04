import React, { useState } from 'react';
import GeneratedTextBox from '../components/GeneratedTextBox';
import Dropdown from 'react-dropdown';
import styles from 'react-dropdown/style.css';
import "../styles/home.css"

function Home() {
    const options = [
        'Poem', 'Tweet', 'Webpage', 'Rap Song'
    ];

    var defaultOption = options[0];
    const [textOption, setTextOpt] = useState(defaultOption)
    const [forceUpdate, setForceUpdate] = useState(true)

    const onSelect = (event) => {
        console.log(event.value)
        setTextOpt(event.value)
        setForceUpdate(!forceUpdate)
    }

    const onClickRegenerate = async (event) => {
        await setTextOpt(null)
        await setTextOpt(textOption)
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
            <div className='regerate-button-container'>
                <button className='regerate-button' onClick={onClickRegenerate}>Retrieve</button>
            </div>
            <div className='gen-text-container'>
                <GeneratedTextBox textOption={textOption} forceUpdate={forceUpdate} />
            </div>
        </div>
    );
}

export default Home;