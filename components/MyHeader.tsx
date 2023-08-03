import { Source_Sans_Pro } from 'next/font/google'
import Link from 'next/link'
const logoFont = Source_Sans_Pro({
    weight: '900',
    subsets: ['latin']
})

type Props = {}

export const MyHeader = (props: Props) => {
    return (
        <header className={logoFont.className + ' z-10 sticky top-0 bg-[#ffffff88] backdrop-blur'}>
            <div className='flex max-w-[1200px] mx-auto p-4'>
                <h1 className='text-xl'><Link href='/'>Blog by microCMS</Link></h1>
            </div>
        </header>
    )
}