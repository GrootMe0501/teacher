window.downloadFileFromBytes = (bytes, fileName, contentType) => {
  try {
    let uint8;
    if (bytes instanceof Uint8Array) {
      uint8 = bytes;
    } else if (Array.isArray(bytes)) {
      uint8 = new Uint8Array(bytes);
    } else if (typeof bytes === 'string') {
      // Blazor may pass byte[] as base64 string
      const binary = atob(bytes);
      const len = binary.length;
      uint8 = new Uint8Array(len);
      for (let i = 0; i < len; i++) uint8[i] = binary.charCodeAt(i);
    } else {
      console.error('Unsupported bytes format for download');
      return;
    }

    const blob = new Blob([uint8], { type: contentType || 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName || 'download';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error('downloadFileFromBytes failed', e);
  }
};

// Function to download files from Blazor
function downloadFile(fileName, bytes, contentType) {
    const blob = new Blob([bytes], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}
