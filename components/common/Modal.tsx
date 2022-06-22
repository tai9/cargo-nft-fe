import { ReactNode } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import LoadingButton from '@mui/lab/LoadingButton'

type ModalProps = {
  id: string
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
  id,
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
    <>
      <input type="checkbox" id={id} className="modal-toggle" />

      <label htmlFor={id} className="modal cursor-pointer">
        <label
          className={`modal-box bg-[#303338] relative max-w-2xl mx-auto overflow-hidden w-full rounded-md text-white border border-darkLine ${className}`}
        >
          <div>
            {title && (
              <div className="p-6 text-center relative">
                <div className="font-bold text-xl">{title}</div>
              </div>
            )}
            <label htmlFor={id}>
              <IoCloseSharp
                fontSize={24}
                color="grey"
                className="cursor-pointer absolute top-4 right-4"
                onClick={handleClose}
              />
            </label>
            <div className="border-t-[1px] border-darkLine"></div>
            <div className="p-8  max-h-[500px] overflow-auto">{children}</div>
            {handleSubmit && (
              <>
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
        </label>
      </label>
    </>
  ) : (
    <></>
  )
}
