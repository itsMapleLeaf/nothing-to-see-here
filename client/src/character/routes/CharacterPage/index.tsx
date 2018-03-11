import { action, computed, observable } from "mobx"
import { inject, observer } from "mobx-react"
import React from "react"
import { RouteComponentProps } from "react-router"
import styled from "styled-components"

import { routePaths } from "../../../routePaths"
import { danger } from "../../../styles/colors"
import { PageSection, PageTitle, PageWrapper } from "../../../styles/layout"
import { RouterLink } from "../../../styles/link"
import { CharacterListStore } from "../../stores/CharacterListStore"

const Actions = styled(PageSection)`
  > * + * {
    margin-left: 1rem;
  }
`

type Props = RouteComponentProps<{ id: string }> & {
  characterListStore?: CharacterListStore
}

@inject("characterListStore")
@observer
export class CharacterPage extends React.Component<Props> {
  @observable characterId = ""

  @action
  setCharacterId(id: string) {
    this.characterId = id
  }

  @computed
  get character() {
    return this.props.characterListStore!.getCharacter(this.characterId)
  }

  componentDidMount() {
    this.setCharacterId(this.props.match.params.id)
  }

  componentWillReceiveProps(props: Props) {
    this.setCharacterId(props.match.params.id)
  }

  render() {
    return <PageWrapper>{this.renderPageContent()}</PageWrapper>
  }

  renderPageContent() {
    const { character } = this

    if (!character) {
      return <PageTitle>Character not found :(</PageTitle>
    }

    return (
      <React.Fragment>
        <PageTitle>{character.name}</PageTitle>
        <PageSection>{character.tagline}</PageSection>
        <hr />
        <Actions>
          <RouterLink to={routePaths.editCharacter(character.id)}>
            <i className="fas fa-edit" /> Edit
          </RouterLink>{" "}
          <RouterLink to={routePaths.editCharacter(character.id)} color={danger}>
            <i className="fas fa-trash" /> Delete
          </RouterLink>
        </Actions>
      </React.Fragment>
    )
  }
}
