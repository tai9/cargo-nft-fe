import { IoMdSnow } from 'react-icons/io'
import { AiOutlineHeart } from 'react-icons/ai'
import { Skeleton } from '@mui/material'
import { NFTItem } from 'models'

const style = {
  topBar: `bg-[#303339] p-2 rounded-t-lg border-darkLine border`,
  topBarContent: `flex items-center`,
  likesCounter: `flex-1 flex items-center justify-end gap-1 text-sm text-grey1`,
}

type Props = {
  nftItem?: NFTItem
}

const NFTImage = ({ nftItem }: Props) => {
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
        {nftItem?.metadata.image ? (
          <img
            className="object-cover w-full"
            src={nftItem?.metadata.image}
            alt=""
          />
        ) : (
          <Skeleton
            animation="wave"
            variant="rectangular"
            sx={{ height: 400 }}
          />
        )}
      </div>
    </div>
  )
}

export default NFTImage
