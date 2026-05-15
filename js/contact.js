/**
 * Google Sheets Integration Setup:
 * 1. Create a Google Sheet.
 * 2. Go to Extensions -> Apps Script.
 * 3. Paste the following code:
 * 
 * function doPost(e) {
 *   var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *   var data = JSON.parse(e.postData.contents);
 *   sheet.appendRow([
 *     new Date(), 
 *     data.name, 
 *     data.business, 
 *     data.phone, 
 *     data.email, 
 *     data.service, 
 *     data.message
 *   ]);
 *   return ContentService.createTextOutput(JSON.stringify({result: 'success'}))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 * 
 * 4. Deploy as Web App -> Execute as 'Me' -> Who has access 'Anyone'.
 * 5. Copy the Web App URL and paste it below in SCRIPT_URL.
 */

const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        try {
            // In a real scenario, you'd use fetch(SCRIPT_URL, { ... })
            // For now, we'll simulate the success if SCRIPT_URL is placeholder
            if (SCRIPT_URL.includes('YOUR_GOOGLE')) {
                console.warn('Google Apps Script URL not set. Simulating success.');
                await new Promise(resolve => setTimeout(resolve, 1500));
            } else {
                const response = await fetch(SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors', // Important for Apps Script
                    cache: 'no-cache',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            }

            // Success feedback
            showToast('Message sent successfully! We will get back to you soon.', 'success');
            contactForm.reset();

        } catch (error) {
            console.error('Submission error:', error);
            showToast('Something went wrong. Please try again or call us directly.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });

    function showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type} fade-in`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Style the toast (can be moved to CSS)
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: type === 'success' ? '#25D366' : '#FF3B30',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '12px',
            zIndex: '3000',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.95rem',
            fontWeight: '600'
        });

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }
});
