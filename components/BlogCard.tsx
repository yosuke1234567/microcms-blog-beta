import { Blog } from '@/pages'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
    blog: Blog
}

export const BlogCard = ({ blog }: Props) => {
    return (
        <li className='flex gap-8 border-t first:border-0 p-6 overflow-hidden'>
            <Image className='w-[240px]' src={blog.eyecatch ? blog.eyecatch.url : ''} width={1200} height={630} alt='' />
            <div>
                <h2 className='text-xl font-bold'>
                    <Link href={`/blog/${blog.id}`} className='hover:text-[#331cbf] transition'>{blog.title}</Link>
                </h2>
                <time dateTime={blog.publishedAt} className='text-gray-500 text-sm'>{new Date(blog.publishedAt).toLocaleString()}</time>
            </div>
        </li>
    )
}