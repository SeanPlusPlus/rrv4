import React from 'react'
import { Prompt } from 'react-router-dom'


class Form extends React.Component {
  state = {dirty: false}
  setDirty = () => this.setState({dirty: true})
  render() {
    return(
      <div>
        <h1>Form</h1>
        <input type="text" onInput={this.setDirty} />
        <Prompt
          when={this.state.dirty}
          message="Data will be lost!"
        />
      </div>
    )
  }
}

export default Form;
