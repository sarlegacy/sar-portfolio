
/**
 * Handles the generation of a PDF from a specific DOM element using html2pdf.js.
 * It ensures the document is temporarily rendered in light mode for a professional look,
 * updates the document title for the filename, and handles the cleanup.
 */
export const generatePDF = async (elementId: string, fileName: string): Promise<void> => {
    const originalTitle = document.title;
    document.title = fileName;

    // Logic to handle Dark Mode for PDF Generation
    // html2pdf captures the screen as-is. If in dark mode, PDF is dark.
    // We temporarily remove 'dark' class from html to render light version.
    const wasDark = document.documentElement.classList.contains('dark');
    if (wasDark) {
        document.documentElement.classList.remove('dark');
    }

    try {
        // Wait for styles to apply/repaint
        await new Promise(resolve => setTimeout(resolve, 100));

        const element = document.getElementById(elementId);
        
        if (element && typeof window !== 'undefined' && (window as any).html2pdf) {
            const opt = {
                margin: 0,
                filename: `${fileName}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            await (window as any).html2pdf().set(opt).from(element).save();
        } else {
            // Fallback to print dialog if library fails or missing
            window.print();
        }
    } catch (error) {
        console.error("PDF Generation failed, falling back to print", error);
        window.print();
    } finally {
        // Restore Theme and Title
        if (wasDark) {
            document.documentElement.classList.add('dark');
        }
        document.title = originalTitle;
    }
};
