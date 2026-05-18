/**
 * Firebase Contact Form Handler
 * Stores contact submissions to Firebase Realtime Database
 */

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

        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            business: formData.get('business'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            service: formData.get('service'),
            message: formData.get('message'),
            timestamp: new Date().toISOString(),
            dateTime: new Date().toLocaleString()
        };

        try {
            // Check if Firebase is initialized
            if (typeof database === 'undefined') {
                throw new Error('Firebase not initialized. Please check firebase-config.js');
            }

            // Save to Firebase Realtime Database
            const newContactRef = database.ref('contacts').push();
            await newContactRef.set(data);

            // Success feedback
            showToast('Message sent successfully! We will get back to you soon.', 'success');
            contactForm.reset();

            // Optional: Log submission
            console.log('Contact form submitted:', data);

        } catch (error) {
            console.error('Submission error:', error);
            
            // Show appropriate error message
            let errorMsg = 'Something went wrong. Please try again or call us directly.';
            if (error.message.includes('Firebase not initialized')) {
                errorMsg = 'Firebase configuration missing. Please contact support.';
            } else if (error.message.includes('Permission denied')) {
                errorMsg = 'Database permission denied. Please contact support.';
            }
            
            showToast(errorMsg, 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });

    /**
     * Show toast notification
     */
    function showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        const bgColor = type === 'success' ? '#25D366' : '#FF3B30';
        
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas ${icon}"></i>
                <span>${message}</span>
                <button class="toast-close" aria-label="Close">&times;</button>
            </div>
        `;
        
        // Apply styles
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: bgColor,
            color: 'white',
            padding: '16px 24px',
            borderRadius: '12px',
            zIndex: '3000',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.95rem',
            fontWeight: '600',
            animation: 'fadeIn 0.3s ease-in',
            maxWidth: '400px',
            wordWrap: 'break-word'
        });

        // Add toast content styles
        const content = toast.querySelector('.toast-content');
        if (content) {
            Object.assign(content.style, {
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%'
            });
        }

        // Add close button handler
        const closeBtn = toast.querySelector('.toast-close');
        if (closeBtn) {
            closeBtn.style.cssText = 'background:none;border:none;color:white;font-size:1.5rem;cursor:pointer;padding:0;margin-left:auto;';
            closeBtn.addEventListener('click', () => {
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 300);
            });
        }

        document.body.appendChild(toast);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (toast.parentElement) {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(-50%) translateY(20px)';
                setTimeout(() => {
                    if (toast.parentElement) toast.remove();
                }, 300);
            }
        }, 5000);
    }

    // Add fade-in animation if not already defined
    if (!document.getElementById('toast-animation')) {
        const style = document.createElement('style');
        style.id = 'toast-animation';
        style.textContent = `
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
});

