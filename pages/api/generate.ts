// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST')
    return res.status(400).json({ message: 'Invalid request method' })

  const {
    body: { name, description, image, contractAddress },
  } = req

  const sdk = new ThirdwebSDK(
    new ethers.Wallet(
      process.env.NEXT_PUBLIC_PRIVATE_KEY || '',
      ethers.getDefaultProvider(
        'https://eth-rinkeby.alchemyapi.io/v2/KJiTlbM-Ko63ne5KBQJpe4xBbMVjlEAs'
      )
    )
  )

  const collection = await sdk.getNFTCollection(contractAddress)

  const signature = await collection.signature.generate({
    metadata: {
      name,
      description,
      image,
    },
  })

  const tx = await collection.signature.mint(signature)

  res.json({ message: 'Signature generated successfully', signature, tx })
}
