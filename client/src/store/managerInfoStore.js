import { create } from 'zustand';

const useManagerInfoStore = create((set) => ({
    managers: [],
    setManagers: (data) => set({ managers:data }),
    // battery, location, nodeAddress, latitude, longitude

}));

export default useManagerInfoStore;