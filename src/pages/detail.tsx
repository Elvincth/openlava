import React from 'react'

const detail = () => {
    return (
        <section className="flex flex-col w-full h-screen">
            <div className='flex flex-row w-full h-screen justify-center pt-10'>
                <div className='flex flex-col max-w-[700px]'>
                    <div className='border border-gray-100 rounded-2xl'>
                        <div className='w-full p-4'>
                            <svg width="15" height="20" viewBox="0 0 256 417" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path fill="#343434" d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z" /><path fill="#8C8C8C" d="M127.962 0L0 212.32l127.962 75.639V154.158z" /><path fill="#3C3C3B" d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z" /><path fill="#8C8C8C" d="M127.962 416.905v-104.72L0 236.585z" /><path fill="#141414" d="M127.961 287.958l127.96-75.637-127.96-58.162z" /><path fill="#393939" d="M0 212.32l127.96 75.638v-133.8z" /></svg>
                        </div>
                        <img className='rounded-b-2xl' src='https://static.boredpanda.com/blog/wp-content/uploads/2020/05/Illustrators-create-artwork-in-aid-of-health-workers-5eb48aea538d2__880.jpg' />
                    </div>
                </div>
                <div className='flex flex-col pl-6'>
                    <h1 className='text-3xl font-semibold pt-12'>Name</h1>
                    <div className='flex flex-row pt-10'>
                        <div>
                            owned by <span className='text-blue-500'>owner</span>
                        </div>
                    </div>
                    <div className='p-8 w-full bg-gray-50 pr-80 border-2 rounded-2xl pb-12'>
                        <h1 className=' font-normal text-xl pb-2'>Price</h1>
                        <div className='flex flex-row items-center'>
                            <div className='pb-1'>
                                <svg width="25" height="30" viewBox="0 0 256 417" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path fill="#343434" d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z" /><path fill="#8C8C8C" d="M127.962 0L0 212.32l127.962 75.639V154.158z" /><path fill="#3C3C3B" d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z" /><path fill="#8C8C8C" d="M127.962 416.905v-104.72L0 236.585z" /><path fill="#141414" d="M127.961 287.958l127.96-75.637-127.96-58.162z" /><path fill="#393939" d="M0 212.32l127.96 75.638v-133.8z" /></svg>
                            </div>
                            <h1 className='text-4xl font-semibold px-2'>0.5</h1>
                            <h1 className='text-xl font-normal'>($1,646.45)</h1>
                        </div>

                        <a href="#_" className="relative rounded-2xl px-40 py-5 overflow-hidden group bg-blue-500 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300">
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