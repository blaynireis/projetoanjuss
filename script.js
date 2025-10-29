document.addEventListener('DOMContentLoaded', function() {
  // --- 1. FUNCIONALIDADE DO MENU MOBILE ---
  const menuToggle = document.querySelector('.menu-toggle');
  const menuList = document.querySelector('#menu-list');
  const menuLinks = document.querySelectorAll('#menu-list a');

  if (menuToggle && menuList) {
      menuToggle.addEventListener('click', function() {
          // Usa o atributo ARIA para controlar o estado
          const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
          menuToggle.setAttribute('aria-expanded', !isExpanded);
          menuList.classList.toggle('show');
      });

      // Fecha menu ao clicar em um link (mobile)
      menuLinks.forEach(link => {
          link.addEventListener('click', () => {
              if (menuList.classList.contains('show')) {
                  menuList.classList.remove('show');
                  menuToggle.setAttribute('aria-expanded', 'false');
              }
          });
      });
  }

  // --- 2. FUNCIONALIDADE DE ZOOM NA GALERIA (MODAL) ---
  const modal = document.getElementById('imagemModal');
  const modalImg = document.getElementById('imagemAmpliada');
  const descricao = document.getElementById('descricaoImagem');
  const fechar = document.querySelector('.fechar');
  const galleryImgs = document.querySelectorAll('.mini-galeria img');

  // Ao clicar em qualquer imagem da mini galeria
  galleryImgs.forEach(img => {
      img.addEventListener('click', function() {
          modal.style.display = 'block';
          modalImg.src = this.src;
          // Usa o alt da imagem como descrição
          descricao.textContent = this.alt;
      });
  });

  // Fecha o modal ao clicar no X
  if (fechar) {
      fechar.onclick = function() {
          modal.style.display = 'none';
      };
  }

  // Fecha ao clicar fora da imagem
  window.onclick = function(event) {
      if (event.target === modal) {
          modal.style.display = 'none';
      }
  };
});
