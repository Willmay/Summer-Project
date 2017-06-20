import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class Nav extends React.Component{


    render() {
    return (
    	<div>
    	  <h1> Nav Bar </h1>
    	</div>
    	);
    }

  
};

module.exports = {
	Nav: Nav,
}