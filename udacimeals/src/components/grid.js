import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {EventAvailable} from '@material-ui/icons';
import { connect } from 'react-redux';
import {PlayCircleFilledRounded} from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import Meal from './Meal';
import GridMeal from './GridMeal';
import Modal from 'react-modal';
class Grid extends Component {

    constructor(props)
    {
        super(props);
        this.state={
            foodModalOpen: false,
            shoppingModalOpen: false,
            day: null,
            search: '',
            meal: null,
            food: null,
            loadingFood: false,
        }
    }
    
    openFoodModal = (meal,day) => {
        this.setState(() => ({
            foodModalOpen: true,
            day,
            meal}));
    }
    onAfterClose = () => {
        this.setState(() => ({
            foodModalOpen: false,
            day: null,
            meal: null,
            food: null
        }));
    }
    openShoppingModal = () => {
        this.setState({shoppingModalOpen: true});
    }
    closeShoppingModal = () => {
        this.setState({shoppingModalOpen: false});
    }
    onInputChange = event => {
        this.setState({search: event.target.value});
    }
    searchFood = (e) => {
        if(!this.state.search)
        {
            return;
        }
        e.preventDefault();
        this.setState(() => ({
            loadingFood: true
        }));
        fetch(`http://localhost:5000/meals/${this.state.search}`)
            .then(res => res.json())
            .then(res => this.setState(() => ({ food: res, loadingFood: false })));
    }
    render() { 
        const { foodModalOpen, shoppingModalOpen}= this.state;
        const {calendar, ingredient}= this.props;
        const mealOrder= ['breakfast', 'lunch', 'dinner'];
        return (
            <Container fluid>
                <Row>
                    <Col align="left" style={{fontSize: "3rem", fontWeight: "bolder",fontFamily: "'Jost', sans-serif"}}>MealChart</Col>
                    <Col align="right"><label className="shopping-tab" onClick={this.openShoppingModal}>Shopping List</label></Col>
                </Row>
                <Row style={{marginLeft: "19rem"}}>
                    {
                        mealOrder.map((mealType) => (
                            <Col key={mealType} className="headings" style={{textTransform: "capitalize"}}>
                                {mealType}
                            </Col>
                        ))
                    }
                </Row>
                <Row>
                    <Col xs={3}>
                        {
                            calendar.map(({day}) => 
                            <Row key={day}><Col className="headings" style={{textTransform: "capitalize", textAlign: "left", marginBottom: "1.5rem"}} >{day}</Col></Row>
                            )
                        }
                    </Col>
                    <Col>
                        {
                            calendar.map(({day,meals}) => (
                                <Row key={day}>
                                    {
                                        mealOrder.map((meal) => (
                                            <Col key={meal} align="center" className="headings" style={{textAlign: "center", marginBottom: "1.3rem"}} >
                                                {meals[meal]
                                                ?<div>
                                                    <GridMeal Meal={meals[meal]} day={day} meal={meal}/>
                                                </div>
                                                : <EventAvailable className="calendar-icon" onClick={() => this.openFoodModal(meal,day)}/>
                                                }
                                            </Col>
                                        ))
                                    }
                                </Row>
                            ))
                        }
                    </Col>
                </Row>
                {
                    <div>
                    <Modal 
                    isOpen={foodModalOpen}
                    contentLabel="Modal"
                    ariaHideApp={false}
                    shouldCloseOnOverlayClick= {true}
                    shouldCloseOnEsc={true}
                    onRequestClose={this.onAfterClose}
                    >
                            {
                                this.state.loadingFood 
                                ? <Row><Col align="center"><CircularProgress/></Col></Row>
                                :
                                <Row>
                                    <Col>
                                        <input type="text" placeholder="Search Food" onChange={this.onInputChange} className="search-food"/>
                                    </Col>
                                    <Col xs={1}>
                                        <PlayCircleFilledRounded onClick={this.searchFood} className="search-btn"/>
                                    </Col>
                                </Row>
                            }
                        {
                            (this.state.food && this.state.loadingFood === false) &&
                            <Row style={{marginTop: "2rem"}}>
                                {
                                    this.state.food.map(meal => (
                                        <Col key={meal.id} align="center">
                                            <Meal Meal={meal} day={this.state.day} meal={this.state.meal}/>
                                        </Col>
                                    ))
                                }
                            </Row>
                        }
                    </Modal>
                    <Modal
                        isOpen={shoppingModalOpen}
                        contentLabel="Modal"
                        ariaHideApp={false}
                        shouldCloseOnOverlayClick= {true}
                        shouldCloseOnEsc={true}
                        onRequestClose={this.closeShoppingModal}>
                            <Row>
                                <Col align="center" className="headings">Your Shopping List</Col>
                            </Row>
                            <Row style={{marginTop: "2rem"}}>
                                <Col align="center">
                                    {
                                        ingredient.ingredients
                                    ? Object.entries(ingredient.ingredients).map((key,value) => (
                                    <Row key={key[0]}>
                                        <Col align="center" className="headings" style={{fontSize: "1rem"}}>{key[1]}</Col>
                                    </Row>
                                    ))
                                    : null
                                    }
                                </Col>
                            </Row>
                    </Modal>
                    </div>
                }
            </Container>
        );
    }
}
function mapStateToProps({food,calendar,ingredient})
{
    const dayOrder= ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    return{
        calendar: dayOrder.map(day => ({
            day,
            meals: Object.keys(calendar[day]).reduce((meals,meal) => {
                meals[meal]= calendar[day][meal]
                ?
                food[calendar[day][meal]]
                :null
                return meals;
            }, {})
        })),
        ingredient
    }
}


 
export default connect(mapStateToProps)(Grid);