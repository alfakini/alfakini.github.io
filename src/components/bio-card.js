import React from "react"

import avatarImage from "../../assets/avatar.png"
import { useSiteMetadata } from "../hooks/site-metadata"
import {
  LinkedinIcon,
  TwitterIcon
} from "./icons"

const BioCard = () => {
  const siteMetadata = useSiteMetadata()
  const { author } = siteMetadata

  return (
    <div className="card bg-light border-light rounded p-4">
      <div className="row align-items-center">
        <div className="col-auto">
          <img
            src={avatarImage}
            alt={author.name}
            width="90"
            style={{ borderRadius: "100%" }}
          />
        </div>
        <div className="col">
            <h5 className="card-title">
              <span className="fw-normal fs-4">{author.name}</span>
              <a href="https://twitter.com/alfakini" aria-label="Twitter" className="icon-link px-2">
                <TwitterIcon width="20" height="18" style={{ marginBottom: "6px" }} />
              </a>
              <a href="https://www.linkedin.com/in/fachini" aria-label="LinkedIn" className="icon-link">
                <LinkedinIcon width="18" height="18" style={{ marginBottom: "6px" }} />
              </a>
            </h5>
            <p className="card-text">
              <span className="lead">Software Engineer. Founder of Magrathea Labs and Fab Lab Joinville.</span>
            </p>
        </div>
      </div>
    </div>
  )
}

export default BioCard
