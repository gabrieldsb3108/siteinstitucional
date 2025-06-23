// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeLucideIcons();
    initializeHeader();
    initializeBackToTop();
    initializeSmoothScroll();
    initializeStatsAnimation();
    initializeMobileMenu();
    initializeFormValidation();
});

// Inicializar ícones Lucide
function initializeLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Controle do header fixo
function initializeHeader() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Botão voltar ao topo
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll suave para links de navegação
function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animação dos números das estatísticas
function initializeStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    let animated = false;
    
    function animateStats() {
        if (animated) return;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 segundos
            const increment = target / (duration / 16); // 60 FPS
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                if (target > 1000) {
                    stat.textContent = Math.floor(current).toLocaleString('pt-BR') + '+';
                } else {
                    stat.textContent = Math.floor(current) + (target === 98 ? '%' : '+');
                }
            }, 16);
        });
        
        animated = true;
    }
    
    // Observar quando a seção de estatísticas entra na viewport
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
}

// Menu mobile
function initializeMobileMenu() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const nav = document.getElementById('nav');
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Garante que o clique não seja bloqueado
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }
}

// Validação de formulários
function initializeFormValidation() {
    const agendamentoForm = document.getElementById('agendamentoForm');
    
    if (agendamentoForm) {
        agendamentoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validação básica
            if (!data.nome || !data.telefone || !data.especialidade) {
                showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            // Simular envio
            showNotification('Agendamento realizado com sucesso! Entraremos em contato em breve.', 'success');
            closeModal('agendamentoModal');
            this.reset();
        });
    }
}

// Abrir modal de agendamento
function openAgendamento() {
    openModal('agendamentoModal');
}

// Abrir WhatsApp
function openWhatsApp() {
    const phoneNumber = '32999403239';
    const message = 'Olá! Gostaria de agendar uma consulta ou tirar dúvidas sobre os serviços da HealthCare.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Abrir modal de serviço
function openServiceModal(serviceType) {
    const serviceData = {
        'clinica-geral': {
            title: 'Clínica Geral',
            icon: 'stethoscope',
            description: 'Nossa clínica geral oferece atendimento médico completo para toda a família, com profissionais experientes e cuidado humanizado.',
            services: [
                'Consultas médicas gerais',
                'Check-ups preventivos',
                'Acompanhamento de doenças crônicas',
                'Orientação nutricional',
                'Exames de rotina',
                'Atestados médicos'
            ],
            doctors: ['Dr. João Silva', 'Dra. Maria Santos'],
            schedule: 'Segunda a Sexta: 7h às 19h | Sábado: 8h às 14h'
        },
        'cardiologia': {
            title: 'Cardiologia',
            icon: 'heart',
            description: 'Especialistas em saúde cardiovascular com equipamentos de última geração para diagnóstico preciso e tratamento eficaz.',
            services: [
                'Eletrocardiograma (ECG)',
                'Ecocardiograma',
                'Teste de esforço',
                'Holter 24h',
                'Consultas especializadas',
                'Acompanhamento pós-cirúrgico'
            ],
            doctors: ['Dra. Ana Silva'],
            schedule: 'Segunda, Quarta e Sexta: 8h às 17h'
        },
        'neurologia': {
            title: 'Neurologia',
            icon: 'brain',
            description: 'Diagnóstico e tratamento especializado de distúrbios do sistema nervoso central e periférico.',
            services: [
                'Eletroencefalograma (EEG)',
                'Eletroneuromiografia',
                'Doppler transcraniano',
                'Consultas especializadas',
                'Tratamento de epilepsia',
                'Acompanhamento neurológico'
            ],
            doctors: ['Dr. Carlos Santos'],
            schedule: 'Terça e Quinta: 8h às 17h'
        },
        'oftalmologia': {
            title: 'Oftalmologia',
            icon: 'eye',
            description: 'Cuidados completos para a saúde dos seus olhos com tecnologia avançada em diagnóstico.',
            services: [
                'Consultas oftalmológicas',
                'Exames de refração',
                'Cirurgias de catarata',
                'Tratamento de glaucoma',
                'Adaptação de lentes',
                'Exames de fundo de olho'
            ],
            doctors: ['Dr. João Oliveira'],
            schedule: 'Segunda a Quinta: 8h às 17h'
        },
        'pediatria': {
            title: 'Pediatria',
            icon: 'baby',
            description: 'Cuidado especializado para crianças desde o nascimento até a adolescência com ambiente acolhedor.',
            services: [
                'Puericultura',
                'Vacinação infantil',
                'Consultas de rotina',
                'Atendimento de urgências',
                'Orientação aos pais',
                'Acompanhamento do desenvolvimento'
            ],
            doctors: ['Dra. Maria Costa'],
            schedule: 'Segunda a Sexta: 8h às 18h'
        },
        'farmacia': {
            title: 'Farmácia',
            icon: 'pill',
            description: 'Medicamentos de qualidade com orientação farmacêutica especializada e entrega em domicílio.',
            services: [
                'Medicamentos de marca e genéricos',
                'Orientação farmacêutica',
                'Entrega em domicílio',
                'Manipulação de fórmulas',
                'Produtos de higiene e beleza',
                'Suplementos alimentares'
            ],
            doctors: ['Farm. Ana Paula'],
            schedule: 'Segunda a Sábado: 7h às 22h | Domingo: 8h às 20h'
        }
    };
    
    const service = serviceData[serviceType];
    if (!service) return;
    
    const modalBody = document.getElementById('serviceModalBody');
    const serviceTitle = document.getElementById('serviceTitle');
    
    serviceTitle.textContent = service.title;
    
    modalBody.innerHTML = `
        <div class="service-modal-content">
            <div class="service-modal-header">
                <div class="service-modal-icon">
                    <i data-lucide="${service.icon}"></i>
                </div>
                <p class="service-modal-description">${service.description}</p>
            </div>
            
            <div class="service-modal-section">
                <h3>Serviços Oferecidos</h3>
                <ul class="service-modal-list">
                    ${service.services.map(s => `<li>${s}</li>`).join('')}
                </ul>
            </div>
            
            <div class="service-modal-section">
                <h3>Profissionais</h3>
                <p>${service.doctors.join(', ')}</p>
            </div>
            
            <div class="service-modal-section">
                <h3>Horários de Atendimento</h3>
                <p>${service.schedule}</p>
            </div>
            
            <div class="service-modal-actions">
                <button type="button" class="btn btn-primary" onclick="openAgendamento()">
                    <i data-lucide="calendar"></i>
                    Agendar Consulta
                </button>
                <button type="button" class="btn btn-outline" onclick="openWhatsApp()">
                    <i data-lucide="phone"></i>
                    Falar no WhatsApp
                </button>
            </div>
        </div>
    `;
    
    // Reinicializar ícones Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    openModal('serviceModal');
}

// Funções de modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Foco no modal para acessibilidade
        modal.setAttribute('aria-hidden', 'false');
        const firstFocusable = modal.querySelector('input, button, select, textarea');
        if (firstFocusable) {
            firstFocusable.focus();
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modal.setAttribute('aria-hidden', 'true');
    }
}

