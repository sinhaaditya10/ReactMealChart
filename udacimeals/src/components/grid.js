import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {EventAvailable} from '@material-ui/icons';
import MealDialog from './mealDialog';
import ShoppingList from './shoppingList';
class Grid extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            mealModalOpen: false,
            shoppingListModalOpen: false,
            day: "",
            meal: ""
        }
    }
    setMealModalShow(day, meal, status){
        this.setState({day: day, meal: meal, mealModalOpen: status});
    }
    setShoppingListModalShow(status)
    {
        this.setState({shoppingListModalOpen: status});
    }

    render() { 
        return (
            <Container fluid>
                <Row>
                    <Col align="center" style={{fontSize: "3rem"}}>
                        Meals Chart
                    </Col>
                    <Col className="shopping-list" align="right" onClick={() => this.setShoppingListModalShow(true)}>
                        Shopping List
                    </Col>
                </Row>
                <Row>
                    <Col className="headings">
                        
                    </Col>
                    <Col className="headings">
                        Breakfast
                    </Col>
                    <Col className="headings">
                        Lunch
                    </Col>
                    <Col className="headings">
                        Dinner
                    </Col>
                </Row>
                <Row>
                    <Col className="headings">Monday</Col>
                    <Col className="headings">
                        <EventAvailable className="calendar-icon" onClick={() => this.setMealModalShow("Monday", "Breakfast",true)}/>
                    </Col>
                    <Col className="headings"><EventAvailable className="calendar-icon"/></Col>
                    <Col className="headings"><EventAvailable className="calendar-icon"/></Col>
                </Row>
                <Row>
                    <Col className="headings">Tuesday</Col>
                    <Col className="headings"><EventAvailable className="calendar-icon"/></Col>
                    <Col className="headings"><EventAvailable className="calendar-icon"/></Col>
                    <Col className="headings"><EventAvailable className="calendar-icon"/></Col>
                </Row>
                <Row>
                    <Col className="headings">Wednesday</Col>
                    <Col className="headings"><EventAvailable className="calendar-icon"/></Col>
                    <Col className="headings"><EventAvailable className="calendar-icon"/></Col>
                    <Col className="headings"><EventAvailable className="calendar-icon"/></Col>
                </Row>
                <Row>
                    <Col className="headings">Thursday</Col>
                    <Col className="headings"><EventAvailable className="calendar-icon"/></Col>
                    <Col className="headings"><EventAvailable className="calendar-icon"/></Col>
                    <Col className="headings"><EventAvailable className="calendar-icon"/></Col>
                </Row>
                <Row>
                    <Col className="headings">Friday</Col>
                    <Col className="headings"><EventAvailable className="calendar-icon"/></Col>
                    <Col className="headings"><EventAvailable className="calendar-icon"/></Col>
                    <Col className="headings"><EventAvailable className="calendar-icon"/></Col>
                </Row>
                <Row>
                    <Col className="headings">Saturday</Col>
                    <Col className="headings"><EventAvailable className="calendar-icon"/></Col>
                    <Col className="headings"><EventAvailable className="calendar-icon"/></Col>
                    <Col className="headings"><EventAvailable className="calendar-icon"/></Col>
                </Row>
                <Row>
                    <Col className="headings">Sunday</Col>
                    <Col className="headings"><EventAvailable className="calendar-icon"/></Col>
                    <Col className="headings"><EventAvailable className="calendar-icon"/></Col>
                    <Col className="headings"><EventAvailable className="calendar-icon"/></Col>
                </Row>
                <MealDialog 
                show={this.state.mealModalOpen}
                onHide={() => this.setMealModalShow(false)}
                day={this.state.day} meal={this.state.meal}/>
                <ShoppingList 
                show={this.state.shoppingListModalOpen}
                onHide={()=> this.setShoppingListModalShow(false)}/>
            </Container>
        );
    }
}
 
export default Grid;