import { create } from 'zustand';

const useErrorDataStore = create((set) => ({

    selectedLocation: '전체',
    setSelectedLocation: (data) => set({ selectedLocation: data }),
    
    selectedDate: '2024-04-12',
    setSelectedDate: (date) => set({ selectedDate: date}),

    selectedErrorData: [],
    setSelectedErrorData: (data) => set({ 
        selectedErrorData: data.sort((a,b) => b.timestamp.localeCompare(a.timestamp)) // desc 
    }), 

}));

export default useErrorDataStore;