import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { clearMeal, selectRecipe } from '../Actions';
class GridMeal extends Component {
    render() { 
        const {Meal, day, meal, remove, selected}= this.props;
            return (
            <Card className="meal-card" style={{cursor: "initial"}} onClick={() => selected(Meal)}>
                <img src={Meal.photoURL} alt={Meal.name} className="grid-img"/>
                <label className="clear" onClick={()=> remove(day,meal)}>Clear</label>
            </Card>
        );
    }
}
function mapDispatchToProps(dispatch)
{
    return{
        remove: (day,meal) => dispatch(clearMeal(day,meal)),
        selected: data => dispatch(selectRecipe(data))
    }
}
export default connect(null,mapDispatchToProps)(GridMeal);