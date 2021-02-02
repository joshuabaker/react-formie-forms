import React, { forwardRef } from "react";
import { BaseComponent } from "./BaseComponent";
import { isFunction, useField as useFormikField } from "formik";
import { useDropzone } from "react-dropzone";
import { useFieldContext } from "./FieldContext";

export const FileUpload = forwardRef(
  ({ children, dropzoneProps, ...props }, ref) => {
    const { handle, id, required } = useFieldContext();
    const [field, , helpers] = useFormikField(handle);

    const dropzone = useDropzone({
      onDrop: helpers.setValue,
      maxFiles: 1,
      ...dropzoneProps,
    });

    const { getRootProps, getInputProps } = dropzone;

    const files = Array.isArray(field.value)
      ? field.value
      : field.value && field.value !== ""
      ? [field.value]
      : [];

    return (
      <BaseComponent
        ref={ref}
        baseClassName={"file-upload"}
        {...getRootProps()}
        {...props}
      >
        <input name={handle} id={id} required={required} {...getInputProps()} />
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
