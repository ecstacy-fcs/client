import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { toastWrapper } from "~/lib/toast";

export interface IProps {
  acceptedFileTypes?: string;
  allowMultipleFiles?: boolean;
  label: string;
  onChange: (formData: FormData) => void;
  uploadFileName: string;
  minFiles?: number;
  validateForm?: any;
}

export const FileInput: React.FC<IProps> = (props) => {
  const toast = useToast();
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const onClickHandler = () => {
    fileInputRef.current?.click();
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }
    setFiles([...Array.from(event.target.files)]);
  };

  return (
    <form ref={formRef}>
      <VStack alignItems="start" spacing={5}>
        <Stack direction="row">
          <FormControl
            isInvalid={!!props.minFiles && files.length < props.minFiles}
          >
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
            {files.length > 0 &&
              (props.allowMultipleFiles ? (
                <Text>
                  {files[0].name} and {files.length - 1} others
                </Text>
              ) : (
                <Text>{files[0].name}</Text>
              ))}
            <FormErrorMessage>
              Minimum {props.minFiles}, maximum 3 required
            </FormErrorMessage>
          </FormControl>
        </Stack>
        <Button
          type="button"
          colorScheme="purple"
          onClick={() => {
            if (props.validateForm) props.validateForm();
            if (
              props.minFiles &&
              files.length < props.minFiles &&
              files.length > 3
            )
              return;

            let TOO_LARGE = false;
            files.forEach((file) => {
              if (file.size > 1000000) {
                toastWrapper(toast, "File size too large!", "");
                TOO_LARGE = true;
              }
            });
            if (TOO_LARGE) return;

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
