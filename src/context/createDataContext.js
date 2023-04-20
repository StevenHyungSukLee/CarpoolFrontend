// helper component that creates Context
import React, {useReducer} from "react";

export default (reducer, actions, defaultValue) => {
    const Context= React.createContext()

    const Provider = ({children}) => {
        const [state, dispatch] = useReducer(reducer, defaultValue)

        const boundActions = {}
        for (let key in actions) {
            boundActions[key] = actions[key](dispatch)
        }

        return (
            <Context.Provider value={{ state, ...boundActions }}>
                {children}
            </Context.Provider>
        )
    }

    // Provider: component that makes data available to everything inside app
    // Context: object that is used to get access to information from child component
    return {Context, Provider}
}