import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const musicas = [
  { titulo: 'Headlands', artista: 'National Sweetheart', src: '/musicas/Headlands - National Sweetheart.mp3', img: '/imagens/img1.jpg' },
  { titulo: 'House on the hill', artista: 'Everet Almond', src: '/musicas/House on the hill - Everet Almond.mp3', img: '/imagens/img2.jpg' },
  { titulo: 'Meneate las Pompis', artista: 'Jovenes Viejos', src: '/musicas/Meneate las Pompis - Jovenes Viejos.mp3', img: '/imagens/img3.jpg' }
];

function App() {
  const [indexMusica, setIndexMusica] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // Adiciona o estado para o progresso
  const [duration, setDuration] = useState(0); // Adiciona o estado para a duração
  const musicaRef = useRef(null);

  const tocarMusica = () => {
    musicaRef.current.play();
    setIsPlaying(true);
  };

  const pausarMusica = () => {
    musicaRef.current.pause();
    setIsPlaying(false);
  };

  const atualizarBarra = () => {
    const audio = musicaRef.current;
    if (audio) {
      setProgress(audio.currentTime / audio.duration || 0);
      document.querySelector('.inicio').textContent = segundosParaMinutos(Math.floor(audio.currentTime));
    }
  };

  const segundosParaMinutos = (segundos) => {
    let minutos = Math.floor(segundos / 60);
    let segundosRestantes = segundos % 60;
    return `${minutos}:${segundosRestantes < 10 ? '0' : ''}${segundosRestantes}`;
  };

  useEffect(() => {
    const audio = musicaRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', atualizarBarra);
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
        document.querySelector('.fim').textContent = segundosParaMinutos(Math.floor(audio.duration));
      });
      return () => {
        audio.removeEventListener('timeupdate', atualizarBarra);
        audio.removeEventListener('loadedmetadata', () => {
          setDuration(audio.duration);
          document.querySelector('.fim').textContent = segundosParaMinutos(Math.floor(audio.duration));
        });
      };
    }
  }, [indexMusica]);

  const renderizarMusica = () => (
    <div className="descricao">
      <h2>{musicas[indexMusica].titulo}</h2>
      <i>{musicas[indexMusica].artista}</i>
    </div>
  );

  return (
    <div className="App">
      <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet" />

      <img src={musicas[indexMusica].img} alt="Capa da música" />
      {renderizarMusica()}

      <div className="duracao">
        <div class="barra-container">
          <div className="barra">
            <progress value={progress} max="1"></progress>
          </div>
        </div>
        <div className="tempo">
          <p className="inicio">0:00</p>
          <p className="fim">0:00</p>
        </div>
      </div>
      <div className="player">
        <i className="fas fa-step-backward setas anterior" onClick={() => setIndexMusica((indexMusica - 1 + musicas.length) % musicas.length)}></i>
        {isPlaying ? (
          <i className="fas fa-pause-circle botao-pause" onClick={pausarMusica}></i>
        ) : (
          <i className="fas fa-play-circle botao-play" onClick={tocarMusica}></i>
        )}
        <i className="fas fa-step-forward setas proxima" onClick={() => setIndexMusica((indexMusica + 1) % musicas.length)}></i>
      </div>
      <audio ref={musicaRef} src={musicas[indexMusica].src}></audio>
    </div>
  );
}

export default App;

