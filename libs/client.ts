import { createClient } from 'microcms-js-sdk'

export const client = createClient({
  serviceDomain: 'nextjs-blog-beta',
  apiKey: process.env.NEXT_PUBLIC_API_KEY || '',
})