import * as React from "react"
import styled from "styled-components"

import { foregroundColor, shadowColor } from "../../../styles/colors"
import { Button, TextArea } from "../../../styles/formElements"
import { RaisedPanel } from "../../../styles/layout"

const ChatPageWrapper = styled.main`
  flex-grow: 1;
  min-height: 640px;

  display: flex;
  flex-direction: column;
`

const Header = styled.header`
  flex-shrink: 0;

  background: ${foregroundColor};
  box-shadow: 0px 8px 8px -8px ${shadowColor};

  display: flex;
  justify-content: space-between;

  > * {
    padding: 0.5rem;
  }

  /* > :nth-child(2) {
    flex-grow: 1;
    text-align: center;
  } */

  i {
    display: block;
  }
`

const MessageList = styled.section`
  flex-grow: 1;
  overflow-y: auto;
  min-height: 0;
`

const Message = styled.div`
  margin: 0.5rem 0.5rem;
`

const MessageBox = styled(RaisedPanel)`
  flex-shrink: 0;

  padding: 0.5rem;

  display: flex;

  > * {
    display: block;
  }

  > * + * {
    margin-left: 0.5rem;
  }
`

const MessageBoxInput = styled(TextArea)`
  height: 3em;
`

export class ChatPage extends React.Component {
  render() {
    return (
      <ChatPageWrapper>
        <Header>
          <a href="#">
            <i className="fas fa-bars" />
          </a>
          <h3>room name</h3>
          <a href="#">
            <i className="fas fa-users" />
          </a>
        </Header>
        <MessageList>
          <Message>message: here</Message>
          <Message>message: here</Message>
          <Message>message: here</Message>
          <Message>message: here</Message>
          <Message>message: here</Message>
          <Message>message: here</Message>
          <Message>message: here</Message>
          <Message>message: here</Message>
          <Message>message: here</Message>
          <Message>message: here</Message>
        </MessageList>
        <MessageBox>
          <MessageBoxInput placeholder="Say something..." />
          <Button>Send</Button>
        </MessageBox>
      </ChatPageWrapper>
    )
  }
}
