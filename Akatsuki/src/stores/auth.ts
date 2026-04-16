import { defineStore } from 'pinia'
import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  loading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    loading: false
  }),

  actions: {
    async fetchUser(): Promise<void> {
      const { data, error } = await supabase.auth.getUser()

      if (error) {
        console.error(error)
        this.user = null
        return
      }

      this.user = data.user
    },

    async login(email: string, password: string): Promise<void> {
      this.loading = true

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      this.loading = false

      if (error) {
        throw new Error(error.message)
      }

      this.user = data.user
    },

    async logout(): Promise<void> {
      const { error } = await supabase.auth.signOut()

      if (error) {
        console.error(error)
      }

      this.user = null
    },
  }
})


