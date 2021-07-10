const userReducer = (state = { userData: [], update: {} }, action) => {
    switch (action.type) {
        case "CREATE_DATA":
            return {
                ...state,
                userData: action.payload,
                update: {},
                updateIndex: undefined,
            };
        case "FETCH_DATA":
            return {
                ...state,
                userData: action.payload,
            }
        case "DELETE_DATA":
            return {
                ...state,
                userData: action.payload,
            }
        case "DELETE_ALL_DATA":
            return {
                ...state,
                userData: action.payload,
            }
        case "FETCH_UPDATED_DATA":
            return {
                ...state,
                update: action.payload.updateData,
                updateIndex: action.payload.index,
            }
        case "UPDATE_DATA":
            return {
                ...state,
                userData: action.payload,
                update: {},
                updateIndex: undefined,
            }
        default:
            return state;
    }
}

export default userReducer;