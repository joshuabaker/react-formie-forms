import React, { forwardRef } from "react";
import { FormiePageContext } from "./FormiePageContext";
import { FormieFieldContext } from "./FormieFieldContext";
import { useFormieContext } from "./FormieContext";

export const FormieForm = forwardRef((props, ref) => {
  const { components, form } = useFormieContext();

  return (
    <components.Form ref={ref} {...props}>
      <components.FormHeader />
      <components.FormPages>
        {form.pages.map((page, index) => (
          <FormiePageContext.Provider
            value={{ pageIndex: index, ...page }}
            key={index}
          >
            <components.Page>
              <components.PageHeader />
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
              <components.PageFooter />
            </components.Page>
          </FormiePageContext.Provider>
        ))}
      </components.FormPages>
      <components.FormFooter />
    </components.Form>
  );
});
