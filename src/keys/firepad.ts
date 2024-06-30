import type { InjectionKey, Ref } from 'vue'

export type FirepadResetProvider = {
  firepadReset: Ref<() => void>
  setFirepadReset: (cb: () => void) => void
}

export const firepadResetKey = Symbol(
  'A function to reset the firepad component and its history'
) as InjectionKey<FirepadResetProvider>
