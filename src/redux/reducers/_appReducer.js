const intialState = {
    user:null,
    isModal:false,
    rooms:[]
}


function AppReducer(state=intialState,action){
        switch(action.type){
            case "SET_USER":
                return{
                    ...state,
                    user:action.user
                }

            case "SET_ROOM":
                return{
                    ...state,
                    rooms:action.rooms
                }

                case "ADD_ROOM":
                    return{
                        ...state,
                        rooms:[...state.rooms,action.room]
                    }

                case "SET_MODAL":
                    return{
                        ...state,
                        isModal:action.isModal
                    }

                
            default:{
                return state
            }
        }
}

export default AppReducer;