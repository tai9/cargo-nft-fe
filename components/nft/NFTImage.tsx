import { IoMdSnow } from 'react-icons/io'
import { AiOutlineHeart } from 'react-icons/ai'

const style = {
  topBar: `bg-[#303339] p-2 rounded-t-lg border-darkLine border`,
  topBarContent: `flex items-center`,
  likesCounter: `flex-1 flex items-center justify-end gap-1 text-sm text-grey1`,
}

const NFTImage = ({ selectedNft }: any) => {
  return (
    <div>
      <div className={style.topBar}>
        <div className={style.topBarContent}>
          <IoMdSnow />
          <div className={style.likesCounter}>
            <AiOutlineHeart fontSize={18} /> 2.3K
          </div>
        </div>
      </div>
      <div>
        <img
          className="object-cover w-full"
          src={selectedNft?.metadata.image}
          alt=""
        />
      </div>
    </div>
  )
}

export default NFTImage
