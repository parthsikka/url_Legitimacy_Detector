import React, {Component} from 'react';
import './App.css';
import UrlBox from './Components/UrlBox/UrlBox.jsx';

import {API_KEY,client_id} from "./API/secrets.jsx"

class App extends Component {
    state = {
        currUrl: "www.google.com"
    }

lookup  = async (url)  => {
    let res;
    try {
        res = await fetch(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${
            API_KEY
        }`, {
            method: 'POST',
            headers: {
                'User-Agent': 'PARTH_SIKKA',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(
                {
                    client: {
                        clientId: client_id ,
                        clientVersion: '1.5.2'
                    },
                    threatInfo: {
                        threatTypes: [
                            'MALWARE', 'SOCIAL_ENGINEERING'
                        ],
                        platformTypes: ['ANY_PLATFORM'],
                        threatEntryTypes: ['URL'],
                        threatEntries: [{
                                url
                            }]
                    }
                }
            )
        }).then(x => x.json());
    } catch (err) {
        console.error(err);
        throw new Error('Failed to fetch from Google\'s servers. More information is likely above!');
    };

    if (! res.matches || res.matches.length < 1) {
    console.log({url, type: 'SAFE', flagged: false});
    }else{
     console.log({url, type: res.matches[0].threatType, flagged: true, type: res.matches[0].threatType});
    }
} 

    setUrl = (urlvalue) => {
        this.setState({currUrl: urlvalue}) ;
    }
    
    async componentDidUpdate(){
       await this.lookup(this.state.currUrl);
    }

    render() {
        return (
            <div className="App">
                <div>
                    <UrlBox setUrl={
                        this.setUrl
                    }></UrlBox>
                </div>
            </div>

        );
    }
}

export default App;
