import './index.css';

import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

window.Webflow ||= [];
window.Webflow.push(() => {
  function downloadCanvasAsImage() {
    const canvasElement = document.getElementById('cards-canvas');

    if (canvasElement) {
      // S'assurer que toutes les images sont chargées
      Promise.all(
        Array.from(canvasElement.getElementsByTagName('img')).map((img) => {
          if (img.complete && img.naturalHeight !== 0) {
            return Promise.resolve();
          }
          return new Promise((resolve, reject) => {
            img.addEventListener('load', resolve);
            img.addEventListener('error', reject);
            img.crossOrigin = 'anonymous'; // Ajout de l'attribut crossOrigin
          });
        })
      )
        .then(() => {
          // Une fois toutes les images chargées
          html2canvas(canvasElement, { useCORS: true, backgroundColor: null }).then((canvas) => {
            canvas.toBlob((blob) => {
              if (blob) {
                saveAs(blob, 'cards-image.png');
              }
            });
          });
        })
        .catch((error) => {
          console.error('Erreur lors du chargement des images: ', error);
        });
    }
  }

  document.getElementById('cards-download')?.addEventListener('click', downloadCanvasAsImage);
});
