/**
 * Subscribers Engine
 * A lightweight, premium subscription capture component.
 */

class SubscriberEngine {
    constructor(config) {
        this.form = document.getElementById(config.formId);
        this.status = document.getElementById(config.statusId);
        this.endpoint = config.endpoint;
        this.submitBtn = this.form.querySelector('button[type="submit"]');
        this.btnText = this.submitBtn.querySelector('span');
        this.loadingDots = this.submitBtn.querySelector('.loading-dots');
        
        this.init();
    }

    init() {
        if (!this.form) return;
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());
        data.source = window.location.hostname || 'local-demo';

        this.setLoading(true);
        this.hideStatus();

        try {
            // Check if endpoint is placeholder
            if (this.endpoint === 'YOUR_GOOGLE_SCRIPT_URL') {
                throw new Error('Please configure your Google Script URL in the integration snippet.');
            }

            // Using no-cors mode for Google Apps Script redirects if necessary, 
            // but standard script bridge usually works with JSONP or JSON if configured.
            // For this bridge, we'll try a standard fetch.
            const response = await fetch(this.endpoint, {
                method: 'POST',
                mode: 'no-cors', // Standard for GAS web apps to avoid CORS preflight issues
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            // Note: with no-cors, we won't get the JSON body back, but we can assume success if it doesn't throw.
            // If the user wants full validation, they'd need a proxy or CORS-enabled backend.
            this.showSuccess('Thank you! You have been subscribed.');
            this.form.reset();

        } catch (error) {
            console.error('Subscription Error:', error);
            this.showError(error.message || 'Something went wrong. Please try again.');
        } finally {
            this.setLoading(false);
        }
    }

    setLoading(isLoading) {
        this.submitBtn.disabled = isLoading;
        if (isLoading) {
            this.btnText.style.display = 'none';
            this.loadingDots.style.display = 'block';
        } else {
            this.btnText.style.display = 'inline';
            this.loadingDots.style.display = 'none';
        }
    }

    showSuccess(msg) {
        this.status.textContent = msg;
        this.status.className = 'status-msg success show';
    }

    showError(msg) {
        this.status.textContent = msg;
        this.status.className = 'status-msg error show';
    }

    hideStatus() {
        this.status.className = 'status-msg';
    }
}

// Export for module systems or just keep global
window.SubscriberEngine = SubscriberEngine;
