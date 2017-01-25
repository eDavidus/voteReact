import React, { PropTypes } from 'react';

const IsRole = ({role, children}) => {
    if (Roles.userIsInRole(Meteor.userId(), role)) {
        return children;
    }
    return null;
}

// to define every props used in a component, for testing
IsRole.propTypes = {
    // role: PropTypes.string.isRequired,
    role: PropTypes.oneOfType([
        // needs to be of one of these types
            PropTypes.string,
            PropTypes.array
        ]).isRequired,
    children: PropTypes.object,
}

export default IsRole;