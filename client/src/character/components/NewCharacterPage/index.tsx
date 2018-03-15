import * as firebase from "firebase/app"
import { History } from "history"
import * as React from "react"
import { Route } from "react-router-dom"

import { authStore } from "../../../auth/stores/AuthStore"
import { routePaths } from "../../../routePaths"
import {
  Button,
  Input,
  Label,
  PageSection,
  PageTitle,
  PageWrapperPanel,
} from "../../../styles/elements"

export const NewCharacterPage = () => {
  let nameInput: HTMLInputElement
  let descriptionInput: HTMLInputElement

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, history: History) => {
    event.preventDefault()

    const { user } = authStore
    if (!user) return

    await firebase
      .firestore()
      .collection("characters")
      .doc()
      .set({
        name: nameInput.value,
        tagline: descriptionInput.value,
        owner: user.uid,
      })

    history.push(routePaths.characterList)
  }

  return (
    <PageWrapperPanel>
      <PageTitle>create new character</PageTitle>
      <PageSection>
        <Route
          render={({ history }) => (
            <form onSubmit={event => handleSubmit(event, history)}>
              <fieldset>
                <Label>Name</Label>
                <Input name="name" placeholder="awesome-san" innerRef={el => (nameInput = el)} />
              </fieldset>
              <fieldset>
                <Label>Description</Label>
                <Input
                  name="description"
                  placeholder="an awesome character that does awesome things"
                  innerRef={el => (descriptionInput = el)}
                />
              </fieldset>
              <fieldset>
                <Button>Submit</Button>
              </fieldset>
            </form>
          )}
        />
      </PageSection>
    </PageWrapperPanel>
  )
}
