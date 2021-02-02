import React, { forwardRef } from "react";
import { BaseComponent } from "./BaseComponent";
import { isFunction, useField as useFormikField } from "formik";
import { useDropzone } from "react-dropzone";
import { useFieldContext } from "./FieldContext";
import { useFormieContext } from "./FormieContext";

export const FileUpload = forwardRef(
  ({ children, dropzoneProps, ...props }, ref) => {
    const { form, options } = useFormieContext();
    const field = useFieldContext();
    const [formikField, , helpers] = useFormikField(field.handle);

    const dropzone = useDropzone({
      onDrop: helpers.setValue,
      maxFiles: 1,
      ...dropzoneProps,
    });

    const { getRootProps, getInputProps } = dropzone;

    const files = Array.isArray(formikField.value)
      ? formikField.value
      : formikField.value && formikField.value !== ""
      ? [formikField.value]
      : [];

    return (
      <BaseComponent
        ref={ref}
        baseClassName={"file-upload"}
        {...getRootProps()}
        {...props}
      >
        <input
          name={field.handle}
          id={options.modifyId(field.handle, form.handle)}
          required={field.required}
          {...getInputProps()}
        />
        {children ? (
          isFunction(children) ? (
            children({ dropzone, files })
          ) : (
            children
          )
        ) : (
          <>
            <BaseComponent>Choose file…</BaseComponent>
            {files.length > 0 &&
              files.map((file, fileIndex) => (
                <BaseComponent key={fileIndex}>{file.name}</BaseComponent>
              ))}
          </>
        )}
      </BaseComponent>
    );
  }
);
