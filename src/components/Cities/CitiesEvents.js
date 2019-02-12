import React from 'react'
import axios from 'axios'

class CitiesEvents extends React.Component {

  constructor() {
    super()

    this.state = {
      events: {}
    }
  }

  componentDidMount(){
    axios.get(`/api/events?town=${this.props.cityName}`)
      .then(res => this.setState({ events: res.data }))
  }







  render(){
    if(!this.state.events.results) return null
    console.log(this.state.events.results)
    return(
      <div>
      {this.state.events.results.map(event =>
        <h1 key={event.id}>{event.eventname}</h1>

      )}
      </div>
    )
  }



}
export default CitiesEvents