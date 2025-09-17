document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuList = document.querySelector('#menu-list');
    const menuLinks = menuList.querySelectorAll('a');
  
    // Alterna a visibilidade do menu
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      menuList.classList.toggle('show');
    });
  
    // Fecha o menu ao clicar em um link (para navegação na mesma página)
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (menuList.classList.contains('show')) {
          menuToggle.setAttribute('aria-expanded', 'false');
          menuList.classList.remove('show');
        }
      });
    });
  });