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

    function onSelect(event) {
        setTextOpt(event.value)
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
            <div className='gen-text-container'>
                <GeneratedTextBox textOption={textOption} />
            </div>
        </div>
    );
}

export default Home;