import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
class Meal extends Component {
    render() { 
        return (
            <Card style={{textAlign: "center", padding: "0.5rem", margin: "0.2rem"}}>
                <img src={this.props.meal.photoURL} style={{width: "7rem", height: "5rem", textAlign: "center"}} alt= "#ffff"/>
                <label>{this.props.meal.name}</label>
                <label>{this.props.meal.calories}</label>
            </Card>
        );
    }
}
 
export default Meal;