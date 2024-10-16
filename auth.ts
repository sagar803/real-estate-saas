import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authConfig } from './auth.config'
import { z } from 'zod'
import { getStringFromBuffer } from './lib/utils'

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: []
})
