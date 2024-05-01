import { create } from 'zustand';

const useRawDataStore = create((set) => ({

    selectedLocation: '전체',
    setSelectedLocation: (data) => set({ selectedLocation: data }),

    selectedDate: new Date().toISOString().slice(0, 10),
    setSelectedDate: (data) => set({ selectedDate: data }),

    selectedRawData: [],
    setSelectedRawData: (data) => set({
        selectedRawData: data.sort((a,b) => b.timestamp.localeCompare(a.timestamp)) // desc
    }),

}));

export default useRawDataStore;