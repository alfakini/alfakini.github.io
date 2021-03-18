import React from "react"
import validator from "email-validator"

const SHEET_URL = "https://script.google.com/macros/s/AKfycbxzL-lO0ueLup75k_hQFxXglnn_Smz8jl1pChh-heMtUm2rb7-l0D-ZYwiTCbqceg6u/exec?"

const SubscriptionForm = ({ onSubmit, onChange, formStatus, email, isEmailValid }) => {
  const isEmailInvalid = (!isEmailValid && email !== "") || (formStatus === "SUBMITED" && email === "")
  const validationClass = isEmailInvalid ? "is-invalid" : email !== "" ? "is-valid" : ""

  return (
    <form className="row" onSubmit={onSubmit}>
      <div className="col-12 col-md-8 mb-3">
        <input
          className={`form-control form-control-lg ${validationClass}`}
          name="email"
          onChange={onChange}
          placeholder="Your email address"
          type ="text"
          value={email}
        />
      </div>
      <div className="col mb-3">
        <button type="submit" className="btn btn-primary btn-lg w-100" disabled={isEmailInvalid}>
          Subscribe
          {!isEmailInvalid && formStatus === "SUBMITED"
          ? <span class="spinner-border spinner-border-sm ms-3 align-middle" role="status" aria-hidden="true"></span>
          : <></>}
        </button>
      </div>
    </form>
  )
}

class NewsletterCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      formStatus: "NOTSUBMITED",
      isEmailValid: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      email: event.target.value,
      formStatus: "NOTSUBMITED",
      isEmailValid: validator.validate(event.target.value),
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    this.setState({ formStatus: "SUBMITED" })

    if (!this.state.isEmailValid) {
      return null
    }

    fetch(SHEET_URL + new URLSearchParams({ email: this.state.email }), {
      method: "GET"
    }).then(response => (
      response.json()
    )).then(data => {
      console.log(data)
      if (data["result"] === "success") {
        this.setState({ formStatus: "SUCCESS" })
      }
    })
  }

  render() {
    const { email, isEmailValid, formStatus } = this.state

    return (
      <div id="newsletter" className="card bg-light border-light rounded p-5">
        <div className="row p-3 px-5">
          <div className="col">
            <h2 className="card-title">
              <span>Newsletter</span>
            </h2>
            <div className="card-text">
              <p className="lead">
                Join the newsletter to receive the latest essays in your inbox. Alternatively, you can <a href="/rss.xml">subscribe with RSS</a>.
              </p>
              {(isEmailValid && formStatus === "SUCCESS")
                ? <span class="text-success">
                    Thank you for subscribing. See you on the next issue! :)
                  </span>
                : <SubscriptionForm
                    email={email}
                    formStatus={formStatus}
                    isEmailValid={isEmailValid}
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                  />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsletterCard
