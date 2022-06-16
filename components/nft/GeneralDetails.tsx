import { Skeleton } from '@mui/material'
import { BootstrapTooltip } from 'components/common'
import { NFTItem } from 'models'
import Router from 'next/router'
import { AiFillHeart } from 'react-icons/ai'
import { FiMoreVertical } from 'react-icons/fi'
import { GiShare } from 'react-icons/gi'
import { MdRefresh, MdSend } from 'react-icons/md'
import { RiShareBoxFill } from 'react-icons/ri'

const style = {
  wrapper: `flex`,
  infoContainer: `h-36 flex flex-col flex-1 justify-between mb-6`,
  accent: `text-[#2081e2] cursor-pointer`,
  nftTitle: `text-3xl font-extrabold`,
  otherInfo: `flex text-sm`,
  ownedBy: `text-[#8a939b] mr-4`,
  likes: `flex items-center text-[#8a939b]`,
  likeIcon: `mr-1`,
  actionButtonsContainer: `w-44`,
  actionButtons: `flex container justify-between text-[1.4rem] border-2 rounded-lg`,
  actionButton: `my-2 cursor-pointer`,
  divider: `border-r-2`,
}

type Props = {
  nftItem?: NFTItem
  isTransfered?: boolean
}

const GeneralDetails = ({ nftItem, isTransfered }: Props) => {
  return (
    <div className={style.wrapper}>
      <div className={style.infoContainer}>
        <div className={style.accent}>{nftItem?.collection?.title}</div>
        <div className={style.nftTitle}>
          {nftItem?.metadata.name || <Skeleton animation="wave" />}
        </div>
        <div className={style.otherInfo}>
          <div className={style.ownedBy}>
            Owned by{' '}
            <span className={style.accent}>{nftItem?.owner?.userName}</span>
          </div>
          <div className={style.likes}>
            <AiFillHeart className={style.likeIcon} /> 2.3K favorites
          </div>
        </div>
      </div>
      <div className={style.actionButtonsContainer}>
        <div className={style.actionButtons}>
          <BootstrapTooltip title="Refresh metadata" placement="top">
            <div className={`${style.actionButton} ml-2`}>
              <MdRefresh />
            </div>
          </BootstrapTooltip>
          <div className={style.divider} />
          {isTransfered ? (
            <BootstrapTooltip title="Transfer" placement="top">
              <div
                className={style.actionButton}
                onClick={() => Router.push(`${Router.asPath}/transfer`)}
              >
                <MdSend />
              </div>
            </BootstrapTooltip>
          ) : (
            <BootstrapTooltip
              title={`View on ${nftItem?.metadata.name}`}
              placement="top"
            >
              <div className={style.actionButton}>
                <RiShareBoxFill />
              </div>
            </BootstrapTooltip>
          )}

          <div className={style.divider} />
          <BootstrapTooltip title="Share" placement="top">
            <div className={style.actionButton}>
              <GiShare />
            </div>
          </BootstrapTooltip>
          <div className={style.divider} />
          <BootstrapTooltip title="More" placement="top">
            <div className={`${style.actionButton} mr-2`}>
              <FiMoreVertical />
            </div>
          </BootstrapTooltip>
        </div>
      </div>
    </div>
  )
}

export default GeneralDetails
