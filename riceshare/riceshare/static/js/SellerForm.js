import React from 'react';
import ReactDOM from 'react-dom';

class SellerForm extends React.Component  {
  constructor(props)  {
    super(props);
    this.state = {

      introduction: '',
      goal: '',
      chef_type: '',
      chef_experience: '',
      cuisine_type: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(event) {
    event.preventDefault();

    const sellerInfo = {
      user: 1,
      introduction: this.state.introduction,
      goal: this.state.goal,
      chef_type: this.state.chef_type,
      chef_experience: this.state.chef_experience,
      cuisine_type: this.state.cuisine_type,
    };
    //alert(sellerInfo.introduction);

    this.handleAjaxRequest(sellerInfo);

  }

  handleChange(event) {
    const target = event.target
    const value = target.value
    const id = target.id

    this.setState({
      [id]: value 
    });
  }

  handleAjaxRequest(sellerInfo)	{
  	const csrftoken = Cookies.get('csrftoken');
  	let request = axios({
          method: 'post',
          url: '/api/v1/seller/',
          data: sellerInfo, 
          headers: {'X-CSRFToken': csrftoken}
        });

    request.then(response => {
            console.debug(response.data);
      })
        .catch(error => {
            console.error(error);
        })

  }

  render()  {
    return  (
      <div>
        <form className='form' onSubmit={this.handleSubmit}>
          <label>Introduction 
            <input 
              id='introduction'
              type='text'
              autoComplete='off'
              value={this.state.introduction}
              onChange={this.handleChange}
            />
          </label>

          <br />
          
          <label>Goal
            <select 
              id='goal'
              value={this.state.goal} 
              onChange={this.handleChange}>
                <option value="earn money">Earn Money</option>
                <option value="meet new friend">Meet new friends</option>
                <option value="personal interests">Personal interests</option>
            </select>
          </label>

          <br />

          <label>Chef_type
            <select 
              id='chef_type'
              value={this.state.chef_type} 
              onChange={this.handleChange}>
                <option value="chef1">chef1</option>
                <option value="chef2">chef2</option>
                <option value="chef3">chef3</option>
            </select>
          </label>

          <br />

          <label>Chef_experience
            <select 
              id='chef_experience' 
              value={this.state.chef_experience} 
              onChange={this.handleChange}>
                <option value="New-bie">New-bie</option>
                <option value="Self taught">Self taught</option>
                <option value="Professional">Professional</option>
            </select>
          </label>

          <br />

          <label>Cuisine_type
            <select 
              id='cuisine_type'
              value={this.state.cuisine_type} 
              onChange={this.handleChange}>
                <option value="asian">Asian</option>
                <option value="mediterrean">Mediterrean</option>
                <option value="mexican">Mexican</option>
                <option value="spanish">Spanish</option>
                <option value="italian">Italian</option>
            </select>
          </label>

          <br />

          <button
            type='submit'
            disabled={!this.state.introduction}>
            submit
          </button>


        </form>
      </div>
    )
  }
}