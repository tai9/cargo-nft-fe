import * as React from 'react'
import { styled } from '@mui/material/styles'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'

export const BootstrapTooltip = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: '#4c505c',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#4c505c',
    padding: '10px 20px',
    fontSize: 14,
    fontWeight: 'bold',
    borderRadius: 8,
  },
}))
