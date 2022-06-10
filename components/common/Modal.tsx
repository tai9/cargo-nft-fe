import { ReactNode } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import LoadingButton from '@mui/lab/LoadingButton'

type BackdropProps = {
  children?: ReactNode
}

const Backdrop = ({ children }: BackdropProps) => {
  return (
    <div className="fixed top-0 h-full w-full z-50 bg-black-rgba">
      {children}
    </div>
  )
}

type ModalProps = {
  className?: string
  title?: string
  submitText?: string
  open: boolean
  children?: ReactNode
  loading?: boolean
  handleClose?: () => void
  handleSubmit?: () => void
}
export const Modal = ({
  className,
  title,
  submitText,
  open,
  children,
  loading,
  handleClose,
  handleSubmit,
}: ModalProps) => {
  return open ? (
    <Backdrop>
      <div
        className="h-screen w-screen grid grid-cols-1 items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`bg-[#303338] relative max-w-2xl mx-auto w-full rounded-md text-white border border-darkLine ${className}`}
        >
          {title && (
            <div className="p-6 text-center relative">
              <div className="font-bold text-xl">{title}</div>
            </div>
          )}
          <IoCloseSharp
            fontSize={24}
            color="grey"
            className="cursor-pointer absolute top-4 right-4"
            onClick={handleClose}
          />
          <div className="border-t-[1px] border-darkLine"></div>
          <div className="p-8">{children}</div>
          {handleSubmit && (
            <>
              <div className="border-t-[1px] border-darkLine"></div>
              <div className="p-6 text-center">
                <LoadingButton
                  type="submit"
                  sx={{
                    width: 'fit-content',
                    fontWeight: 'bold',
                  }}
                  variant="contained"
                  loading={loading}
                  size="large"
                  onClick={handleSubmit}
                >
                  {submitText}
                </LoadingButton>
              </div>
            </>
          )}
        </div>
      </div>
    </Backdrop>
  ) : (
    <></>
  )
}
