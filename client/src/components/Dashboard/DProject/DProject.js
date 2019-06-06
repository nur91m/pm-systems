import React, { Component } from 'react'

export class DProject extends Component {

    constructor() {
        super();
        this.state = {
            currentProject: {}
        }
    }

    componentDidMount() {
        if(this.props.location.state.currentProject) {
            this.setState({currentProject: this.props.location.state.currentProject})
        }
        
    }
    render() {
        return (
            <div>
                <h5>{this.state.currentProject.orderNumber + ' - ' + this.state.currentProject.name}</h5>
            </div>
        )
    }
}

export default DProject
