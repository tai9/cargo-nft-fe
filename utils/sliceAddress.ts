export const sliceAddress = (address?: string) => {
  return address
    ? address.slice(0, 7) +
        '...' +
        address.slice(address.length - 4, address.length)
    : ''
}
