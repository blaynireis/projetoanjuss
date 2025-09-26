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

  document.addEventListener('DOMContentLoaded', () => {
    // Elementos do modal
    const modal = document.getElementById('imagemModal');
    const modalImg = document.getElementById('imagemAmpliada');
    const descricao = document.getElementById('descricaoImagem');
    const fechar = document.querySelector('.fechar');
  
    // Ao clicar em qualquer imagem da mini galeria
    document.querySelectorAll('.mini-galeria img').forEach(img => {
      img.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = img.src;
        descricao.textContent = img.alt;
      });
    });
  
    // Fecha o modal ao clicar no X
    fechar.onclick = function () {
      modal.style.display = 'none';
    };
  
    // Fecha ao clicar fora da imagem
    window.onclick = function (e) {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    };
  });
  
