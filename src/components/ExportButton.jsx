import React from 'react';
import * as XLSX from 'xlsx';
import './ExportButton.css';

export default function ExportButton({ contacts }) {
  const handleExport = () => {
    if (!contacts || contacts.length === 0) {
      alert('No data to export');
      return;
    }

    // Format data for Excel
    const data = contacts.map(contact => ({
      'Name': contact.name,
      'Email': contact.email,
      'Phone': contact.phone,
      'Company': contact.company || '-',
      'Comments': contact.comment || '',
      'Submitted Date': new Date(contact.created_at).toLocaleString()
    }));

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Set column widths for better readability
    const columnWidths = [
      { wch: 20 },  // Name
      { wch: 25 },  // Email
      { wch: 15 },  // Phone
      { wch: 20 },  // Company
      { wch: 40 },  // Comments
      { wch: 18 }   // Submitted Date
    ];
    worksheet['!cols'] = columnWidths;

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Contacts');

    // Generate filename with current date
    const date = new Date().toISOString().split('T')[0];
    const filename = `GPS_Form_Submissions_${date}.xlsx`;

    // Trigger download
    XLSX.writeFile(workbook, filename);
  };

  return (
    <button 
      className="export-button" 
      onClick={handleExport}
      title={`Export ${contacts?.length || 0} submissions to Excel`}
    >
      📊 Export to Excel
    </button>
  );
}
