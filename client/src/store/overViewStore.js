import { create } from 'zustand';

const useOverViewStore = create((set) => ({
    selectedLocation: '',
    setSelectedLocation: (data) => set({ selectedLocation: data }),

    rawData: [],
    setRawData: (data) => set({
        rawData: data.sort((a,b) => a.timestamp.localeCompare(b.timestamp)) // asc
    }),

    errorData: [],
    setErrorData: (data) => set({
        errorData: data.sort((a,b) => b.timestamp.localeCompare(a.timestamp)) // desc
    })
}));

export default useOverViewStore;