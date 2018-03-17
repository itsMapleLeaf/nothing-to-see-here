import * as React from "react"

import { Button, Input, Label } from "../../../ui/elements"

export interface CharacterFormProps {
  values: CharacterFormValues
  onSubmit: (ev: React.FormEvent<HTMLFormElement>) => void
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
}

export interface CharacterFormValues {
  name: string
  description: string
}

export function CharacterForm(props: CharacterFormProps) {
  return (
    <form onSubmit={props.onSubmit}>
      <fieldset>
        <Label>Name</Label>
        <Input
          name="name"
          placeholder="awesome-san"
          value={props.values.name}
          onChange={props.onChange}
        />
      </fieldset>

      <fieldset>
        <Label>Description</Label>
        <Input
          name="description"
          placeholder="an awesome character that does awesome things"
          value={props.values.description}
          onChange={props.onChange}
        />
      </fieldset>

      <fieldset>
        <Button>Submit</Button>
      </fieldset>
    </form>
  )
}
