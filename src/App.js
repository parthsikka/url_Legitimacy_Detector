import React, {Component} from 'react';
import './App.css';
import UrlBox from './Components/UrlBox/UrlBox.jsx';
import axios from "axios";
import {API_KEY, Basic_url,client_id} from "./API/secrets.jsx"
const SafeBrowsing = require('@auntodev/safe-browsing');
SafeBrowsing.authorize(
    API_KEY, // Your Google API key
    client_id // Optional. If not provided, 'unknown' is used.
);

class App extends Component {
    state = {
        currUrl: "https://www.google.com"
    }

    setUrl = (urlvalue) => {
        this.setState({currUrl: urlvalue})
    }
    
    // async componentDidMount() {
    //     let data = await axios.post(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`, {
    //         headers: {
    //             'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36',
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //             'URL':'https://www.google.com'
    //         },
    //         body: JSON.stringify({
    //             client: {
    //                 clientId: {client_id},
    //                 clientVersion: '1.5.2'
    //             },
    //             threatInfo: {
    //                 threatTypes: ['MALWARE','SOCIAL_ENGINEERING'],
    //                 platformTypes: ['ANY_PLATFORM'],
    //                 threatEntryTypes: ['URL'],
    //                 threatEntries: [ this.state.currUrl ]
    //             }
    //         })
    //     }) ; 
    //     console.log(data);

    // }
    async componentDidMount(){
       let data = await SafeBrowsing.lookup(this.state.currUrl);
        console.log(data);
    }

    render() {
        return (
            <div className="App">
                Enter Your Url to search for it!
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
