import React from 'react';
import ReactDOM from 'react-dom';



class ChatRoom extends React.Component{
  constructor() {
  	super();
  	this.state = {
  		messages: '',
  		inputText: '',
  		connection: ''
  	};
  	this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(event) {
    this.state.connection.send(this.state.inputText);
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({inputText: event.target.value});
  }

  componentDidMount(){
    // this is an "echo" websocket service for testing pusposes
    this.state.connection = new WebSocket('ws://localhost:8000/chat/');
    // listen to onmessage event
    this.state.connection.onmessage = evt => { 
      // add the new message to state
        this.setState({
        	messages : this.state.messages.concat([ evt.data ])
      	});
    };

    // for testing: sending a message to the echo service every 2 seconds, 
    // the service sends it right back
    
    /*
    setInterval( _ =>{
        this.connection.send( "hello, websocket\n" )
    }, 2000 );*/
	
	}

    render() {
    // render the messages from state:
    //const messages = this.state.messages;
    return (
    	<div>
    	  <ChatBox messages={this.state.messages}/>
    	  <InBox 
    	    handleClick={this.handleClick} 
    	    inputText={this.state.inputText}
    	    handleChange={this.handleChange}/>
    	</div>
    	);
    }

  
};

class ChatBox extends React.Component{
	render() {
		return (
			<div> {this.props.messages} </div>
		);
	}
}

class InBox extends React.Component{
	render() {
		return (
			<form>
				<input type="text" value={this.props.inputText} onChange={this.props.handleChange} />
				<p>
				  <button onClick={this.props.handleClick}> Submit </button>
				</p>
			</form>
		);
	}
}

ReactDOM.render(
		<ChatRoom />,
		document.getElementById('tester1')
	);