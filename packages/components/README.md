# Experience Builder Components

> Experience Builder is currently in a private alpha and not available publicly. If you are interested in participating in the alpha, please reach out to your Contentful account team.

This folder contains the source code for the default/example components that can be used with Experience Builder. These components can be used as-is to kick start of building your experiences, or used as an example for building your own components.

- [Components](#components)
- [Getting started](#getting-started)
  - [Installation](#install-dependencies)
  - [Use the components](#use-the-components)
- [Styling](#styling)
  - [Including default styles](#including-default-styles)

## Components

For docs on each individual components, refer to the readme in the component's folder:

- [Button](src/components/Button/README.md)
- [Heading](src/components/Heading/README.md)
- [Image](src/components/Image/README.md)
- [RichText](src/components/RichText/README.md)
- [Text](src/components/Text/README.md)

## Getting started

### Installation

```bash
npm install @contentful/experience-builder-components
```

### Register the components with Experience Builder

> This guide assumes you already have Experience Builder configured in your application and space. If you don't, please contact your Contentful representative for instructions on how to do so.

In the section of code (usually the main App or Page components) where Experience Builder is configured, perform the following steps:

Import the `useExperienceBuilderComponents` hook from the `@contentful/experience-builder-components` package:

```jsx
import { useExperienceBuilderComponents } from '@contentful/experience-builder-components';
```

Next, call the hook, passing in the `defineComponents` method obtained from the call to the `userExperienceBuilder` hook:

```jsx
useExperienceBuilderComponents(defineComponents);
```

All of the components will now be available for use in your experiences.

## Styling

By default, the components are unstyled. This allows you to style the components to match your brand and design system. If you want a set of default styles to get started, see below.

### Including default styles

A set of default styles are included with the components. To include them, import the `styles.css` file from the `@contentful/experience-builder-components` package:

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

## 

