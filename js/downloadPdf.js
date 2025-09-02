window.downloadPdf = function (pdfBytes, fileName) {
    try {
        // Convert base64 string to blob
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        console.log(`PDF downloaded successfully: ${fileName}`);
        
        // Show success message
        setTimeout(() => {
            alert('PDF downloaded successfully! The document is now in landscape orientation and optimized for single page viewing.');
        }, 1000);
        
    } catch (error) {
        console.error('Error downloading PDF:', error);
        alert('Error downloading PDF. Please try again.');
    }
};
