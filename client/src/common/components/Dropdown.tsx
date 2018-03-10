import React from "react"
import { Manager, Popper, Target } from "react-popper"

interface Props {
  head: React.ReactNode
  content: React.ReactNode
}

interface State {
  dropdownVisible: boolean
}

export class Dropdown extends React.Component<Props, State> {
  state = {
    dropdownVisible: false,
  }

  show = () => {
    this.setState({ dropdownVisible: true })
  }

  hide = () => {
    this.setState({ dropdownVisible: false })
  }

  toggle = () => {
    this.setState(state => ({ dropdownVisible: !state.dropdownVisible }))
  }

  render() {
    return (
      <Manager onClick={this.toggle}>
        <Target style={{ height: "100%" }}>{this.props.head}</Target>
        {this.state.dropdownVisible && <Popper placement="bottom-end">{this.props.content}</Popper>}
      </Manager>
    )
  }
}
