import React, {Component} from 'react';
import './App.css';
import UrlBox from './Components/UrlBox/UrlBox.jsx';

import {API_KEY, client_id} from "./API/secrets.jsx"
let res;
class App extends Component {
    state = {
        currUrl: "www.google.com",
        result: ""
    }

    lookup =  async (url) => {

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
                            clientId: client_id,
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
            this.setState({result: "SAFE"})
        } else {
            console.log({url, type: res.matches[0].threatType, flagged: true, type: res.matches[0].threatType});
            this.setState({result: "MALICIOUS"})
        }
    }

    setUrl = (urlvalue) => {
        this.setState({currUrl: urlvalue});
        // Function Call to check the new URL :
        
        this.lookup(this.state.currUrl);
    
        this.setState({
            result :"",
        });
    }

    componentDidUpdate = async () => {
        if (this.state.result == "SAFE") {
            document.body.style.backgroundColor = "green";
            setTimeout(function colorChange() {
                document.body.style.backgroundColor = "#13262fe1";
            }, 5000)

        } else if(this.state.result=="MALICIOUS"){
            document.body.style.backgroundColor = "red";
            setTimeout(function colorChange() {
                document.body.style.backgroundColor = "#13262fe1";
            }, 5000)
        }
        
    }

    render() {
        return (
            <div className="App">
                <div>
                    <UrlBox setUrl={
                        this.setUrl
                    }></UrlBox>
                </div>
                <div className="Result"
                    value={
                        this.state.result
                }></div>

            </div>

        );
    }
}

export default App;
