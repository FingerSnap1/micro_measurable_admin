import { create } from 'zustand';

const useErrorDataStore = create((set) => ({
    errorData: [],
    setErrorData: (data) => set({ errorData: data }),
    
    selectedDate: '2024-04-12',
    setSelectedDate: (date) => set({ selectedDate: date}),

}));

export default useErrorDataStore;