import React, {Component} from 'react';
import './UrlBox.css';
class UrlBox extends Component {
    state = {
        currentText: ""
    }
    onChangeHandler = (e) => {
        let data = e.target.value;
        this.setState({currentText: data})
    };

    onClickHandler = (e) =>{
        this.props.setUrl(this.state.currentText);
    }

    render() {
        return (
            <div className="UrlBox">
                <input type="text" className="urlbox"
                    onChange={
                        this.onChangeHandler
                    }
                    value={
                        this.currentText
                    }
                    onKeyPress={
                        this.keypressHandler
                    }
                    placeholder="Enter a URL to search!"></input>
                <button className="search-button btn btn-outline-secondary" type="button" onClick={this.onClickHandler}>CHECK</button>
            </div>
        );
    }
}

export default UrlBox;
