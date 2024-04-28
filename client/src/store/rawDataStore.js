import { create } from 'zustand';

const useRawDataStore = create((set) => ({
    todayDate: '2024-04-26',// ❗️수정필요 - 당일 날짜로 
    todayRawData: [],
    setTodayRawData: (data) => set({
        todayRawData: data.sort((a,b) => a.timestamp.localeCompare(b.timestamp))
    }),
    addTodayRawData: (data) => set(state => ({
        todayRawData: [...state.todayRawData].push(data)
    })),

    selectedLocation: '전체',
    setSelectedLocation: (data) => set({ selectedLocation: data }),
    selectedDate: '2024-04-26',// ❗️수정필요 - 기본 값은 당일 날짜로
    setSelectedDate: (data) => set({
        selectedDate: data,
    }),
    selectedRawData: [],
    setSelectedRawData: (data) => set({
        selectedRawData: data.sort((a,b) => a.timestamp.localeCompare(b.timestamp))
    }),

}));

export default useRawDataStore;