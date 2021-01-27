import React, { forwardRef } from "react";
import { FormiePageContext } from "./FormiePageContext";
import { FormieFieldContext } from "./FormieFieldContext";
import { useFormieContext } from "./FormieContext";
import { FORM_POSITION } from "../types";

export const FormieForm = forwardRef((props, ref) => {
  const {
    components,
    form,
    formErrorMessage,
    formSuccessMessage,
  } = useFormieContext();

  return (
    <components.Form ref={ref} {...props}>
      <components.FormHeader>
        {form.settings.displayFormTitle && <components.FormTitle />}
        {form.settings.displayPageTabs && <components.FormPageTabs />}
        {form.settings.displayPageProgress && <components.FormPageProgress />}
        {form.settings.errorMessagePosition === FORM_POSITION.ABOVE_FORM && (
          <components.FormErrorMessage>
            {formErrorMessage}
          </components.FormErrorMessage>
        )}
        {form.settings.submitActionMessagePosition ===
          FORM_POSITION.ABOVE_FORM && (
          <components.FormSuccessMessage>
            {formSuccessMessage}
          </components.FormSuccessMessage>
        )}
      </components.FormHeader>
      <components.FormPages>
        {form.pages.map((page, pageIndex) => (
          <FormiePageContext.Provider
            value={{ pageIndex, ...page }}
            key={index}
          >
            <components.Page>
              <components.PageHeader>
                {form.settings.displayCurrentPageTitle && (
                  <components.PageTitle>{page.name}</components.PageTitle>
                )}
              </components.PageHeader>
              <components.PageRows>
                {page.rows.map((row, index) => (
                  <components.Row key={index}>
                    {row.fields.map((field, index) => (
                      <FormieFieldContext.Provider value={field} key={index}>
                        <components.Field />
                      </FormieFieldContext.Provider>
                    ))}
                  </components.Row>
                ))}
              </components.PageRows>
              <components.PageFooter>
                <components.ButtonGroup>
                  {pageIndex > 0 && page.settings.showBackButton && (
                    <components.BackButton>
                      {page.settings.backButtonLabel}
                    </components.BackButton>
                  )}
                  <components.SubmitButton>
                    {page.settings.submitButtonLabel}
                  </components.SubmitButton>
                </components.ButtonGroup>
              </components.PageFooter>
            </components.Page>
          </FormiePageContext.Provider>
        ))}
      </components.FormPages>
      <components.FormFooter>
        {form.settings.submitActionMessagePosition ===
          FORM_POSITION.BELOW_FORM && (
          <components.FormSuccessMessage>
            {formSuccessMessage}
          </components.FormSuccessMessage>
        )}
        {form.settings.errorMessagePosition === FORM_POSITION.BELOW_FORM && (
          <components.FormErrorMessage>
            {formErrorMessage}
          </components.FormErrorMessage>
        )}
      </components.FormFooter>
    </components.Form>
  );
});
