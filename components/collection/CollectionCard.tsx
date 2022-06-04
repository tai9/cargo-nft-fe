import Link from 'next/link'
import React from 'react'

type Props = {
  data: any
}

const CollectionCard = ({ data }: Props) => {
  return (
    <Link href={`/collections/${data.contractAddress}`} passHref>
      <div className="bg-grey2 flex-auto w-full h-[30rem] rounded-2xl overflow-hidden cursor-pointer">
        <div className="h-2/3 w-full overflow-hidden flex justify-center items-center">
          <img
            src={data.bannerImageUrl}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex justify-center">
          <img
            className="mt-[-3rem] mb-3 object-cover rounded-full border-2 border-[#202225]"
            src={data.imageUrl}
            alt=""
            width={80}
            height={80}
          />
        </div>
        <div className="flex flex-col gap-3 max-w-[80%] justify-center items-center mx-auto">
          <div className="text-white font-bold">{data.title}</div>
          <div className="text-grey1 text-sm">
            by{' '}
            <a href="" className="text-primary">
              {data.creator}
            </a>
          </div>
          <div className="text-grey1 max-w-[80%] whitespace-nowrap overflow-hidden text-ellipsis">
            {data.description}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CollectionCard
