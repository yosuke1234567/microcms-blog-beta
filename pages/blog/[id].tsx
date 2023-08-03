import { GetStaticProps } from 'next'
import Image from 'next/image'
import { client } from '@/libs/client'
import { Blog } from '..'
import parse from 'html-react-parser'
import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/plugins/autoloader/prism-autoloader'
import { useEffect, useState } from 'react'
import { MyHeader } from '@/components/MyHeader'
if (Prism.plugins.autoloader) {
  // npmで管理しているバージョンと合わせる
  Prism.plugins.autoloader.languages_path =
    'https://unpkg.com/prismjs@1.29.0/components/'
}

type Props = {
  blog: Blog
}

const BlogBody = ({ blog }: Props) => {
  const [body, setBody] = useState(<></>)
  useEffect(() => {
    const blogBody = parse(blog.body) as JSX.Element
    setBody(blogBody)
  }, [])
  useEffect(() => Prism.highlightAll(), [body])
  return body
}

export default function BlogId({ blog }: Props) {

  return (
    <>
      <MyHeader />
      <main>
        <article className='px-4 pt-8 pb-24 mx-auto max-w-[720px]'>
          <div className='pb-6 border-b'>
            <Image className='block' src={blog.eyecatch ? blog.eyecatch.url : ''} width={1200} height={630} alt='' />
            <h1 className='text-4xl leading-tight font-bold mt-12'>{blog.title}</h1>
            <time dateTime={blog.publishedAt} suppressHydrationWarning className='block mt-3 text-gray-500'>
              {new Date(blog.publishedAt).toLocaleString()}
            </time>
          </div>
          <div className='blog-body'>
            <BlogBody blog={blog} />
          </div>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'blogs' })
  const paths = data.contents.map((blog: Blog) => `/blog/${blog.id}`)

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = context.params?.id
  const data = await client.get({ endpoint: 'blogs', contentId: id as string })

  return {
    props: {
      blog: data
    }
  }
}