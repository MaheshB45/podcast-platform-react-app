import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    podcasts: [],
    filterPodcasts:[]
}


const podcastsSlice = createSlice(
 {
    name : 'podcast',
    initialState,
    reducers:{
        setPodcasts:(state,action)=>{
            state.podcasts = action.payload;
        }
        ,
        setFilterPodcasts:(state,action)=>{
            state.filterPodcasts = action.payload;
        }
    }
 }
)

export const {setPodcasts,setFilterPodcasts} = podcastsSlice.actions;

export default podcastsSlice.reducer;