// Fechar modal ao clicar fora
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        const modalId = e.target.id;
        closeModal(modalId);
    }
});

// Fechar modal com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            closeModal(activeModal.id);
        }
    }
});

// Sistema de notificações
function showNotification(message, type = 'info') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i data-lucide="${type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : 'info'}"></i>
            <span>${message}</span>
            <button type="button" class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i data-lucide="x"></i>
            </button>
        </div>
    `;
    
    // Adicionar estilos
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 3000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Reinicializar ícones Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Remover automaticamente após 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Adicionar estilos CSS para notificações
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 0.25rem;
        transition: background 0.2s;
        margin-left: auto;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .service-modal-content {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    
    .service-modal-header {
        text-align: center;
    }
    
    .service-modal-icon {
        width: 4rem;
        height: 4rem;
        background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
        border-radius: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1rem;
        color: #3b82f6;
    }
    
    .service-modal-icon i {
        font-size: 2rem;
    }
    
    .service-modal-description {
        color: #64748b;
        line-height: 1.6;
    }
    
    .service-modal-section h3 {
        color: #1e40af;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }
    
    .service-modal-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .service-modal-list li {
        padding: 0.5rem 0;
        border-bottom: 1px solid #f1f5f9;
        position: relative;
        padding-left: 1.5rem;
    }
    
    .service-modal-list li:before {
        content: '✓';
        position: absolute;
        left: 0;
        color: #10b981;
        font-weight: bold;
    }
    
    .service-modal-list li:last-child {
        border-bottom: none;
    }
    
    .service-modal-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 1rem;
    }
    
    @media (max-width: 640px) {
        .service-modal-actions {
            flex-direction: column;
        }
        
        .notification {
            left: 20px;
            right: 20px;
            max-width: none;
        }
    }
`;

document.head.appendChild(notificationStyles);

// Melhorar acessibilidade com navegação por teclado
document.addEventListener('keydown', function(e) {
    // Navegação por Tab nos cards de serviço
    if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.classList.contains('service-card')) {
            e.preventDefault();
            e.target.click();
        }
    }
});

// Lazy loading para imagens
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Inicializar lazy loading quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

