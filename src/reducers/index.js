import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import {
  SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
  REQUEST_POSTS, RECEIVE_POSTS,
  REQUEST_MESSAGES, RECEIVE_MESSAGES
} from '../actions'


function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
  case SELECT_SUBREDDIT:
    return action.subreddit
  default:
    return state
  }
}

function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsBySubreddit(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      })
    default:
      return state
  }
}

function messages(state = {
  isFetchingMessages: false,
  didInvalidateMessages: false,
  messageItems: []
}, action) {
  switch (action.type) {
    case REQUEST_MESSAGES:
      return Object.assign({}, state, {
        isFetchingMessages: true,
        didInvalidateMessages: false
      })
    case RECEIVE_MESSAGES:
      return Object.assign({}, state, {
        isFetchingMessages: false,
        didInvalidateMessages: false,
        messageItems: action.messages,
        messagesLastUpdated: action.messagesReceivedAt
      })
    default:
      return state
  }
}

function messagesInFeed(state = { }, action) {
  switch (action.type) {
    case RECEIVE_MESSAGES:
    case REQUEST_MESSAGES:
      let nextState = {}
      nextState = messages(state, action)
      return Object.assign({}, state, nextState)
    default:
      return state
  }
}

const rootReducer = combineReducers({
  messagesInFeed,
  postsBySubreddit,
  selectedSubreddit,
  todos,
  visibilityFilter
})

export default rootReducer
