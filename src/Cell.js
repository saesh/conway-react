import * as React from 'react';

export default class Cell extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.alive !== nextProps.alive;
    }

    render() {
        return <div className={"cell" + (this.props.alive ? " alive" : " dead")}></div>
    }
}
