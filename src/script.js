document.addEventListener('DOMContentLoaded', function() {
    let musicas = [
      {titulo:'Guitar solo', artista:'National Sweetheart', src:'../musicas/Headlands - National Sweetheart.mp3', img:'imagens/img1.jpg'},
      {titulo:'Samba raiz', artista:'Everet Almond', src:'../musicas/House on the hill - Everet Almond.mp3', img:'imagens/img2.jpg'},
      {titulo:'Música piano', artista:'Jovenes Viejos', src:'../musicas/Meneate las Pompis.mp3', img:'imagens/img3.jpg'}
    ];
  
    let musica = document.querySelector('audio');
    let indexMusica = 0;
  
    let duracaoMusica = document.querySelector('.fim');
    let imagem = document.querySelector('img');
    let nomeMusica = document.querySelector('.descricao h2');
    let nomeArtista = document.querySelector('.descricao i');
  
    renderizarMusica(indexMusica);

    document.querySelector('.botao-play').addEventListener('click', tocarMusica);
    document.querySelector('.botao-pause').addEventListener('click', pausarMusica);
  
    musica.addEventListener('timeupdate', atualizarBarra);
    musica.addEventListener('loadedmetadata', () => {
      duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    });
  
    document.querySelector('.anterior').addEventListener('click', () => {
      indexMusica--;
      if (indexMusica < 0) {
        indexMusica = musicas.length - 1;
      }
      renderizarMusica(indexMusica);
    });
  
    document.querySelector('.proxima').addEventListener('click', () => {
      indexMusica++;
      if (indexMusica >= musicas.length) {
        indexMusica = 0;
      }
      renderizarMusica(indexMusica);
    });
  
    // Funções
    function renderizarMusica(index) {
      musica.setAttribute('src', musicas[index].src);
      musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
      });
    }
  
    function tocarMusica() {
      musica.play();
      document.querySelector('.botao-pause').style.display = 'block';
      document.querySelector('.botao-play').style.display = 'none';
    }
  
    function pausarMusica() {
      musica.pause();
      document.querySelector('.botao-pause').style.display = 'none';
      document.querySelector('.botao-play').style.display = 'block';
    }
  
    function atualizarBarra() {
      let barra = document.querySelector('progress');
      if (musica.duration) {
        barra.value = musica.currentTime / musica.duration;
        document.querySelector('.inicio').textContent = segundosParaMinutos(Math.floor(musica.currentTime));
      }
    }
  
    function segundosParaMinutos(segundos) {
      let minutos = Math.floor(segundos / 60);
      let segundosRestantes = segundos % 60;
      return `${minutos}:${segundosRestantes < 10 ? '0' : ''}${segundosRestantes}`;
    }
  });
  