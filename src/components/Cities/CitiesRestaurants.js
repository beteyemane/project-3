import React from 'react'
import axios from 'axios'

import { Header, Grid, Container, Segment } from 'semantic-ui-react'

class CitiesRestaurants extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      restaurants: {}
    }
  }

  componentDidMount(){
    axios.get(`/api/restaurants?city=${this.props.cityName}`)
      .then(res => {
        this.setState({ restaurants: res.data })
      })
  }

  getStyle(restaurant) {
    return {
      width: 300,
      height: 300,
      backgroundImage: `url(${restaurant.restaurant.featured_image})`,
      backgroundSize: 'cover'
    }
  }


  render(){
    if(!this.state.restaurants.restaurants) return null
    const resto = this.state.restaurants.restaurants
    console.log(resto[0].restaurant.name)
    return(
      <Container>
        <Header textAlign='center' className='heading4' as='h2'>
        Restaurants in {this.props.cityName}:
        </Header>
        <Grid columns={4}>
          <Grid.Row>
            {resto.map((restaurant,index) =>

              <Grid.Column key={index}>
                <Segment inverted circular id='circle' style={this.getStyle(restaurant)}>
                  <Header inverted as='h4'>
                    {restaurant.restaurant.name}
                    <Header.Subheader>
                      {restaurant.restaurant.cuisines}
                    </Header.Subheader>
                    <Header.Subheader>
                      {restaurant.restaurant.location.address}
                    </Header.Subheader>
                    <Header.Subheader>
                      Average cost for 2 people: {restaurant.restaurant.currency}{restaurant.restaurant.average_cost_for_two}
                    </Header.Subheader>
                  </Header>
                </Segment>
              </Grid.Column>

            )}
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

export default CitiesRestaurants