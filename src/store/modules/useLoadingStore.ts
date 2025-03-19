import {create} from 'zustand'

interface State {
  count: number;
  loading: boolean,
}
type Action = { 
  show: () => void,
  hide: () => void,
}

/**
 * 响应有快有慢，第一个请求完成后就给loading设置false结束了，实际我们要最后一个请求完成之后才结束loading，所以需要计数。
 */
export const useLoadingStore = create<State & Action>((set) => ({
  count: 0,//计录发送请求的数量
  loading: false,
  show: () => set((state) => ({ ...state ,loading: true, count: state.count + 1 })),
  hide: () => set((state) => ({ ...state ,loading: (state.count - 1>0), count: state.count - 1 })),
}))