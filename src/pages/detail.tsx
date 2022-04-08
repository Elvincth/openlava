import React from 'react'
import Eth from '~/components/svg/Eth'

const detail = () => {
    return (
        <section className="flex flex-col w-full h-screen">
            <div className='flex flex-row w-full h-screen justify-center pt-10'>
                <div className='flex flex-col max-w-[700px]'>
                    <div className='border border-gray-100 rounded-2xl'>
                        <div className='w-full p-4'>
                            <Eth />
                        </div>
                        <img className='rounded-b-2xl' src='https://static.boredpanda.com/blog/wp-content/uploads/2020/05/Illustrators-create-artwork-in-aid-of-health-workers-5eb48aea538d2__880.jpg' />
                    </div>
                </div>
                <div className='flex flex-col pl-6'>
                    <h1 className='text-3xl font-semibold pt-12'>Name</h1>
                    <div className='flex flex-row pt-10'>
                        <div>
                            owned by <span className='text-orange-500'>owner</span>
                        </div>
                    </div>
                    <div className='p-8 w-full bg-gray-50 pr-80 border-2 rounded-2xl pb-12'>
                        <h1 className=' font-normal text-xl pb-2'>Price</h1>
                        <div className='flex flex-row items-center'>
                            <div className='pb-1'>
                                <Eth />
                            </div>
                            <h1 className='text-4xl font-semibold px-2'>0.5</h1>
                            <h1 className='text-xl font-normal'>($1,646.45)</h1>
                        </div>

                        <a href="#_" className="relative rounded-2xl px-40 py-5 overflow-hidden group bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-orange-400 transition-all ease-out duration-300">
                            <button className='pt-8'>
                                <span className="relative text-xl">Make offer</span>
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default detail