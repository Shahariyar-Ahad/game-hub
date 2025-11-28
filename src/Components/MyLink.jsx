import React, { Children } from 'react';
import { NavLink } from 'react-router';

const MyLink = ({to,className,children}) => {
    return (
        <div>
            <NavLink to={to} className={({isActive})=> isActive ? 'text-blue-600 font-extrabold' : `${className} font-extrabold`}>{children}</NavLink>
        </div>
    );
};

export default MyLink;