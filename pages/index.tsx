import Link from 'next/link'
import { client } from '@/libs/client'
import { MyHeader } from '@/components/MyHeader'
import { BlogCard } from '@/components/BlogCard'

export type Blog = {
  id: string
  title: string
  body: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  eyecatch: {
    url: string
    height: number
    width: number
  }
}

type Props = {
  blogs: Blog[]
}

export default function Home({ blogs }: Props) {
  // console.log(blogs)
  return (
    <>
      <MyHeader />
      <main>
        <div className='max-w-[720px] mx-auto py-8'>
          <ul>
            {
              blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))
            }
          </ul>
        </div>
      </main>
    </>
  )
}

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: 'blogs' })

  return {
    props: {
      blogs: data.contents,
    },
  }
}