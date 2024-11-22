> [!IMPORTANT]
>
> **This repository is no longer maintained.**
>
> [@verbb](https://github.com/verbb) has provided demo of a GraphQL headless implementation: [verbb/formie-headless](https://github.com/verbb/formie-headless)

<h1>
  React Formie Forms
  <img src="https://raw.githubusercontent.com/verbb/formie/craft-3/src/icon.svg" alt="Logo" width="40" align="right" />
</h1>

Integrate Formie forms into React applications faster.

Under the hood we’re using Formik for validation, enabling a more extensible solution via it’s context APIs.

## Usage

Below is a simple example. The `<Formie />` component will render a full Formie form with validation, including multi-page forms.

```jsx
import {
  defaultComponents,
  FIELD_TYPE,
  Formie,
  submitForm,
} from "react-formie-forms";
import MyCustomInputComponent from "@/components/MyCustomInputComponent";

// You can override components to style as you want
const components = {
  ...defaultComponents,
  [FIELD_TYPE.SINGLE_LINE_TEXT]: MyCustomInputComponent,
};

export default function FormieWrapper({ formDataFromGraphQl, ...props }) {
  return (
    <Formie
      form={formDataFromGraphQl}
      components={components}
      onSubmit={submitForm("/path/to/formie/submit/action")}
      {...props}
    />
  );
}
```

### Props

- The required `form` prop expects the form data queried via GraphQL.
- The required `onSubmit` prop expects a promise (i.e. fetch). If you have an endpoint you can just use the `submitForm` helper method and it’ll take care of everything for you.
- The `components` prop allow you to override each different field/component type used in the form.

See the [`useFormieForm` hook](/src/useFormieForm.js) and [Formik’s `useFormik` hook](https://formik.org/docs/api/useFormik) for all available props.

The `<Formie />` component is a wrapper for the `useFormieForm` hook and includes some sensible defaults. In 99% of scenarios, this is how you should integrate this library.

### GraphQL

The following is an example GraphQL fragment used to query the above form data.

```gql
fragment form on FormInterface {
  title
  handle
  settings {
    defaultInstructionsPosition
    defaultLabelPosition
    displayCurrentPageTitle
    displayFormTitle
    displayPageProgress
    displayPageTabs
    loadingIndicator
    loadingIndicatorText
    submitActionFormHide
    submitMethod
  }
  pages {
    id
    name
    rows {
      id
      fields {
        id
        conditions
        containerAttributes {
          label
          value
        }
        cssClasses
        displayName
        enableConditions
        errorMessage
        handle
        inputAttributes {
          label
          value
        }
        labelPosition
        limitAmount
        name
        placeholder
        required
        type
        instructions
        instructionsPosition
        ... on Field_SingleLineText {
          defaultValue
        }
        ... on Field_MultiLineText {
          defaultValue
        }
        ... on Field_Checkboxes {
          options {
            label
            value
            isDefault
          }
        }
        ... on Field_Dropdown {
          options {
            label
            value
            isDefault
          }
        }
        ... on Field_Radio {
          options {
            label
            value
            isDefault
          }
        }
      }
    }
    settings {
      backButtonLabel
      buttonsPosition
      enablePageConditions
      pageConditions
      showBackButton
      submitButtonLabel
    }
  }
}
```
