import React, {Component} from 'react';
import './Node.css';

type MyProps = {
    isBody: boolean,
    isFruit: boolean
}

export default class Node extends Component<MyProps> {
    render() {
        const {
            isBody,
            isFruit
        } = this.props;

        const extraClass =
            isFruit ? "fruit" :
            isBody ? "body" :
            "";

        return (
            <div className={`node ${extraClass}`} />
        );
    }
}
