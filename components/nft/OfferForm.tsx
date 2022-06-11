import LoadingButton from '@mui/lab/LoadingButton'
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { Input } from 'components/common'
import { ETH_TOKEN_PRICE } from 'constants/token'
import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { MdCalendarToday } from 'react-icons/md'
import { numberFormatter } from 'utils'
import { ListingData } from './ListingForm'

type Props = {
  loading?: boolean
  handleSubmit?: (data?: ListingData) => void
}

const OfferForm = ({ loading, handleSubmit }: Props) => {
  const [data, setData] = useState<ListingData>({
    amount: 0,
    duration: 3,
  })

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    handleSubmit && handleSubmit(data)
  }

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      amount: +event.currentTarget.value,
    })
  }

  const handleListingDurationChange = (event: SelectChangeEvent) => {
    setData({
      ...data,
      duration: +event.target.value,
    })
  }

  return (
    <form className="flex flex-col gap-6 font-bold" onSubmit={onSubmit}>
      <div className="space-y-3">
        <div className="flex justify-between">
          <div>Price</div>
          <div className="text-xl text-textGrey">
            <AiOutlineInfoCircle />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 items-center">
          <div>
            <FormControl fullWidth>
              <Select
                sx={{
                  background: '#353840',
                  color: 'white',
                  fontWeight: 'bold',
                  height: '100%',
                  borderColor: '#151c22',
                  borderRadius: '0.8rem',
                }}
                defaultValue="ETH"
              >
                <MenuItem value="ETH">
                  <div className="flex gap-2 items-center">
                    <img
                      src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                      alt=""
                      width={12}
                    />
                    <div>ETH</div>
                  </div>
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="col-span-3 h-full">
            <Input
              required
              type="number"
              step="any"
              placeholder="Amount"
              className="h-full"
              onChange={handleAmountChange}
            />
          </div>
        </div>
        <div className="text-right text-textGrey font-medium text-sm">
          {numberFormatter.format(ETH_TOKEN_PRICE * (data.amount || 0))} Total
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <div>Duration</div>
          <div className="text-xl text-textGrey">
            <AiOutlineInfoCircle />
          </div>
        </div>
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            sx={{
              background: '#353840',
              color: 'white',
              fontWeight: 'bold',
              height: '100%',
              borderColor: '#151c22',
              borderRadius: '0.8rem',
            }}
            defaultValue="3"
            onChange={handleListingDurationChange}
          >
            <MenuItem value={1}>
              <div className="flex gap-3 items-center">
                <MdCalendarToday fontSize={20} />
                <div>1 day</div>
              </div>
            </MenuItem>
            <MenuItem value={3}>
              <div className="flex gap-3 items-center">
                <MdCalendarToday fontSize={20} />
                <div>3 days</div>
              </div>
            </MenuItem>
            <MenuItem value={7}>
              <div className="flex gap-3 items-center">
                <MdCalendarToday fontSize={20} />
                <div>7 days</div>
              </div>
            </MenuItem>
            <MenuItem value={30}>
              <div className="flex gap-3 items-center">
                <MdCalendarToday fontSize={20} />
                <div>1 month</div>
              </div>
            </MenuItem>
            <MenuItem value={90}>
              <div className="flex gap-3 items-center">
                <MdCalendarToday fontSize={20} />
                <div>3 months</div>
              </div>
            </MenuItem>
            <MenuItem value={180}>
              <div className="flex gap-3 items-center">
                <MdCalendarToday fontSize={20} />
                <div>6 months</div>
              </div>
            </MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="border-t-[1px] border-darkLine mt-4"></div>
      <div className="mt-4 text-center">
        <LoadingButton
          type="submit"
          sx={{
            width: 'fit-content',
            fontWeight: 'bold',
          }}
          variant="contained"
          loading={loading}
          size="large"
        >
          Make Offer
        </LoadingButton>
      </div>
    </form>
  )
}

export default OfferForm
