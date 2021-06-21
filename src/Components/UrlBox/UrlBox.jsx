import React, {Component} from 'react';

class UrlBox extends Component {
    state = {
        currentText : "" ,
    }
    onChangeHandler = (e) => {
       
        let data = e.target.value ; 
        this.setState({
            currentText : data ,
        })
    } ;

    keypressHandler =(e) =>{
        if(e.code=="Enter"){
            console.log(e);
            this.props.setUrl(this.state.currentText) ;
        }
        this.setState({
            currentText:"",
        })

        
    };
   
    render() {
        return (
            <div className="UrlBox">
                <input type="text" className="form-control" 
                onChange={this.onChangeHandler}
                value={this.currentText}
                onKeyPress={this.keypressHandler}
                placeholder="Enter URL!" ></input>
            </div>
        );
    }
}

export default UrlBox;
