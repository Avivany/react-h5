// store/authStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// 创建带immer中间件的store
export   const useAuthStore = create<State &Action>()(
  //使用immer中间件进行包裹设置函数（set）
  immer(
    //使用persist中间件进行持久化存储
    persist(
    (set) => ({
      token: null,
      userInfo: null,
      isAuthenticated: false,
      login: (token, userInfo) => 
        set((state) => ({ ...state, token, userInfo, isAuthenticated: true })),
      logout: () => 
        set((state) => ({ ...state, token: null, userInfo: null, isAuthenticated: false }))
    }),
    {
      name: 'auth-storage',
      // partialize: (state) => ({
      //   token: state.token,
      //   userInfo: state.userInfo,
      //   isAuthenticated: state.isAuthenticated
      // })
    }
  ))
  
)


