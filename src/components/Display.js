import React from "react";

const Display = (props) => {

    return (
        <div>
            <ul>
                Display
                {/* {
                    props.input.map( (x) => {
                        return <li key={Math.random()}>
                                {x.name}
                                <img src={x.sprites.versions["generation-v"]["black-white"].animated.front_default} />
                                </li>
                    })
                } */}
            </ul>           
        </div>
    )
};

export default Display;