export const resetFiles = (
  setSelectedImage,
  setSelectedPdf,
  setSelectedAudio
) => {
  setSelectedImage(null);
  setSelectedPdf(null);
  setSelectedAudio(null);
};

export const handleFileDrop = (
  file,
  selectedFileType,
  setSelectedImage,
  setSelectedPdf,
  setSelectedAudio,
  setSelectedFile
) => {
  if (!file) return;

  if (selectedFileType.value === "image" && file.type.startsWith("image/")) {
    setSelectedImage(file);
  } else if (
    selectedFileType.value === "pdf" &&
    file.type === "application/pdf"
  ) {
    setSelectedPdf(file);
  } else if (
    selectedFileType.value === "voice" &&
    file.type.startsWith("audio/")
  ) {
    setSelectedAudio(file);
  } else {
    alert(
      `Selected file type '${selectedFileType.label}' does not match the dropped file type.`
    );
    return;
  }
  setSelectedFile(file);
};

export const handleFileTypeChange = (fileType) => fileType;
