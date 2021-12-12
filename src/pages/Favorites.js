import React from 'react';

import FavGridBox from '../components/UI_components/FavGridBox';
import UpperMenu from '../components/UI_components/UpperMenu';


function Favorites(props){

    return (
        <div>
        {/* The header for the web app */}
            <UpperMenu/>
        {/* favorites section grid */}
            <FavGridBox />

        </div>

    )
}
export default Favorites;