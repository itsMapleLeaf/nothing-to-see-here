- CharacterPage
  - mistakenly pulls character data from the `CharacterListStore` instead of directly from the `characters` collection on firestore. fix that

- App
  - use render functions for more clarity and less prop indirection (?)
  - implement guarded routes, remove manual auth logic wherever necessary

- AppNav
  - split the various `renderX` functions into their own components
  - make a component for a link which renders its text as a single span element, to preserve spaces inside when using flex centering

- LoginPage
  - turn this into a modal instead of its own page, for convenience
  - make the login fields required

- styles
  - make some helpers for flex and other stuff