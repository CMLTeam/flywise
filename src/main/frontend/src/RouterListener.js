import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {routeChanged} from "./redux/actions";

class RouterListener extends Component {
    componentWillMount() {
        this.unlistenRouting = this.props.history.listen((location, action) => {
            this.props.handleRoutingChange(location, action)
        });
    }

    componentWillUnmount() {
        this.unlistenRouting()
    }

    render() {
        return null;
    }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    handleRoutingChange: (location, action) => {
        dispatch(routeChanged(location, action));
    }
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RouterListener));