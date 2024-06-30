import type { InjectionKey, Ref } from 'vue'

export type emailRefProvider = Ref<HTMLDivElement | null>

export const emailRefKey = Symbol(
  'Reference to the email wrapper, where the table#u_body element will be'
) as InjectionKey<Ref<HTMLElement | null>>
