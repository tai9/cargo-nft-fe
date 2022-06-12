import { MainLayout } from 'components/layout'
import { NextPageWithLayout } from 'models'
import Router from 'next/router'

const PageNotFound: NextPageWithLayout = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#262b2f]">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        404
      </h1>
      <div className="bg-[#2181e2] px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button className="mt-5">
        <a className="relative inline-block text-sm font-medium text-[#2181e2] group active:text-primary focus:outline-none focus:ring">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#2181e2] group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
            <div onClick={() => Router.replace('/')}>Go Home</div>
          </span>
        </a>
      </button>
    </div>
  )
}

PageNotFound.Layout = MainLayout
export default PageNotFound
