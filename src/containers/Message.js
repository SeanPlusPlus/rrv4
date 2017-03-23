import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchMessagesIfNeeded } from '../actions'

class Message extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchMessagesIfNeeded())
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(fetchMessagesIfNeeded())
  }

  render() {
    const { messages } = this.props
    return (
      <div>
        <h1>Messages</h1>
        <p>
          <a href='#'
             onClick={this.handleRefreshClick}>
            Refresh
          </a>
        </p>
        {messages &&
          <ul>
            {messages.map((m) => {
              return (
                <li key={m._id}>{m.text}</li>
              )
            })}
          </ul>
        }
      </div>
    )
  }
}

Message.propTypes = {
  messages: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  isFetchingMessages: PropTypes.bool,
  messagesLastUpdated: PropTypes.number,
}

function mapStateToProps(state) {
  const { messagesInFeed } = state
  console.log(messagesInFeed);
  const {
    isFetchingMessages,
    messagesLastUpdated,
    messageItems: messages
  } = messagesInFeed || {
    isFetchingMessages: true,
    messageItems: []
  }

  return {
    messages,
    isFetchingMessages,
    messagesLastUpdated,
  }
}

export default connect(mapStateToProps)(Message)
