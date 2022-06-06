import { ReactNode } from 'react'
import { IoCloseSharp } from 'react-icons/io5'

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
  title: string
  submitText?: string
  open: boolean
  children?: ReactNode
  handleClose?: () => void
  handleSubmit?: () => void
}
export const Modal = ({
  className,
  title,
  submitText,
  open,
  children,
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
          className={`bg-[#303338] max-w-2xl mx-auto w-full rounded-md text-white border border-darkLine ${className}`}
        >
          <div className="p-4 text-center relative">
            <div className="font-bold text-xl">{title}</div>
            <IoCloseSharp
              fontSize={24}
              color="grey"
              className="cursor-pointer absolute top-4 right-4"
              onClick={handleClose}
            />
          </div>
          <div className="border-t-[1px] border-darkLine"></div>
          <div className="p-8">{children}</div>
          {handleSubmit && (
            <>
              <div className="border-t-[1px] border-darkLine"></div>
              <div className="p-4 text-center">
                <button
                  className={`py-3 px-4 rounded-lg bg-[#2081e2] hover:bg-[#42a0ff]`}
                  onClick={handleSubmit}
                >
                  <div className="ml-2 font-semibold">{submitText}</div>
                </button>
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
