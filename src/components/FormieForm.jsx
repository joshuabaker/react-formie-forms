import React, { forwardRef } from "react";
import { useFormieContext } from "./FormieContext";
import { FORM_POSITION } from "../types";

export const FormieForm = forwardRef((props, ref) => {
  const {
    components,
    form,
    formErrorMessage,
    formSuccessMessage,
    pageIndex,
  } = useFormieContext();

  return (
    <components.Form ref={ref} {...props}>
      <components.FormHeader>
        {form.settings.displayFormTitle && <components.FormTitle />}
        {form.settings.displayPageTabs && (
          <components.FormPageTabs>
            {(page) => <components.PageTab>{page.name}</components.PageTab>}
          </components.FormPageTabs>
        )}
        {form.settings.displayPageProgress && (
          <components.FormPageProgress>
            {pageIndex + 1} of {form.pages.length}
          </components.FormPageProgress>
        )}
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
        {(page, pageIndex) => (
          <components.Page>
            <components.PageHeader>
              {form.settings.displayCurrentPageTitle && (
                <components.PageTitle>{page.name}</components.PageTitle>
              )}
            </components.PageHeader>
            <components.PageRows>
              {() => (
                <components.Row>{() => <components.Field />}</components.Row>
              )}
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
        )}
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
