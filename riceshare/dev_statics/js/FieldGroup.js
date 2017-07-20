import React from 'react';
//import ReactDOM from 'react-dom';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Col
} from 'react-bootstrap';

class FieldGroup extends React.Component {
  render() {
    return (
      <FormGroup controlId={this.props.id}>
      	<Col smOffset={4} sm={4}>
	        <FormControl 
	        	type={this.props.type}
	        	value={this.props.value}
	        	placeholder={this.props.placeholder}
	        	onChange={this.props.onChange}
	        	aria-label={this.props.label}
	        	required={this.props.required}
	        />
	    </Col>
        {this.props.help && <HelpBlock>{this.props.help}</HelpBlock>}
      </FormGroup>
    );
  }
}

/*
ReactDOM.render(
    <FieldGroup 
    	id = "formControlsText"
    	type="text"
    	label="Text"
    	placeholder="Enter text"
    	value="1" 
    />,
    document.getElementById('react-root')
  );
*/


module.exports = {
  FieldGroup: FieldGroup,
}
