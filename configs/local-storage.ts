import { MMKV } from 'react-native-mmkv'
import { StateStorage } from 'zustand/middleware'

const mmkvStorage = new MMKV()

export const ZustandStorage: StateStorage = {
    getItem: (name) => {
        const value = mmkvStorage.getString(name)
        if (!value) return null
        try {
            return JSON.parse(value)
        } catch {
            return null
        }
    },
    setItem: (name, value) => {
        mmkvStorage.set(name, JSON.stringify(value))
    },
    removeItem: (name) => {
        mmkvStorage.delete(name)
    },
}
