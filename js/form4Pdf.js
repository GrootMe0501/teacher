window.downloadForm4Pdf = async function (formData) {
    try {
        // Show loading indicator
        const downloadBtn = document.getElementById('downloadPdfBtn');
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = 'Generating PDF...';
        downloadBtn.disabled = true;

        // Generate PDF using jsPDF
        generateForm4Pdf(formData);
        
        console.log('Form 4 PDF generated successfully');
        
        // Show success message
        alert('Form 4 PDF generated successfully!');
        
    } catch (error) {
        console.error('Error generating Form 4 PDF:', error);
        alert('Error generating PDF. Please try again.');
    } finally {
        // Reset button
        const downloadBtn = document.getElementById('downloadPdfBtn');
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
    }
};

window.generateForm4Pdf = function (formData) {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
    });

    // Set font
    pdf.setFont('Arial', 'normal');
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);

    let y = 40;
    let x = 40;

    // Header
    pdf.setFontSize(12);
    pdf.text("Phil-IRI for JHS Form 4", 400, y, { align: 'right' });
    
    y += 30;
    pdf.setFontSize(16);
    pdf.text("Individual Summary Record (ISR)", 300, y, { align: 'center' });
    
    y += 25;
    pdf.setFontSize(14);
    pdf.text("Talaan ng Indibidwal na Pagbabasa (TIP)", 300, y, { align: 'center' });

    // Personal Information
    y += 40;
    pdf.setFontSize(10);
    
    // Name
    pdf.text("Name:", x, y);
    pdf.line(x + 60, y + 2, x + 360, y + 2);
    pdf.text(formData.studentName || "", x + 65, y);
    
    // Age
    pdf.text("Age:", x + 380, y);
    pdf.line(x + 420, y + 2, x + 480, y + 2);
    pdf.text(formData.age || "", x + 425, y);
    
    y += 25;
    
    // Grade & Section
    pdf.text("Grade & Section:", x, y);
    pdf.line(x + 100, y + 2, x + 300, y + 2);
    pdf.text(formData.gradeSection || "", x + 105, y);
    
    y += 25;
    
    // Teacher
    pdf.text("Teacher:", x, y);
    pdf.line(x + 60, y + 2, x + 360, y + 2);
    pdf.text(formData.teacher || "", x + 65, y);
    
    y += 25;
    
    // School
    pdf.text("School:", x, y);
    pdf.line(x + 60, y + 2, x + 360, y + 2);
    pdf.text(formData.school || "", x + 65, y);

    // Language Selection
    y += 40;
    pdf.text("Language:", x, y);
    
    // Checkboxes for language
    if (formData.language === "English") {
        pdf.text("☑", x + 80, y);
    } else {
        pdf.text("☐", x + 80, y);
    }
    pdf.text("English", x + 100, y);
    
    if (formData.language === "Filipino") {
        pdf.text("☑", x + 180, y);
    } else {
        pdf.text("☐", x + 180, y);
    }
    pdf.text("Filipino", x + 200, y);

    // Assessment Table
    y += 50;
    
    // Table headers
    const tableX = x;
    const colWidths = [60, 40, 80, 80, 80, 80, 80, 80, 80];
    const headers = ["Level Started\n(Starting\nPoint)\nMark with *", "Level", "Word Reading", "", "", "Comprehension", "", "", "Date Taken"];
    const subHeaders = ["", "", "Ind", "Ins", "Frus", "Ind", "Ins", "Frus", ""];
    
    // Draw table headers
    let currentX = tableX;
    for (let i = 0; i < headers.length; i++) {
        pdf.setFontSize(8);
        pdf.rect(currentX, y, colWidths[i], 60);
        pdf.text(headers[i], currentX + colWidths[i]/2, y + 20, { align: 'center' });
        if (subHeaders[i]) {
            pdf.text(subHeaders[i], currentX + colWidths[i]/2, y + 45, { align: 'center' });
        }
        currentX += colWidths[i];
    }
    
    y += 60;
    
    // Table data rows
    for (let level = 4; level <= 10; level++) {
        const levelData = formData.assessmentData.find(d => d.level === level) || {};
        currentX = tableX;
        
        // Level Started checkbox
        pdf.rect(currentX, y, colWidths[0], 30);
        if (levelData.levelStarted) {
            pdf.text("*", currentX + colWidths[0]/2, y + 20, { align: 'center' });
        }
        currentX += colWidths[0];
        
        // Level number
        pdf.rect(currentX, y, colWidths[1], 30);
        pdf.text(level.toString(), currentX + colWidths[1]/2, y + 20, { align: 'center' });
        currentX += colWidths[1];
        
        // Word Reading columns
        pdf.rect(currentX, y, colWidths[2], 30);
        pdf.text(levelData.wordReadingInd || "", currentX + colWidths[2]/2, y + 20, { align: 'center' });
        currentX += colWidths[2];
        
        pdf.rect(currentX, y, colWidths[3], 30);
        pdf.text(levelData.wordReadingIns || "", currentX + colWidths[3]/2, y + 20, { align: 'center' });
        currentX += colWidths[3];
        
        pdf.rect(currentX, y, colWidths[4], 30);
        pdf.text(levelData.wordReadingFrus || "", currentX + colWidths[4]/2, y + 20, { align: 'center' });
        currentX += colWidths[4];
        
        // Comprehension columns
        pdf.rect(currentX, y, colWidths[5], 30);
        pdf.text(levelData.comprehensionInd || "", currentX + colWidths[5]/2, y + 20, { align: 'center' });
        currentX += colWidths[5];
        
        pdf.rect(currentX, y, colWidths[6], 30);
        pdf.text(levelData.comprehensionIns || "", currentX + colWidths[6]/2, y + 20, { align: 'center' });
        currentX += colWidths[6];
        
        pdf.rect(currentX, y, colWidths[7], 30);
        pdf.text(levelData.comprehensionFrus || "", currentX + colWidths[7]/2, y + 20, { align: 'center' });
        currentX += colWidths[7];
        
        // Date Taken
        pdf.rect(currentX, y, colWidths[8], 30);
        pdf.text(levelData.dateTaken || "", currentX + colWidths[8]/2, y + 20, { align: 'center' });
        
        y += 30;
    }

    // Legend
    y += 20;
    pdf.setFontSize(9);
    pdf.text("Legend: Ind – Independent    Ins – Instructional    Frus – Frustration", x, y);

    // Save the PDF
    const fileName = `Form4_ISR_${formData.studentName || 'Student'}_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
};

window.collectForm4Data = function () {
    const formData = {
        studentName: document.getElementById('studentName').value || '',
        age: document.getElementById('age').value || '',
        gradeSection: document.getElementById('gradeSection').value || '',
        teacher: document.getElementById('teacher').value || '',
        school: document.getElementById('school').value || '',
        language: document.querySelector('input[name="language"]:checked')?.value || '',
        assessmentData: []
    };

    // Collect assessment data for levels 4-10
    for (let level = 4; level <= 10; level++) {
        const levelData = {
            level: level,
            levelStarted: document.getElementById(`levelStarted_${level}`)?.checked || false,
            wordReadingInd: document.getElementById(`wordReadingInd_${level}`)?.value || '',
            wordReadingIns: document.getElementById(`wordReadingIns_${level}`)?.value || '',
            wordReadingFrus: document.getElementById(`wordReadingFrus_${level}`)?.value || '',
            comprehensionInd: document.getElementById(`comprehensionInd_${level}`)?.value || '',
            comprehensionIns: document.getElementById(`comprehensionIns_${level}`)?.value || '',
            comprehensionFrus: document.getElementById(`comprehensionFrus_${level}`)?.value || '',
            dateTaken: document.getElementById(`dateTaken_${level}`)?.value || ''
        };
        formData.assessmentData.push(levelData);
    }

    return formData;
};

window.clearForm = function () {
    // Clear personal information
    document.getElementById('studentName').value = '';
    document.getElementById('age').value = '';
    document.getElementById('gradeSection').value = '';
    document.getElementById('teacher').value = '';
    document.getElementById('school').value = '';
    
    // Clear language selection
    document.querySelectorAll('input[name="language"]').forEach(radio => radio.checked = false);
    
    // Clear assessment data for levels 4-10
    for (let level = 4; level <= 10; level++) {
        document.getElementById(`levelStarted_${level}`).checked = false;
        document.getElementById(`wordReadingInd_${level}`).value = '';
        document.getElementById(`wordReadingIns_${level}`).value = '';
        document.getElementById(`wordReadingFrus_${level}`).value = '';
        document.getElementById(`comprehensionInd_${level}`).value = '';
        document.getElementById(`comprehensionIns_${level}`).value = '';
        document.getElementById(`comprehensionFrus_${level}`).value = '';
        document.getElementById(`dateTaken_${level}`).value = '';
    }
    
    alert('Form cleared successfully!');
};
