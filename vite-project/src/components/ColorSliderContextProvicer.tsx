import React, { useReducer } from "react";

type colorType = { R: number, G: number, B: number };
enum colorChannel { R = "R", G = "G", B = "B"}

type stateType = { 
    color: colorType
    changeColor: (color: colorType) => void
};

type ColorAction = 
    { type: "CHANGE_COLOR"; value: number; part: colorChannel } |
    { type: "REPLACE_COLOR"; value: colorType } |
    { type: "RESET_COLOR"; part: colorChannel }
;

const colorReducer = (state: stateType, action: ColorAction) => {
    const newState = {...state};
    const type = action.type;

    switch(type) {
        case "RESET_COLOR":
            return {color: {R: 0, G: 0, B: 0}}
        case "CHANGE_COLOR":
            switch (action.part) {
                case colorChannel.R: {
                    newState.color.R = action.value;
                    return newState;
                }
            }
        default:
            return state;
    }
}


const initialState: stateType = { 
    color: {R: 0, G: 0, B: 0 }, 
    changeColor: (color: colorType) => { console.log(color)} 
};


export const ColorSlidersContext = React.createContext(initialState);


interface IColorSliderProvider {
    children: React.ReactNode;
}

export const ColorSliderContextProvider: React.FC<IColorSliderProvider> = ({ children }) => {
    const [color, setColor] = React.useState<colorType>({R: 0, G: 0, B: 0 });
    const [state, dispatch] = useReducer(colorReducer, initialState);

    const changeColor = (color: colorType) => {
        setColor(color);
    };

    return (
        <ColorSlidersContext.Provider value={{ color, changeColor }}>
            {children}
        </ColorSlidersContext.Provider>
    );
}

export default ColorSliderContextProvider;
