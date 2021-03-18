import React from "react"

import {
  GithubIcon,
  GoodreadsIcon,
  InstagramIcon,
  LinkedinIcon,
  RssIcon,
  SpeakerdeckIcon,
  StackoverflowIcon,
  TwitterIcon
} from "./icons"

const Footer = () => (
  <footer className="text-center">
    <p>
      <a href="https://twitter.com/alfakini" aria-label="Twitter" className="icon-link px-2"><TwitterIcon /></a>
      <a href="https://github.com/alfakini" aria-label="GitHub" className="icon-link px-2"><GithubIcon /></a>
      <a href="https://www.goodreads.com/user/show/10157034-alan" aria-label="Goodreads" className="icon-link px-2"><GoodreadsIcon /></a>
      <a href="https://speakerdeck.com/alfakini" aria-label="SpeakerdeckIcon" className="icon-link px-2"><SpeakerdeckIcon /></a>
      <a href="https://www.linkedin.com/in/fachini" aria-label="LinkedIn" className="icon-link px-2"><LinkedinIcon /></a>
      <a href="https://stackoverflow.com/users/732973/alfakini" aria-label="Stack Overflow" className="icon-link px-2"><StackoverflowIcon /></a>
      <a href="https://www.instagram.com/alfachini" aria-label="Instagram" className="icon-link px-2"><InstagramIcon /></a>
      <a href="https://alfakini.com/rss.xml" aria-label="RSS" className="icon-link px-2"><RssIcon /></a>
    </p>
    <p>
      <a className="text-decoration-none" href="/">alfakini</a> · <a className="text-decoration-none" href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>
    </p>
  </footer>
)

export default Footer
