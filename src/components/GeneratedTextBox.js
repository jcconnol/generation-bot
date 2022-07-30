import React, { useState } from 'react';

function GeneratedTextBox({ textOption }) {
    
    switch (textOption) {
        case 'tweet':
            return (
              <div>tweet.</div>
            )
        case 'poem':
            return (
              <div>poem.</div>
            )
        case 'site':
            return (
                <div>site.</div>
            )
        default:
            return (
              <div>You are a User.</div>
            )
    }

    return (
        <div>
            { textOption }
        </div>
    );
}

export default GeneratedTextBox;