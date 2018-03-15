import * as React from "react"

import {
  Button,
  Input,
  Label,
  PageSection,
  PageTitle,
  PageWrapperPanel,
} from "../../../styles/elements"

type Props = {
  fields: {
    name: string
    tagline: string
  }
  onSubmit: () => void
  onChange: () => void
}

export const CreateCharacterPage = (props: Props) => (
  <PageWrapperPanel>
    <PageTitle>Create new character</PageTitle>
    <PageSection>
      <form onSubmit={props.onSubmit}>
        <fieldset>
          <Label>Name</Label>
          <Input
            name="name"
            required
            placeholder="My Awesome Character"
            value={props.fields.name}
            onChange={props.onChange}
          />
        </fieldset>

        <fieldset>
          <Label>Tagline</Label>
          <Input
            name="tagline"
            height={180}
            placeholder="Enter a short, snappy description of your character."
            value={props.fields.tagline}
            onChange={props.onChange}
          />
        </fieldset>

        <fieldset>
          <Button type="submit">Submit</Button>
        </fieldset>
      </form>
    </PageSection>
  </PageWrapperPanel>
)
