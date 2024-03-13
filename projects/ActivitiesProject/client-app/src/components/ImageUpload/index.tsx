import { Grid, Header, Image } from "semantic-ui-react";
import ImageUploadDropzone from "../ImageUploadDropzone";
import { useEffect, useState } from "react";
import ImageUploadCropper from "../ImageUploadCropper";

export default function ImageUpload() {
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();

  const onCrop = () => {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => console.log(blob));
    }
  };

  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header color="teal" content="Step 1 - Add Photo" />
        <ImageUploadDropzone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header color="teal" content="Step 2 - Resize Image" />
        {files.length > 0 && (
          <ImageUploadCropper
            setCropper={setCropper}
            imagePreview={files[0].preview}
          />
        )}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header color="teal" content="Step 3 - Preview & Upload" />
        <div
          className="img-preview"
          style={{ minHeight: 200, overflow: "hidden" }}
        ></div>
      </Grid.Column>
    </Grid>
  );
}
