import createReactContext, { ConsumerProps } from "create-react-context"
import { Observer } from "mobx-react"
import React from "react"

import { Stores } from "./stores"

// HACK: the stores _must_ be provided
// the alternative is mocking the firebase app for a default value
// ...which seems like a terrible idea
const { Provider, Consumer } = createReactContext<Stores>({} as any)

export const StoreProvider = Provider

export const StoreConsumer = (props: ConsumerProps<Stores>) => (
  <Consumer>
    {stores => (
      <Observer>
        {() =>
          Array.isArray(props.children)
            ? props.children.map(fn => fn(stores))
            : props.children(stores)
        }
      </Observer>
    )}
  </Consumer>
)
