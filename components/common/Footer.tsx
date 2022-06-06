import {
  FaInstagram,
  FaFacebookSquare,
  FaDiscord,
  FaYoutube,
  FaTiktok,
  FaRedditAlien,
  FaTwitter,
} from 'react-icons/fa'
import { IconBox } from './IconBox'

const style = {
  searchBar: `flex flex-1 w-max-[520px] items-center bg-darkGrey rounded-lg hover:bg-lightGrey`,
  searchInput: `w-full border-0 bg-transparent outline-0 ring-0 px-4 text-[#e6e8eb] placeholder:text-[#8a939b]`,
  accentedButton: `font-semibold px-8 py-2 w-fit bg-primary rounded-lg text-white hover:bg-[#42a0ff] cursor-pointer`,
}

export const Footer = () => {
  return (
    <div className="flex flex-col gap-10 divide-y-[1px] divide-lightGrey bg-darkBlue text-white px-16 pt-12 pb-6">
      <div className="grid grid-cols-2 gap-20 ">
        <div className="flex flex-col gap-4">
          <div className="font-bold text-lg">Stay in the loop</div>
          <div>
            Join our mailing list to stay in the loop with our newest feature
            releases, NFT drops, and tips and tricks for navigating OpenSea.
          </div>
          <div className="flex gap-4">
            <div className={style.searchBar}>
              <input
                className={style.searchInput}
                placeholder="Your email address"
              />
            </div>
            <div className={style.accentedButton}>Sign up</div>
          </div>
        </div>
        <div>
          <div className="font-bold mb-4 text-lg">Join the community</div>
          <div className="flex gap-3">
            <IconBox>
              <FaTwitter fontSize={22} />
            </IconBox>
            <IconBox>
              <FaInstagram fontSize={22} />
            </IconBox>
            <IconBox>
              <FaFacebookSquare fontSize={22} />
            </IconBox>
            <IconBox>
              <FaDiscord fontSize={22} />
            </IconBox>
            <IconBox>
              <FaYoutube fontSize={22} />
            </IconBox>
            <IconBox>
              <FaTiktok fontSize={22} />
            </IconBox>
            <IconBox>
              <FaRedditAlien fontSize={22} />
            </IconBox>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6 text-xs">
        <div>© 2018 - 2022 Ozone Networks, Inc</div>
        <div className="cursor-pointer">
          Privacy Policy &nbsp; &nbsp; Terms of Service
        </div>
      </div>
    </div>
  )
}
