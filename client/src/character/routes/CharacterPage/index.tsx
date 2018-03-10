import React from "react"
import { RouteComponentProps } from "react-router"
import styled from "styled-components"

import { Character, getCharacter } from "../../../api"
import { routePaths } from "../../../routePaths"
import { danger } from "../../../styles/colors"
import { PageSection, PageTitle, PageWrapper } from "../../../styles/layout"
import { RouterLink } from "../../../styles/link"

type Props = RouteComponentProps<{ id: string }>

const Actions = styled(PageSection)`
  > * + * {
    margin-left: 1rem;
  }
`

export class CharacterPage extends React.Component<Props> {
  state = {
    character: null as Character | null,
  }

  async fetchCharacter(id: string) {
    this.setState({ character: null })
    const character = await getCharacter(id)
    this.setState({ character })
  }

  async componentDidMount() {
    this.fetchCharacter(this.props.match.params.id)
  }

  componentWillReceiveProps(props: Props) {
    if (props.match.params.id !== this.props.match.params.id) {
      this.fetchCharacter(props.match.params.id)
    }
  }

  render() {
    const { character } = this.state

    if (!character) {
      return <div>loading...</div>
    }

    return (
      <PageWrapper>
        <PageTitle>{character.name}</PageTitle>
        <PageSection>{character.profile}</PageSection>
        <hr />
        <Actions>
          <RouterLink to={routePaths.editCharacter(character.id)}>
            <i className="fas fa-edit" /> Edit
          </RouterLink>{" "}
          <RouterLink to={routePaths.editCharacter(character.id)} style={{ color: danger }}>
            <i className="fas fa-trash" /> Delete
          </RouterLink>
        </Actions>
      </PageWrapper>
    )
  }
}
