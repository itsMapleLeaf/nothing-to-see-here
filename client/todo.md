- consider merging `routes` folders into `components` for less confusion

- App
  - use render functions for more clarity and less prop indirection (?)

- AppNav
  - split the various `renderX` functions into their own components
  - make a component for a link which renders its text as a single span element, to preserve spaces inside when using flex centering

- LoginPage
  - turn this into a modal instead of its own page, for convenience
  - make the login fields required

- styles
  - make some helpers for flex and other stuff

- CharacterEditForm
  - use mobx observables (?)

- ~~consider using formik for forms~~
