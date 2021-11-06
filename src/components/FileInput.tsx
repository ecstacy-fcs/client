import { Button, VStack, Input, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export interface IProps {
  acceptedFileTypes?: string;
  allowMultipleFiles?: boolean;
  label: string;
  onChange: (formData: FormData) => void;
  uploadFileName: string;
}

export const FileInput: React.FC<IProps> = (props) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const onClickHandler = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    console.log(files);
  }, [files]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }
    setFiles([...Array.from(event.target.files)]);
  };

  return (
    <form ref={formRef}>
      <VStack alignItems="start" spacing={3}>
        <Stack direction="row">
          <Button type="button" size="sm" onClick={onClickHandler}>
            {props.allowMultipleFiles ? "Choose Files" : "Choose File"}
          </Button>
          <Input
            accept={props.acceptedFileTypes}
            multiple={props.allowMultipleFiles}
            name={props.uploadFileName}
            onChange={onChangeHandler}
            ref={fileInputRef}
            style={{ display: "none" }}
            type="file"
          />
          {files.length &&
            (props.allowMultipleFiles ? (
              <Text>
                {files[0].name} and {files.length - 1} others
              </Text>
            ) : (
              <Text>{files[0].name}</Text>
            ))}
        </Stack>
        <Button
          type="button"
          colorScheme="purple"
          onClick={() => {
            const formData = new FormData();
            files.forEach((file) => {
              formData.append(props.uploadFileName, file);
            });
            props.onChange(formData);
            formRef.current?.reset();
            setFiles([]);
          }}
        >
          {props.label}
        </Button>
      </VStack>
    </form>
  );
};

FileInput.defaultProps = {
  acceptedFileTypes: "",
  allowMultipleFiles: false,
};
