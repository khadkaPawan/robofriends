import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll.js';
import ErrorBoundry  from '../components/ErrorBoundry';
// import { robots } from './robots';
// import { render } from '@testing-library/react';

class App extends Component {
    constructor () {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount () {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({ robots: users }));
    }

    onSearchChange = (event) => {
        this.setState ({ searchfield: event.target.value });
    }

    render() {
        const {robots, searchfield } = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        })
                                                                        
                // if (robots.length === 0) {
                //     return <h1>Loading</h1>  this is understandbel to below statemsnet

         return !robots.length ?
             <h1>Loading</h1>: 
    
             (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange = {this.onSearchChange} />

                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots} />

                        </ErrorBoundry>
                        
                    </Scroll>
                     
                </div>   
            );
            

                // if (!robots.length) {
                //     return <h1>Loading</h1>
                // }else {
                //     return (
                //         <div className='tc'>
                //             <h1 className='f1'>RoboFriends</h1>
                //             <SearchBox searchChange = {this.onSearchChange} />

                //             <Scroll>
                //                 <CardList robots={filteredRobots} />
                //             </Scroll>
                            
                //         </div>   
                //     );
                // }    


    }
    
}

export default App;
