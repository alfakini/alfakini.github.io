import React from "react"

import { TwitterLightIcon, LinkIcon } from "./icons"

const EssayShareCard = ({ url }) => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${url} by @alfakini`

  return (
    <div className="my-5">
      <a href={twitterUrl} className="icon-link">
        <TwitterLightIcon /><span className="ms-2 fw-bold">Share on Twitter</span>
      </a>

      <a href="" className="icon-link ms-3" onClick={() => navigator.clipboard.writeText(url)}>
        <LinkIcon /><span className="fw-bold">Copy link</span>
      </a>
    </div>
  )
}

export default EssayShareCard
