// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // User
    {
      name: 'users',
      title: 'Users',
      type: 'document',
      fields: [
        {
          name: 'userName',
          title: 'User Name',
          type: 'string',
        },
        {
          name: 'walletAddress',
          title: 'Wallet Address',
          type: 'string',
        },
        {
          name: 'profileImage',
          title: 'Profile Image',
          type: 'image',
        },
        {
          name: 'bannerImage',
          title: 'Banner Image',
          type: 'image',
        },
        {
          name: 'twitterHandle',
          title: 'Twitter Handle',
          type: 'string',
        },
        {
          name: 'igHandle',
          title: 'Instagram Handle',
          type: 'string',
        },
      ],
    },

    // Collection
    {
      name: 'marketItems',
      title: 'Market Items',
      type: 'document',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'contractAddress',
          title: 'Contract Address',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'string',
        },
        {
          name: 'createdBy',
          title: 'Created By',
          type: 'reference',
          to: [{ type: 'users' }],
        },
        {
          name: 'volumeTraded',
          title: 'Volume Traded',
          type: 'number',
        },
        {
          name: 'floorPrice',
          title: 'Floor Price',
          type: 'number',
        },
        {
          name: 'owners',
          title: 'Owners',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'users' }] }],
        },
        {
          name: 'profileImage',
          title: 'Profile Image',
          type: 'image',
        },
        {
          name: 'bannerImage',
          title: 'Banner Image',
          type: 'image',
        },
      ],
    },

    // NFT
    {
      name: 'nfts',
      title: 'NFTs',
      type: 'document',
      fields: [
        {
          name: 'metadata',
          title: 'Metadata',
          type: 'object',
          fields: [
            {
              name: 'id',
              title: 'ID',
              type: 'string',
            },
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'string',
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
            },
            {
              name: 'uri',
              title: 'URI',
              type: 'string',
            },
            {
              name: 'background_color',
              title: 'Background Color',
              type: 'string',
            },
            {
              name: 'external_url',
              title: 'External URL',
              type: 'string',
            },
          ],
        },
        {
          name: 'owner',
          title: 'Owner',
          type: 'reference',
          to: [{ type: 'users' }],
        },
        {
          name: 'collection',
          title: 'Collection',
          type: 'reference',
          to: [{ type: 'marketItems' }],
        },
      ],

      preview: {
        select: {
          title: 'metadata.name',
        },
      },
    },

    // Transaction
    {
      name: 'transactions',
      title: 'Transactions',
      type: 'document',
      fields: [
        {
          name: 'id',
          title: 'ID',
          type: 'string',
        },
        {
          name: 'eventType',
          title: 'Event Type',
          type: 'string',
        },
        {
          name: 'price',
          title: 'Price',
          type: 'number',
        },
        {
          name: 'contractAddress',
          title: 'Contract Address',
          type: 'string',
        },
        {
          name: 'from',
          title: 'From',
          type: 'string',
        },
        {
          name: 'to',
          title: 'To',
          type: 'string',
        },
        {
          name: 'gasUsed',
          title: 'Gas Used',
          type: 'string',
        },
        {
          name: 'status',
          title: 'Status',
          type: 'number',
        },
        {
          name: 'type',
          title: 'Type',
          type: 'number',
        },
        {
          name: 'transactionHash',
          title: 'Transaction Hash',
          type: 'string',
        },
        {
          name: 'confirmations',
          title: 'Confirmations',
          type: 'number',
        },
        {
          name: 'owner',
          title: 'Owner',
          type: 'reference',
          to: [{ type: 'users' }],
        },
        {
          name: 'nft',
          title: 'NFT',
          type: 'reference',
          to: [{ type: 'nfts' }],
        },
      ],

      preview: {
        select: {
          title: 'id',
        },
      },
    },

    // Listing
    {
      name: 'listings',
      title: 'Listings',
      type: 'document',
      fields: [
        {
          name: 'listingId',
          title: 'Listing ID',
          type: 'string',
        },
        {
          name: 'startTimestamp',
          title: 'Start Time',
          type: 'string',
        },
        {
          name: 'listingDurationInSeconds',
          title: 'Duration timestamp',
          type: 'number',
        },
        {
          name: 'quantity',
          title: 'Quantity',
          type: 'number',
        },
        {
          name: 'currencyContractAddress',
          title: 'Currency Contract Address',
          type: 'string',
        },
        {
          name: 'assetContractAddress',
          title: 'Asset Contract Address',
          type: 'string',
        },
        {
          name: 'buyoutPricePerToken',
          title: 'Buyout Price Per Token',
          type: 'string',
        },
        {
          name: 'status',
          title: 'Status',
          type: 'number',
        },
        {
          name: 'owner',
          title: 'Owner',
          type: 'reference',
          to: [{ type: 'users' }],
        },
        {
          name: 'nft',
          title: 'NFT',
          type: 'reference',
          to: [{ type: 'nfts' }],
        },
      ],

      preview: {
        select: {
          title: 'listingId',
        },
      },
    },
  ]),
})
