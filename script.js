// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Change icon
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // ===== DONATE NOW BUTTON FUNCTIONALITY =====
    const donateNowBtn = document.querySelector('.nav-menu .donate-btn');
    
    if (donateNowBtn) {
        donateNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // If it's in the navigation menu on mobile, close the menu first
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            
            // Open donation modal
            const donateModal = document.getElementById('donate-modal');
            if (donateModal) {
                donateModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                
                // Scroll to top if needed (for mobile)
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                // Add bank transfer button if it doesn't exist
                addBankTransferButton();
            }
        });
    }
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
    
    // Donation Modal
    const donateTriggers = document.querySelectorAll('.donate-trigger');
    const donateModal = document.getElementById('donate-modal');
    const closeModal = document.querySelector('.close-modal');
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('customAmount');
    const proceedDonationBtn = document.querySelector('.proceed-donation');
    
    // Open modal when clicking donate buttons
    if (donateTriggers.length > 0) {
        donateTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                if (donateModal) {
                    donateModal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                    
                    // Add bank transfer button if it doesn't exist
                    addBankTransferButton();
                }
            });
        });
    }
    
    // Close modal
    if (closeModal && donateModal) {
        closeModal.addEventListener('click', function() {
            donateModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === donateModal) {
            donateModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Donation amount selection
    if (amountButtons.length > 0) {
        amountButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                amountButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                // Clear custom amount input
                if (customAmountInput) customAmountInput.value = '';
            });
        });
    }
    
    // When custom amount is entered, remove active class from amount buttons
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            amountButtons.forEach(btn => btn.classList.remove('active'));
        });
    }
    
    // ===== BANK TRANSFER BUTTON FUNCTIONALITY =====
    function addBankTransferButton() {
        // Check if bank transfer button already exists
        if (document.querySelector('.bank-transfer-btn')) return;
        
        const bankTransferBtn = document.createElement('button');
        bankTransferBtn.className = 'btn btn-secondary bank-transfer-btn';
        bankTransferBtn.innerHTML = '<i class="fas fa-university"></i> Bank Transfer';
        bankTransferBtn.style.marginTop = '15px';
        bankTransferBtn.style.width = '100%';
        bankTransferBtn.style.padding = '12px';
        
        // Add event listener
        bankTransferBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showBankDetails();
        });
        
        // Add to donation options
        const donationOptions = document.querySelector('.donation-options');
        if (donationOptions) {
            // Insert before the secure note
            const secureNote = donationOptions.querySelector('.secure-note');
            if (secureNote) {
                donationOptions.insertBefore(bankTransferBtn, secureNote);
            } else {
                donationOptions.appendChild(bankTransferBtn);
            }
        }
    }
    
    function showBankDetails() {
        // Create a modal for bank details
        const bankModal = document.createElement('div');
        bankModal.className = 'modal';
        bankModal.id = 'bank-modal';
        bankModal.style.display = 'flex';
        bankModal.style.zIndex = '1001';
        
        bankModal.innerHTML = `
            <div class="modal-content" style="max-width: 500px;">
                <span class="close-bank-modal" style="position: absolute; top: 15px; right: 20px; font-size: 28px; cursor: pointer; color: #666;">&times;</span>
                <h2><i class="fas fa-university"></i> Bank Transfer Details</h2>
                <p style="margin-bottom: 20px;">You can make a direct bank transfer to our account:</p>
                
                <div class="bank-details-container" style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #0077b6;">
                    <div class="bank-detail-item" style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #dee2e6;">
                        <div style="font-weight: 600; color: #495057; margin-bottom: 5px;">Bank Name</div>
                        <div style="font-size: 18px; color: #212529;">Standard Bank</div>
                    </div>
                    
                    <div class="bank-detail-item" style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #dee2e6;">
                        <div style="font-weight: 600; color: #495057; margin-bottom: 5px;">Account Holder</div>
                        <div style="font-size: 18px; color: #212529;">Mambeda Foundation NPC</div>
                    </div>
                    
                    <div class="bank-detail-item" style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #dee2e6;">
                        <div style="font-weight: 600; color: #495057; margin-bottom: 5px;">Account Number</div>
                        <div style="font-size: 24px; color: #212529; font-weight: 700; letter-spacing: 2px;">123 456 7890</div>
                    </div>
                    
                    <div class="bank-detail-item" style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #dee2e6;">
                        <div style="font-weight: 600; color: #495057; margin-bottom: 5px;">Branch Code</div>
                        <div style="font-size: 18px; color: #212529;">051001</div>
                    </div>
                    
                    <div class="bank-detail-item" style="margin-bottom: 15px;">
                        <div style="font-weight: 600; color: #495057; margin-bottom: 5px;">Account Type</div>
                        <div style="font-size: 18px; color: #212529;">Current Account</div>
                    </div>
                </div>
                
                <div style="margin-top: 25px; padding: 15px; background: #fff3cd; border-radius: 6px; border: 1px solid #ffeaa7;">
                    <h4 style="color: #856404; margin-top: 0;"><i class="fas fa-info-circle"></i> Important Instructions</h4>
                    <ul style="color: #856404; margin-bottom: 0;">
                        <li>Please use your <strong>name</strong> as the payment reference</li>
                        <li>Email proof of payment to <strong>rmambeda@gmail.com</strong></li>
                        <li>We'll send you a donation receipt within 48 hours</li>
                        <li>For international transfers: SWIFT code - SBZAZAJJ</li>
                    </ul>
                </div>
                
                <div style="margin-top: 20px; display: flex; gap: 10px;">
                    <button id="copyBankDetails" class="btn btn-primary" style="flex: 1;">
                        <i class="far fa-copy"></i> Copy Details
                    </button>
                    <button id="closeBankModal" class="btn btn-secondary" style="flex: 1;">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(bankModal);
        document.body.style.overflow = 'hidden';
        
        // Close bank modal functionality
        const closeBankModal = bankModal.querySelector('.close-bank-modal');
        const closeBankModalBtn = bankModal.querySelector('#closeBankModal');
        
        function closeBankModalFunc() {
            bankModal.style.display = 'none';
            document.body.removeChild(bankModal);
            document.body.style.overflow = 'auto';
        }
        
        if (closeBankModal) {
            closeBankModal.addEventListener('click', closeBankModalFunc);
        }
        
        if (closeBankModalBtn) {
            closeBankModalBtn.addEventListener('click', closeBankModalFunc);
        }
        
        // Close when clicking outside
        bankModal.addEventListener('click', function(e) {
            if (e.target === bankModal) {
                closeBankModalFunc();
            }
        });
        
        // Copy bank details functionality
        const copyBtn = bankModal.querySelector('#copyBankDetails');
        if (copyBtn) {
            copyBtn.addEventListener('click', function() {
                const bankDetails = `MAMBEDA FOUNDATION BANK DETAILS:
Bank: Standard Bank
Account Holder: Mambeda Foundation NPC
Account Number: 1234567890
Branch Code: 051001
Account Type: Current Account
Reference: Your Name
Email proof to: rmambeda@gmail.com`;
                
                navigator.clipboard.writeText(bankDetails).then(() => {
                    const originalText = copyBtn.innerHTML;
                    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    copyBtn.style.background = '#28a745';
                    
                    setTimeout(() => {
                        copyBtn.innerHTML = originalText;
                        copyBtn.style.background = '';
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                    alert('Could not copy details. Please copy manually.');
                });
            });
        }
        
        // Close donation modal when bank modal opens
        const donateModal = document.getElementById('donate-modal');
        if (donateModal) {
            donateModal.style.display = 'none';
        }
    }
    
    // Process donation (simulated) with purpose
    if (proceedDonationBtn) {
        proceedDonationBtn.addEventListener('click', function() {
            let donationAmount = 0;
            let donationType = document.querySelector('input[name="donationType"]:checked').value;
            let donationPurpose = document.getElementById('donationPurpose').value;
            
            // Check if a preset amount is selected
            const activeAmountBtn = document.querySelector('.amount-btn.active');
            if (activeAmountBtn) {
                donationAmount = activeAmountBtn.getAttribute('data-amount');
            } 
            // Or use custom amount
            else if (customAmountInput && customAmountInput.value) {
                donationAmount = customAmountInput.value;
            } 
            // Default amount
            else {
                donationAmount = 100;
            }
            
            // Validate amount
            if (donationAmount <= 0 || isNaN(donationAmount)) {
                alert('Please enter a valid donation amount.');
                return;
            }
            
            // Get purpose text
            const purposeSelect = document.getElementById('donationPurpose');
            const purposeText = purposeSelect.options[purposeSelect.selectedIndex].text;
            
            // In a real implementation, this would redirect to a payment gateway
            if (donateModal) {
                donateModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
            
            // Show donation confirmation with purpose
            const confirmed = confirm(`Thank you for your ${donationType} donation of R${donationAmount}!\n\nPurpose: ${purposeText}\n\nClick OK to proceed to secure online payment.\n\nOr click Cancel to view bank transfer details instead.`);
            
            if (confirmed) {
                // Redirect to payment gateway (simulated)
                setTimeout(() => {
                    alert('Redirecting to secure payment gateway...\n\nFor now, please contact us at rmambeda@gmail.com for payment instructions.');
                }, 500);
            } else {
                // Show bank transfer details
                setTimeout(() => {
                    showBankDetails();
                }, 300);
            }
            
            // Reset form
            amountButtons.forEach(btn => btn.classList.remove('active'));
            const defaultAmountBtn = document.querySelector('.amount-btn[data-amount="100"]');
            if (defaultAmountBtn) defaultAmountBtn.classList.add('active');
            if (customAmountInput) customAmountInput.value = '';
        });
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            alert(`Thank you ${name}! Your message has been sent. We will get back to you at ${email} within 48 hours.`);
            contactForm.reset();
        });
    }
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        }
    });
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Active navigation link based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (!link.classList.contains('donate-btn') && link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                alert(`Thank you for subscribing with ${emailInput.value}! You'll receive our updates soon.`);
                emailInput.value = '';
            }
        });
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#donate-modal' || this.classList.contains('donate-btn')) {
                return;
            }
            
            if (href === '#' || href.startsWith('javascript')) return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize with R100 donation as default
    const defaultAmountBtn = document.querySelector('.amount-btn[data-amount="100"]');
    if (defaultAmountBtn) {
        defaultAmountBtn.classList.add('active');
    }
    
    // Add bank transfer button to modal if it exists on page load
    if (document.getElementById('donate-modal')) {
        addBankTransferButton();
    }
});
