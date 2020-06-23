import React, { Component } from 'react';
import {Modal, Col, Row} from 'react-bootstrap';
import {PlayCircleFilledRounded} from '@material-ui/icons';
import { Input } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Meal from './Meal';
import escapeRegExp from 'escape-string-regexp';
class MealDialog extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            meal: "",
            loading: false,
            meals: [],
            showingMeals: []
        }
    }
    callAPI() {
        fetch("http://localhost:5000/meals")
            .then(res => res.json())
            .then(res => this.setState({ meals: res }));
            const {meals}= this.state;
        const {meal}= this.state;
        let showingMeals
        if(meal){
            const match= RegExp(escapeRegExp(meal),'i');
            showingMeals= meals.filter((m)=> match.test(m.category));        }
        else{
            showingMeals= meals;
        }
        this.setState({showingMeals: showingMeals, loading: false});
    }
    handleChange = event => {
        this.setState({meal: event.target.value});
    }
    componentDidMount(){
        this.callAPI();
    }
    searchMeal= event => {
        this.setState({loading: true});
        if(this.state.meal)
            this.callAPI();
        else{
            this.setState({loading: false, showingMeals: []})
        }
    }
    componentWillUnmount(){
        this.setState({showingMeals: [], meals: []});
    }
    render()
    {
        
        return (
        <Modal
            size="lg"
            {...this.props}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
                <Modal.Body>
                    <div style={{display: this.state.loading?"none": "visible"}}>
                        <Row style={{marginBottom: "2rem"}}>
                            <Col align="center" className="headings">
                                Find the meal for {this.props.day} {this.props.meal}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Input fullWidth="true" onChange={this.handleChange} placeholder="Search Foods"/>
                            </Col>
                            <Col xs={1}>
                            <PlayCircleFilledRounded className="calendar-icon" onClick={this.searchMeal}/>
                            </Col>
                        </Row>
                    </div>
                    <Row style={{margin:"2rem"}}>  
                    {
                        this.state.loading ? 
                            <Col align="center">
                                <CircularProgress/>
                            </Col> :
                        this.state.showingMeals.map(m => 
                            <Col key={m.id} xs={7} sm={6} md={5} lg={4} xl={3}>
                                <Meal  meal={m}/>
                            </Col>
                    )}
                            
                    </Row>
            </Modal.Body>
        </Modal>
        );
    }
}
export default MealDialog;