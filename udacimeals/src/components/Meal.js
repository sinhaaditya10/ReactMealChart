import React, { Component } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { updateMeal } from '../Actions';
import { connect } from 'react-redux';
class Meal extends Component {
    render() { 
        const {Meal,day,meal,selectRecipe}= this.props;

        return (
            <Card className="meal-card" onClick={() => selectRecipe(Meal, day, meal)}>
                <Row>
                    <Col align="center">
                        <img src={Meal.photoURL} alt= {Meal.name} className="meal-img"/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <label>{Meal.name}</label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <label>{Meal.calories}</label>
                    </Col>
                </Row>
            </Card>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return{
        selectRecipe: (Meal,day,meal) => dispatch(updateMeal(Meal,day,meal))
    }
    
}
export default connect(null,mapDispatchToProps)(Meal);