import React from 'react';

const ErrorPage = ({message}) => {
    return (
         <div className="text-red-500 text-xl text-center mt-20">
                {message}
            </div>
    );
};

export default ErrorPage;