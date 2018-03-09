import React from "react"
import { RouteComponentProps } from "react-router"
import { Character, getCharacter } from "src/api"
import { routePaths } from "src/routePaths"
import { PageSection, PageTitle, PageWrapper } from "src/styles/layout"
import { RouterLink } from "src/styles/link"

type Props = RouteComponentProps<{ id: string }>

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
        <PageSection>
          <RouterLink to={routePaths.editCharacter(character.id)}>Edit</RouterLink>
        </PageSection>
        <PageSection>{character.profile}</PageSection>
      </PageWrapper>
    )
  }
}
