/**
 * Created by Han on 6/27/2017.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class UserCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            location: '',
            home: '',
            introduction: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    // handleImageChange(event) {
    //     const path='/media/user_pic/';
    //     let reader = new FileReader();
    //     let file = event.target.files[0];
    //     console.log(file);
    //
    //     reader.onloadend = () => {
    //         this.setState({
    //             file: path.concat(file.name),
    //             //imagePreviewUrl: reader.result
    //         });
    //     };
    //
    //     reader.readAsDataURL(file);
    // }

    handleSubmit(event) {
        let self = this;
        const updateInfo = {
            name: this.state.name,
            location: this.state.location,
            home: this.state.home,
            short_description: this.state.introduction
        };
        axios.put('/api/v1/users/4/', updateInfo).then(response => {
            console.log('updated successfully');
        }).catch(error => {
            console.log(error);
        });

        event.preventDefault();
    }

    componentDidMount() {
        let self = this;
        axios.get('/api/v1/users/4/').then(response => {
            console.log(response.data);
            self.setState({
                name: response.data['name'],
                location: response.data['location'],
                home: response.data['home'],
                introduction: response.data['short_description']
            });
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="col-xs-5">
                <form encType="multipart/form-data">
                    <label>
                        User's name:
                        <br/>
                        <input
                            className="form-control"
                            name="name"
                            type="text"
                            value={this.state.name}
                            onChange={this.handleInputChange}/>
                    </label>
                    <br/>
                    <label>
                        Where do you currently live?
                        <br/>
                        <input
                            className="form-control"
                            name="location"
                            type="text"
                            value={this.state.location}
                            onChange={this.handleInputChange}/>
                    </label>
                    <br/>
                    <label>
                        Where are you from?
                        <br/>
                        <input
                            className="form-control"
                            name="home"
                            type="text"
                            value={this.state.home}
                            onChange={this.handleInputChange}/>
                    </label>
                    <br/>
                    <label>
                        Introduction:
                        <br/>
                        <textarea
                            className="form-control"
                            name="introduction"
                            value={this.state.introduction}
                            onChange={this.handleInputChange}/>
                    </label>
                    <br/>
                    <button
                        className="btn btn-primary"
                        onClick={this.handleSubmit}>Update
                    </button>
                </form>
            </div>
        );
    }
}

module.exports = {
    UserCenter: UserCenter,
};
