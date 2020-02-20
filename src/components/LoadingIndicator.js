import React from 'react';
import Loader from 'react-loader-spinner';

export default function LoadingIndicator() {
    return (
        <Loader
            type="ThreeDots"
            color="blue"
            height={80}
            width={80}
        />
    );
}
