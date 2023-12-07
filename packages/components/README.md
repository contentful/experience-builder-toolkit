# Experience Builder Components

> Experience Builder is currently in a private alpha and not available publicly. If you are interested in participating in the alpha, please reach out to your Contentful account team.

This folder contains the source code for the default/example components that are available within Experience Builder. These components can be used as-is to kick start building your experiences, or used as an example for building your own components.

## In this guide

- [Components](#components)
- [Getting started](#getting-started)
- [Styling](#styling)
  - [Including default styles](#including-default-styles)
  - [Adding custom styles](#adding-custom-styles)

## Components

The following components are available:

- [Button](src/components/Button/README.md)
- [Heading](src/components/Heading/README.md)
- [Image](src/components/Image/README.md)
- [RichText](src/components/RichText/README.md)
- [Text](src/components/Text/README.md)

## Getting started

All of the example components are registered in the SDK by default and are available within Experience Builder.

## Styling

By default, the components are unstyled. This allows you to style the components to match your brand and design system. If you want a set of default styles to get started, see below.

### Including default styles

A set of optional, default styles are included with the components. To include them, import the `styles.css` file from the `@contentful/experience-builder-components` package:

```jsx
import '@contentful/experience-builder-components/styles.css';
```

### Adding custom styles

Each component has a css class that you can use to add your own styles. The classes are named in the style of `cf-{component-name}` (ie `cf-button`).

For example, to style the `Button` component, you can do the following:

```css
.cf-button {
  /* your styles here */
}
```

All components also support passing in custom class names via the `className` prop. This allows you to add your own class names to the component, which you can then use to style the component.
