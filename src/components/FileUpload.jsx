import React, { forwardRef, useCallback } from "react";
import { BaseComponent } from "./BaseComponent";
import { useDropzone } from "react-dropzone";
import { isFunction, useField as useFormikField } from "formik";
import { useFieldContext } from "./FieldContext";

export const FileUpload = forwardRef(
  ({ children, dropzoneProps, ...props }, ref) => {
    const { handle, id, required } = useFieldContext();
    const [, , helpers] = useFormikField(handle);
    const { setValue } = helpers;

    const onDrop = useCallback(
      (acceptedFiles) => {
        setValue(handle, acceptedFiles[0]);
      },
      [setValue]
    );

    const dropzone = useDropzone({
      onDrop,
      maxFiles: 1,
      ...dropzoneProps,
    });

    const { acceptedFiles, getRootProps, getInputProps } = dropzone;

    return (
      <BaseComponent ref={ref} {...getRootProps()} {...props}>
        <input name={handle} id={id} required={required} {...getInputProps()} />
        {children ? (
          isFunction(children) ? (
            children({ dropzone })
          ) : (
            children
          )
        ) : (
          <>
            <BaseComponent>Choose file…</BaseComponent>
            {acceptedFiles.length > 0 &&
              acceptedFiles.map((file, fileIndex) => (
                <BaseComponent key={fileIndex}>{file.name}</BaseComponent>
              ))}
          </>
        )}
      </BaseComponent>
    );
  }
);
