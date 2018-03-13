import { action, observable } from "mobx"
import { observer } from "mobx-react"
import React from "react"

export type FetcherProps<T> = {
  id: string
  longWaitTimeout?: number
  fetch: (id: string) => Promise<T>
  render: (fetchState: FetchState<T>) => React.ReactNode
}

export type FetchState<T> =
  | { state: "idle" }
  | { state: "fetching" }
  | { state: "fetching-long" }
  | { state: "success"; data: T }
  | { state: "error"; error: any }

@observer
export class Fetcher<T> extends React.Component<FetcherProps<T>> {
  @observable fetchState: FetchState<T> = { state: "idle" }

  @action
  setFetchState(fetchState: FetchState<T>) {
    this.fetchState = fetchState
  }

  async doFetch(id: string) {
    this.setFetchState({ state: "fetching" })

    setTimeout(() => {
      if (this.fetchState.state === "fetching") {
        this.setFetchState({ state: "fetching-long" })
      }
    }, this.props.longWaitTimeout || 2500)

    try {
      const data = await this.props.fetch(id)
      this.setFetchState({ state: "success", data })
    } catch (error) {
      this.setFetchState({ state: "error", error })
    }
  }

  componentDidMount() {
    // tslint:disable-next-line
    this.doFetch(this.props.id)
  }

  componentWillReceiveProps(nextProps: FetcherProps<T>) {
    if (this.props.id !== nextProps.id) {
      // tslint:disable-next-line
      this.doFetch(nextProps.id)
    }
  }

  render() {
    return this.props.render(this.fetchState)
  }
}

export function createFetcher<T>() {
  return Fetcher as new () => Fetcher<T>
}
