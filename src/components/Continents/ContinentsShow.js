import React from 'react'
import axios from 'axios'
import { Link }  from 'react-router-dom'

import  { Header, Grid, Segment } from 'semantic-ui-react'
class ContinentsShow extends React.Component {

  constructor() {
    super()

    this.state = {}
  }

  getStyle(city) {
    return {
      width: 300,
      height: 300,
      backgroundImage: `url(${city.image})`,
      backgroundSize: 'cover'
    }
  }

  componentDidMount(){
    axios.get(`/api/continents/${this.props.match.params.id}`)
      .then(res => this.setState({ continents: res.data }))
  }


  render (){
    if(!this.state.continents) return null
    console.log(this.state.continents.cities)
    return(
      <div>
        <Header id='continentsHeader'>
          <Header as='h1' className='headingContinentCity'>{this.state.continents.name}</Header>
        </Header>
        <Grid stackable columns={4}>
          <Grid.Row>
            {this.state.continents.cities.map(city =>
              <Grid.Column key={city._id}>
                <Link to={`/cities/${city._id}`}>
                  <Segment circular id='circle' style={this.getStyle(city)}>
                    <Header as='h2' className='segmentHeader'>
                      {city.name}
                    </Header>
                  </Segment>
                </Link>
              </Grid.Column>
            )}
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default ContinentsShow
