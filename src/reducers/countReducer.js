const initState = {
    count: 0
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case "I":
            return {
                count: state.count + 1
            };
        case "D":
            return {
                count: state.count - 1
            };
        default: 
            return state;    
    }
}

export default rootReducer;