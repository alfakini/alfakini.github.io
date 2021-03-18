import React from "react"

import avatarImage from "../../assets/avatar.png"

const EssayAuthorCard = ({ author, date }) => {
  return (
    <div className="card border-0">
      <div className="row g-2">
        <div className="col-auto">
          <img
            src={avatarImage}
            alt={author}
            width="40"
            style={{ marginTop: "4px", borderRadius: "100%" }}
          />
        </div>
        <div className="col">
            <span className="card-title">
              Written by <span className="fw-bold">{author}</span>
            </span>
            <br />
            <span className="card-text">
              <time
                className="post-date float-start text-muted"
                datetime={date}
                title={date}>
                {date}
              </time>
            </span>
        </div>
      </div>
    </div>
  )
}

export default EssayAuthorCard
