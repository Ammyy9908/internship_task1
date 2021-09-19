export const setUser =(user)=>({
    
    type:"SET_USER",
    user

})

export const setModal =(isModal)=>({
    
        type:"SET_MODAL",
        isModal
    
})


export const setRoom = (rooms)=>({
    type:"SET_ROOM",
    rooms
})


export const addRoom = (room)=>({
    type:"ADD_ROOM",
    room
})