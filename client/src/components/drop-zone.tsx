import { useState, useEffect } from "react";
import { useDropzone, Accept } from "react-dropzone";
import { Card, CardContent } from "@/components/ui/card";
import { FilePlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import Spinner from "./spinner";
import { cn } from "@/lib/utils";
// import axios from "axios";

interface DropzoneProps {
  onChange: (fileUrls: string[]) => void;
  className?: string;
  isAnalyzing: boolean;
  setIsAnalyzing: React.Dispatch<React.SetStateAction<boolean>>;
  fileExtensions?: string[];
}

interface FileWithPreview extends File {
  preview: string;
}

export function Dropzone({
  onChange,
  className,
  isAnalyzing,
  setIsAnalyzing,
  fileExtensions = ["png", "jpg"],
}: DropzoneProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  // Create an accept object for useDropzone
  const accept: Accept = fileExtensions.reduce((acc, ext) => {
    acc[`image/${ext}`] = [];
    return acc;
  }, {} as Accept);

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    onDrop: (acceptedFiles: File[]) => {
      const mappedFiles: FileWithPreview[] = acceptedFiles.map((file) => ({
        ...file,
        preview: URL.createObjectURL(file),
      }));
      setFiles(mappedFiles);
      console.log(mappedFiles);
      onChange(mappedFiles.map((f) => f.preview));
    },
  });

  // Thumbnails for the uploaded files
  const thumbs = files.map((file) => (
    <div className=" border-gray-200 p-1 box-border" key={file.name}>
      <div className="flex min-w-0 overflow-hidden">
        <img
          src={file.preview}
          className="block w-auto h-full rounded"
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const submitHandler = (f: FileWithPreview[]) => {
    setIsAnalyzing(true);
    // axios
    //   .post("http://your-node-server/upload", { f })
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    console.log(f);
  };

  return (
    <>
      <Card
        className={`bg-muted border-dashed border-2 hover:border-muted-foreground/50 hover:cursor-pointer ${className}`}
      >
        <CardContent
          {...getRootProps({
            className: cn(
              "flex flex-col items-center justify-center text-xs p-0",
              isAnalyzing && "dropzone-disabled"
            ),
            disabled: isAnalyzing,
            onClick: isAnalyzing ? (e) => e.preventDefault() : undefined,
            onDrop: isAnalyzing ? (e) => e.preventDefault() : undefined,
          })}
        >
          <input {...getInputProps()} disabled={isAnalyzing} />
          {files.length > 0 ? (
            <aside
              className={cn(
                "flex flex-wrap",
                isAnalyzing && "disabled-thumbnails"
              )}
            >
              {thumbs}
            </aside>
          ) : (
            <div className="flex flex-col items-center justify-center my-6 space-y-2">
              <FilePlusIcon className="h-10 w-10 text-muted-foreground" />
              <div className="flex items-center justify-center text-muted-foreground">
                <span className="font-medium">
                  Drag Files to Upload or click to select files
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      {files.length > 0 && (
        <Button className="w-24 " onClick={() => submitHandler(files)}>
          {isAnalyzing ? <Spinner className="w-5 h-5" /> : <span>Analyze</span>}
        </Button>
      )}
    </>
  );
}
