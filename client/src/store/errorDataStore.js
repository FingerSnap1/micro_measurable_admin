import { create } from 'zustand';

const useErrorDataStore = create((set) => ({

    selectedLocation: '전체',
    setSelectedLocation: (data) => set({ selectedLocation: data }),
    
    selectedDate: new Date().toISOString().slice(0, 10),
    setSelectedDate: (date) => set({ selectedDate: date}),

    selectedErrorData: [],
    setSelectedErrorData: (data) => set({ 
        selectedErrorData: data.sort((a,b) => b.timestamp.localeCompare(a.timestamp)) // desc 
    }), 

}));

export default useErrorDataStore;