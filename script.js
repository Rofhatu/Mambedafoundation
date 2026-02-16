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
    
    // ===== RESOURCES LINKS FUNCTIONALITY =====
    document.querySelectorAll('.footer-column ul li a').forEach(link => {
        const text = link.textContent.trim();
        const href = link.getAttribute('href');
        
        // Only handle modal-based resources if they don't have separate pages
        if (href === '#' || href.startsWith('#')) {
            // Resume Templates
            if (text === 'Resume Templates') {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    showResourceModal('resume');
                });
            }
            
            // Application Guide
            if (text === 'Application Guide') {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    showResourceModal('guide');
                });
            }
            
            // Success Stories
            if (text === 'Success Stories') {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    showResourceModal('stories');
                });
            }
            
            // Annual Report
            if (text === 'Annual Report') {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    showResourceModal('report');
                });
            }
            
            // Addiction Helpline
            if (text === 'Addiction Helpline') {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    showResourceModal('addiction');
                });
            }
            
            // GBV Support
            if (text === 'GBV Support') {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    showResourceModal('gbv');
                });
            }
        }
    });
    
    // Function to show resource modal
    function showResourceModal(type) {
        // Remove any existing resource modal
        const existingModal = document.getElementById('resource-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Create modal
        const resourceModal = document.createElement('div');
        resourceModal.className = 'modal';
        resourceModal.id = 'resource-modal';
        resourceModal.style.display = 'flex';
        resourceModal.style.zIndex = '2000';
        
        let modalContent = '';
        
        switch(type) {
            case 'resume':
                modalContent = `
                    <div class="modal-content" style="max-width: 700px;">
                        <span class="close-resource-modal" style="position: absolute; top: 15px; right: 20px; font-size: 28px; cursor: pointer; color: #666;">&times;</span>
                        <h2><i class="fas fa-file-alt"></i> Resume Templates</h2>
                        <p>Download our professionally designed resume templates to help you stand out to employers.</p>
                        
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 30px 0;">
                            <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; text-align: center; border: 2px solid #e9ecef;">
                                <i class="fas fa-briefcase" style="font-size: 3rem; color: #0077b6; margin-bottom: 15px;"></i>
                                <h3 style="color: #023e8a;">Professional Template</h3>
                                <p style="color: #666; margin-bottom: 20px;">For corporate and formal job applications</p>
                                <button class="btn btn-primary download-template" data-template="professional" style="width: 100%;">
                                    <i class="fas fa-download"></i> Download
                                </button>
                            </div>
                            
                            <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; text-align: center; border: 2px solid #e9ecef;">
                                <i class="fas fa-paint-brush" style="font-size: 3rem; color: #0077b6; margin-bottom: 15px;"></i>
                                <h3 style="color: #023e8a;">Creative Template</h3>
                                <p style="color: #666; margin-bottom: 20px;">For design, media, and creative roles</p>
                                <button class="btn btn-primary download-template" data-template="creative" style="width: 100%;">
                                    <i class="fas fa-download"></i> Download
                                </button>
                            </div>
                            
                            <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; text-align: center; border: 2px solid #e9ecef;">
                                <i class="fas fa-graduation-cap" style="font-size: 3rem; color: #0077b6; margin-bottom: 15px;"></i>
                                <h3 style="color: #023e8a;">Entry Level Template</h3>
                                <p style="color: #666; margin-bottom: 20px;">Perfect for graduates and first-time job seekers</p>
                                <button class="btn btn-primary download-template" data-template="entry" style="width: 100%;">
                                    <i class="fas fa-download"></i> Download
                                </button>
                            </div>
                        </div>
                        
                        <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin-top: 20px;">
                            <p style="color: #023e8a; margin-bottom: 0;"><i class="fas fa-info-circle"></i> All templates are in Microsoft Word format and fully editable.</p>
                        </div>
                        
                        <div style="margin-top: 25px; text-align: right;">
                            <button class="btn btn-secondary close-resource-btn">Close</button>
                        </div>
                    </div>
                `;
                break;
                
            case 'guide':
                modalContent = `
                    <div class="modal-content" style="max-width: 700px;">
                        <span class="close-resource-modal" style="position: absolute; top: 15px; right: 20px; font-size: 28px; cursor: pointer; color: #666;">&times;</span>
                        <h2><i class="fas fa-book"></i> Application Guide</h2>
                        <p>Comprehensive guides to help you navigate the job and education application process.</p>
                        
                        <div style="margin: 30px 0;">
                            <div style="background: #f8f9fa; border-radius: 10px; padding: 25px; margin-bottom: 20px;">
                                <h3 style="color: #023e8a; margin-bottom: 15px;"><i class="fas fa-file-signature"></i> Job Application Guide</h3>
                                <ul style="list-style: none; padding: 0;">
                                    <li style="padding: 10px 0; border-bottom: 1px dashed #dee2e6;"><i class="fas fa-check" style="color: #2ecc71; margin-right: 10px;"></i> How to write a compelling cover letter</li>
                                    <li style="padding: 10px 0; border-bottom: 1px dashed #dee2e6;"><i class="fas fa-check" style="color: #2ecc71; margin-right: 10px;"></i> Interview preparation tips</li>
                                    <li style="padding: 10px 0; border-bottom: 1px dashed #dee2e6;"><i class="fas fa-check" style="color: #2ecc71; margin-right: 10px;"></i> Online application strategies</li>
                                    <li style="padding: 10px 0;"><i class="fas fa-check" style="color: #2ecc71; margin-right: 10px;"></i> Follow-up email templates</li>
                                </ul>
                                <button class="btn btn-primary download-guide" data-guide="job" style="margin-top: 20px; width: 100%;">
                                    <i class="fas fa-download"></i> Download Job Application Guide
                                </button>
                            </div>
                            
                            <div style="background: #f8f9fa; border-radius: 10px; padding: 25px;">
                                <h3 style="color: #023e8a; margin-bottom: 15px;"><i class="fas fa-university"></i> Education Application Guide</h3>
                                <ul style="list-style: none; padding: 0;">
                                    <li style="padding: 10px 0; border-bottom: 1px dashed #dee2e6;"><i class="fas fa-check" style="color: #2ecc71; margin-right: 10px;"></i> Bursary and scholarship applications</li>
                                    <li style="padding: 10px 0; border-bottom: 1px dashed #dee2e6;"><i class="fas fa-check" style="color: #2ecc71; margin-right: 10px;"></i> University application process</li>
                                    <li style="padding: 10px 0; border-bottom: 1px dashed #dee2e6;"><i class="fas fa-check" style="color: #2ecc71; margin-right: 10px;"></i> Writing a personal statement</li>
                                    <li style="padding: 10px 0;"><i class="fas fa-check" style="color: #2ecc71; margin-right: 10px;"></i> Financial aid options</li>
                                </ul>
                                <button class="btn btn-primary download-guide" data-guide="education" style="margin-top: 20px; width: 100%;">
                                    <i class="fas fa-download"></i> Download Education Application Guide
                                </button>
                            </div>
                        </div>
                        
                        <div style="margin-top: 25px; text-align: right;">
                            <button class="btn btn-secondary close-resource-btn">Close</button>
                        </div>
                    </div>
                `;
                break;
                
            case 'stories':
                modalContent = `
                    <div class="modal-content" style="max-width: 800px;">
                        <span class="close-resource-modal" style="position: absolute; top: 15px; right: 20px; font-size: 28px; cursor: pointer; color: #666;">&times;</span>
                        <h2><i class="fas fa-star"></i> Success Stories</h2>
                        <p>Real stories of individuals whose lives have been transformed through our programs.</p>
                        
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px; margin: 30px 0;">
                            <div style="background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                                <img src="https://via.placeholder.com/400x200/0077b6/ffffff?text=Thabo's+Story" style="width: 100%; height: 150px; object-fit: cover;">
                                <div style="padding: 20px;">
                                    <h3 style="color: #023e8a;">Thabo's Journey</h3>
                                    <p style="color: #666; font-size: 0.9rem;">From addiction to employment</p>
                                    <p style="color: #666;">"Mambeda Foundation helped me overcome addiction and find a job. Today I'm a mentor helping others on the same journey."</p>
                                    <a href="#" class="read-more-story" data-story="thabo" style="color: #0077b6; font-weight: 600;">Read Full Story →</a>
                                </div>
                            </div>
                            
                            <div style="background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                                <img src="https://via.placeholder.com/400x200/00b4d8/ffffff?text=Precious's+Story" style="width: 100%; height: 150px; object-fit: cover;">
                                <div style="padding: 20px;">
                                    <h3 style="color: #023e8a;">Precious's Triumph</h3>
                                    <p style="color: #666; font-size: 0.9rem;">GBV survivor to entrepreneur</p>
                                    <p style="color: #666;">"After escaping an abusive relationship, I received counseling and business training. Now I run my own catering business."</p>
                                    <a href="#" class="read-more-story" data-story="precious" style="color: #0077b6; font-weight: 600;">Read Full Story →</a>
                                </div>
                            </div>
                            
                            <div style="background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                                <img src="https://via.placeholder.com/400x200/023e8a/ffffff?text=Community+Impact" style="width: 100%; height: 150px; object-fit: cover;">
                                <div style="padding: 20px;">
                                    <h3 style="color: #023e8a;">Mambedani Computer Lab</h3>
                                    <p style="color: #666; font-size: 0.9rem;">Rural digital literacy</p>
                                    <p style="color: #666;">"Our community computer lab has trained over 200 youth in digital skills, opening doors to online work and education."</p>
                                    <a href="#" class="read-more-story" data-story="community" style="color: #0077b6; font-weight: 600;">Read Full Story →</a>
                                </div>
                            </div>
                        </div>
                        
                        <div style="margin-top: 25px; text-align: right;">
                            <button class="btn btn-secondary close-resource-btn">Close</button>
                        </div>
                    </div>
                `;
                break;
                
            case 'report':
                modalContent = `
                    <div class="modal-content" style="max-width: 700px;">
                        <span class="close-resource-modal" style="position: absolute; top: 15px; right: 20px; font-size: 28px; cursor: pointer; color: #666;">&times;</span>
                        <h2><i class="fas fa-chart-bar"></i> Annual Reports</h2>
                        <p>View our annual reports to see our impact and financial transparency.</p>
                        
                        <div style="margin: 30px 0;">
                            <div style="background: #f8f9fa; border-radius: 10px; padding: 25px; margin-bottom: 15px; display: flex; align-items: center; gap: 20px;">
                                <i class="fas fa-file-pdf" style="font-size: 3rem; color: #e74c3c;"></i>
                                <div style="flex: 1;">
                                    <h3 style="color: #023e8a; margin-bottom: 5px;">Annual Report 2025</h3>
                                    <p style="color: #666; margin-bottom: 0;">Highlights: 500+ job placements, 200+ recovery cases, 3 new computer labs</p>
                                </div>
                                <button class="btn btn-primary download-report" data-year="2025">
                                    <i class="fas fa-download"></i> Download
                                </button>
                            </div>
                            
                            <div style="background: #f8f9fa; border-radius: 10px; padding: 25px; margin-bottom: 15px; display: flex; align-items: center; gap: 20px;">
                                <i class="fas fa-file-pdf" style="font-size: 3rem; color: #e74c3c;"></i>
                                <div style="flex: 1;">
                                    <h3 style="color: #023e8a; margin-bottom: 5px;">Annual Report 2024</h3>
                                    <p style="color: #666; margin-bottom: 0;">Highlights: Founded Mambeda Foundation, first 100 beneficiaries</p>
                                </div>
                                <button class="btn btn-primary download-report" data-year="2024">
                                    <i class="fas fa-download"></i> Download
                                </button>
                            </div>
                        </div>
                        
                        <div style="background: #e3f2fd; padding: 20px; border-radius: 8px;">
                            <p style="color: #023e8a; margin-bottom: 0;"><i class="fas fa-lock"></i> All financial statements are audited and verified.</p>
                        </div>
                        
                        <div style="margin-top: 25px; text-align: right;">
                            <button class="btn btn-secondary close-resource-btn">Close</button>
                        </div>
                    </div>
                `;
                break;
                
            case 'addiction':
                modalContent = `
                    <div class="modal-content" style="max-width: 600px;">
                        <span class="close-resource-modal" style="position: absolute; top: 15px; right: 20px; font-size: 28px; cursor: pointer; color: #666;">&times;</span>
                        <h2><i class="fas fa-heartbeat"></i> Addiction Helpline</h2>
                        <p style="font-size: 1.1rem;">24/7 Confidential Support for Substance Abuse and Addiction</p>
                        
                        <div style="background: linear-gradient(135deg, #0077b6, #023e8a); color: white; padding: 30px; border-radius: 15px; text-align: center; margin: 30px 0;">
                            <i class="fas fa-phone-alt" style="font-size: 4rem; margin-bottom: 20px;"></i>
                            <h3 style="color: white; font-size: 2.5rem; margin-bottom: 10px;">0800 123 456</h3>
                            <p style="color: rgba(255,255,255,0.9);">Toll-Free • 24 Hours • Confidential</p>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 25px 0;">
                            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center;">
                                <i class="fas fa-comments" style="font-size: 2rem; color: #0077b6; margin-bottom: 10px;"></i>
                                <h4 style="color: #023e8a;">SMS Support</h4>
                                <p style="color: #666;">Text "HELP" to 32312</p>
                            </div>
                            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center;">
                                <i class="fas fa-envelope" style="font-size: 2rem; color: #0077b6; margin-bottom: 10px;"></i>
                                <h4 style="color: #023e8a;">Email Support</h4>
                                <p style="color: #666;">help@mambeda.org.za</p>
                            </div>
                        </div>
                        
                        <div style="background: #fff3cd; padding: 20px; border-radius: 8px; border-left: 4px solid #ffc107;">
                            <h4 style="color: #856404; margin-bottom: 10px;"><i class="fas fa-exclamation-triangle"></i> Emergency</h4>
                            <p style="color: #856404; margin-bottom: 0;">If this is a medical emergency, please call 10177 immediately.</p>
                        </div>
                        
                        <div style="margin-top: 25px; text-align: right;">
                            <button class="btn btn-primary" onclick="window.location.href='tel:0800123456'" style="margin-right: 10px;">
                                <i class="fas fa-phone"></i> Call Now
                            </button>
                            <button class="btn btn-secondary close-resource-btn">Close</button>
                        </div>
                    </div>
                `;
                break;
                
            case 'gbv':
                modalContent = `
                    <div class="modal-content" style="max-width: 600px;">
                        <span class="close-resource-modal" style="position: absolute; top: 15px; right: 20px; font-size: 28px; cursor: pointer; color: #666;">&times;</span>
                        <h2><i class="fas fa-shield-alt"></i> GBV Support</h2>
                        <p style="font-size: 1.1rem;">Immediate help for survivors of gender-based violence</p>
                        
                        <div style="background: linear-gradient(135deg, #e74c3c, #c0392b); color: white; padding: 30px; border-radius: 15px; text-align: center; margin: 30px 0;">
                            <i class="fas fa-phone-alt" style="font-size: 4rem; margin-bottom: 20px;"></i>
                            <h3 style="color: white; font-size: 2.5rem; margin-bottom: 10px;">0800 428 428</h3>
                            <p style="color: rgba(255,255,255,0.9);">24/7 GBV Helpline • Confidential</p>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 25px 0;">
                            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center;">
                                <i class="fas fa-gavel" style="font-size: 2rem; color: #e74c3c; margin-bottom: 10px;"></i>
                                <h4 style="color: #c0392b;">Legal Aid</h4>
                                <p style="color: #666;">Free legal assistance</p>
                                <p style="color: #c0392b; font-weight: 600;">0800 110 110</p>
                            </div>
                            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center;">
                                <i class="fas fa-home" style="font-size: 2rem; color: #e74c3c; margin-bottom: 10px;"></i>
                                <h4 style="color: #c0392b;">Safe Shelters</h4>
                                <p style="color: #666;">Emergency accommodation</p>
                                <p style="color: #c0392b; font-weight: 600;">0800 555 555</p>
                            </div>
                        </div>
                        
                        <div style="background: #f8d7da; padding: 20px; border-radius: 8px; border-left: 4px solid #dc3545;">
                            <h4 style="color: #721c24; margin-bottom: 10px;"><i class="fas fa-exclamation-circle"></i> Emergency</h4>
                            <p style="color: #721c24; margin-bottom: 0;">If you are in immediate danger, call 10111 (SAPS) or 10177 (Ambulance).</p>
                        </div>
                        
                        <div style="margin-top: 25px; display: flex; gap: 10px; justify-content: flex-end;">
                            <button class="btn btn-primary" onclick="window.location.href='tel:0800428428'" style="background: #e74c3c;">
                                <i class="fas fa-phone"></i> Call Helpline
                            </button>
                            <button class="btn btn-secondary close-resource-btn">Close</button>
                        </div>
                    </div>
                `;
                break;
        }
        
        resourceModal.innerHTML = modalContent;
        document.body.appendChild(resourceModal);
        document.body.style.overflow = 'hidden';
        
        // Close modal functionality
        const closeResourceModal = resourceModal.querySelector('.close-resource-modal');
        const closeResourceBtn = resourceModal.querySelector('.close-resource-btn');
        
        function closeResourceModalFunc() {
            resourceModal.style.display = 'none';
            document.body.removeChild(resourceModal);
            document.body.style.overflow = 'auto';
        }
        
        if (closeResourceModal) {
            closeResourceModal.addEventListener('click', closeResourceModalFunc);
        }
        
        if (closeResourceBtn) {
            closeResourceBtn.addEventListener('click', closeResourceModalFunc);
        }
        
        // Close when clicking outside
        resourceModal.addEventListener('click', function(e) {
            if (e.target === resourceModal) {
                closeResourceModalFunc();
            }
        });
        
        // Download handlers for templates
        const downloadBtns = resourceModal.querySelectorAll('.download-template');
        downloadBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const templateType = this.getAttribute('data-template');
                simulateDownload(`resume_template_${templateType}.docx`, 'Resume Template');
            });
        });
        
        // Download handlers for guides
        const downloadGuideBtns = resourceModal.querySelectorAll('.download-guide');
        downloadGuideBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const guideType = this.getAttribute('data-guide');
                simulateDownload(`${guideType}_application_guide.pdf`, 'Application Guide');
            });
        });
        
        // Download handlers for reports
        const downloadReportBtns = resourceModal.querySelectorAll('.download-report');
        downloadReportBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const reportYear = this.getAttribute('data-year');
                simulateDownload(`annual_report_${reportYear}.pdf`, 'Annual Report');
            });
        });
        
        // Read more story handlers
        const readMoreBtns = resourceModal.querySelectorAll('.read-more-story');
        readMoreBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const storyId = this.getAttribute('data-story');
                showFullStory(storyId);
            });
        });
    }
    
    // Function to simulate download
    function simulateDownload(filename, fileType) {
        const originalText = event.target.innerHTML;
        event.target.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
        event.target.disabled = true;
        
        setTimeout(() => {
            alert(`🔽 Download started: ${filename}\n\nIn a real implementation, this would download the actual ${fileType} file.\n\nFor now, we've simulated the download.`);
            
            event.target.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
            event.target.style.background = '#28a745';
            
            setTimeout(() => {
                event.target.innerHTML = originalText;
                event.target.style.background = '';
                event.target.disabled = false;
            }, 2000);
        }, 1500);
    }
    
    // Function to show full story
    function showFullStory(storyId) {
        const storyModal = document.createElement('div');
        storyModal.className = 'modal';
        storyModal.style.display = 'flex';
        storyModal.style.zIndex = '2001';
        
        let storyContent = '';
        
        if (storyId === 'thabo') {
            storyContent = `
                <div class="modal-content" style="max-width: 600px;">
                    <span class="close-story-modal" style="position: absolute; top: 15px; right: 20px; font-size: 28px; cursor: pointer;">&times;</span>
                    <h2>Thabo's Journey: From Addiction to Employment</h2>
                    <img src="https://via.placeholder.com/600x300/0077b6/ffffff?text=Thabo+Molefe" style="width: 100%; border-radius: 10px; margin: 20px 0;">
                    <p>Thabo Molefe, 34, from Soweto, struggled with substance abuse for over a decade after losing his job. "I had given up hope," he shares. "Every day was a battle."</p>
                    <p>In 2024, Thabo found Mambeda Foundation's addiction recovery program. Through counseling, life skills training, and unwavering support, he completed a 6-month rehabilitation program.</p>
                    <p>Today, Thabo is 18 months sober and works as a peer counselor at our foundation. "Mambeda didn't just save my life—they gave me purpose. Now I help others find their way back."</p>
                    <p>Thabo is now training to become a certified addiction counselor and dreams of opening his own recovery center.</p>
                    <button class="btn btn-primary close-story-btn" style="margin-top: 20px;">Close Story</button>
                </div>
            `;
        } else if (storyId === 'precious') {
            storyContent = `
                <div class="modal-content" style="max-width: 600px;">
                    <span class="close-story-modal" style="position: absolute; top: 15px; right: 20px; font-size: 28px; cursor: pointer;">&times;</span>
                    <h2>Precious's Triumph: From Survivor to Business Owner</h2>
                    <img src="https://via.placeholder.com/600x300/00b4d8/ffffff?text=Precious+Ndlovu" style="width: 100%; border-radius: 10px; margin: 20px 0;">
                    <p>Precious Ndlovu, 28, escaped an abusive relationship with nothing but her two children. "I was broken, scared, and didn't know where to turn," she recalls.</p>
                    <p>Mambeda Foundation provided emergency shelter, counseling, and legal support. Through our GBV program, Precious received trauma counseling and joined our small business development training.</p>
                    <p>Today, Precious runs "Precious Catering," a successful business catering for corporate events. She employs three other GBV survivors from our program.</p>
                    <p>"Mambeda gave me wings. Now I help other women fly."</p>
                    <button class="btn btn-primary close-story-btn" style="margin-top: 20px;">Close Story</button>
                </div>
            `;
        } else if (storyId === 'community') {
            storyContent = `
                <div class="modal-content" style="max-width: 600px;">
                    <span class="close-story-modal" style="position: absolute; top: 15px; right: 20px; font-size: 28px; cursor: pointer;">&times;</span>
                    <h2>Mambedani Computer Lab: Bridging the Digital Divide</h2>
                    <img src="https://via.placeholder.com/600x300/023e8a/ffffff?text=Computer+Lab" style="width: 100%; border-radius: 10px; margin: 20px 0;">
                    <p>In rural Mambedani, access to technology was almost non-existent. Young people were being left behind in a digital world.</p>
                    <p>In 2025, Mambeda Foundation opened a community computer lab with 20 workstations and internet access. The lab offers free training in basic computer skills, Microsoft Office, and online job searching.</p>
                    <p>To date, over 200 youth have been trained. 45 have found online work, and 30 have enrolled in further education using digital skills.</p>
                    <p>"This lab changed our community," says local youth leader Musa. "Our young people now have skills for the future."</p>
                    <button class="btn btn-primary close-story-btn" style="margin-top: 20px;">Close Story</button>
                </div>
            `;
        }
        
        storyModal.innerHTML = storyContent;
        document.body.appendChild(storyModal);
        document.body.style.overflow = 'hidden';
        
        // Close story modal
        const closeStoryModal = storyModal.querySelector('.close-story-modal');
        const closeStoryBtn = storyModal.querySelector('.close-story-btn');
        
        function closeStoryModalFunc() {
            storyModal.style.display = 'none';
            document.body.removeChild(storyModal);
        }
        
        if (closeStoryModal) {
            closeStoryModal.addEventListener('click', closeStoryModalFunc);
        }
        
        if (closeStoryBtn) {
            closeStoryBtn.addEventListener('click', closeStoryModalFunc);
        }
        
        storyModal.addEventListener('click', function(e) {
            if (e.target === storyModal) {
                closeStoryModalFunc();
            }
        });
    }
    
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
                        <div style="font-size: 18px; color: #212529;">Capitec Bank</div>
                    </div>
                    
                    <div class="bank-detail-item" style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #dee2e6;">
                        <div style="font-weight: 600; color: #495057; margin-bottom: 5px;">Account Holder</div>
                        <div style="font-size: 18px; color: #212529;">Mambeda DR</div>
                    </div>
                    
                    <div class="bank-detail-item" style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #dee2e6;">
                        <div style="font-weight: 600; color: #495057; margin-bottom: 5px;">Account Number</div>
                        <div style="font-size: 24px; color: #212529; font-weight: 700; letter-spacing: 2px;">1264756362</div>
                    </div>
                    
                    <div class="bank-detail-item" style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #dee2e6;">
                        <div style="font-weight: 600; color: #495057; margin-bottom: 5px;">Branch Code</div>
                        <div style="font-size: 18px; color: #212529;">470010</div>
                    </div>
                    
                    <div class="bank-detail-item" style="margin-bottom: 15px;">
                        <div style="font-weight: 600; color: #495057; margin-bottom: 5px;">Mobile Phone Transfer</div>
                        <div style="font-size: 18px; color: #212529;">071 315 6305</div>
                    </div>
                </div>
                
                <div style="margin-top: 25px; padding: 15px; background: #fff3cd; border-radius: 6px; border: 1px solid #ffeaa7;">
                    <h4 style="color: #856404; margin-top: 0;"><i class="fas fa-info-circle"></i> Important Instructions</h4>
                    <ul style="color: #856404; margin-bottom: 0;">
                        <li>Please use your <strong>name</strong> as the payment reference</li>
                        <li>Email proof of payment to <strong>rmambeda@gmail.com</strong></li>
                        <li>We'll send you a donation receipt within 48 hours</li>
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
Bank: Capitec Bank
Account Holder: Mambeda DR
Account Number: 1264756362
Branch Code: 470010
Mobile Phone Transfer: 071 315 6305
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
