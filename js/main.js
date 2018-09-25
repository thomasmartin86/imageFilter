/* variables */
const canvas = document.querySelector('#canvas');
const downloadBtn = document.querySelector('#download-btn');
const uploadFile = document.querySelector('#upload-file');
const removeBtn = document.querySelector('#remove-btn');
const ctx = canvas.getContext('2d');
let img = new Image();
let fileName = '';

/* event delegation to avoid adding eventlisterner on each button */
/* filters and effects */
document.addEventListener('click', e => {
  if (e.target.classList.contains('filter-btn')) {
    /* look for specific filter classes */
    /* brightness */
    if (e.target.classList.contains('brightness-add')) {
      Caman('#canvas', img, function() {
        this.brightness(5).render();
      });
    } else if (e.target.classList.contains('brightness-remove')) {
      Caman('#canvas', img, function() {
        this.brightness(-5).render();
      });
    } else if (e.target.classList.contains('contrast-add')) {
      /* contrast */
      Caman('#canvas', img, function() {
        this.contrast(5).render();
      });
    } else if (e.target.classList.contains('contrast-remove')) {
      Caman('#canvas', img, function() {
        this.contrast(-5).render();
      });
    } else if (e.target.classList.contains('saturation-add')) {
      /* saturation */
      Caman('#canvas', img, function() {
        this.saturation(5).render();
      });
    } else if (e.target.classList.contains('saturation-remove')) {
      Caman('#canvas', img, function() {
        this.saturation(-5).render();
      });
    } else if (e.target.classList.contains('vibrance-add')) {
      /* vibrance */
      Caman('#canvas', img, function() {
        this.vibrance(5).render();
      });
    } else if (e.target.classList.contains('vibrance-remove')) {
      Caman('#canvas', img, function() {
        this.vibrance(-5).render();
      });
    } else if (e.target.classList.contains('vintage-add')) {
      Caman('#canvas', img, function() {
        this.vintage().render();
      });
    } else if (e.target.classList.contains('lomo-add')) {
      Caman('#canvas', img, function() {
        this.lomo().render();
      });
    } else if (e.target.classList.contains('clarity-add')) {
      Caman('#canvas', img, function() {
        this.clarity().render();
      });
    } else if (e.target.classList.contains('sincity-add')) {
      Caman('#canvas', img, function() {
        this.sinCity().render();
      });
    } else if (e.target.classList.contains('crossprocess-add')) {
      Caman('#canvas', img, function() {
        this.crossProcess().render();
      });
    } else if (e.target.classList.contains('pinhole-add')) {
      Caman('#canvas', img, function() {
        this.pinhole().render();
      });
    } else if (e.target.classList.contains('nostalgia-add')) {
      Caman('#canvas', img, function() {
        this.nostalgia().render();
      });
    } else if (e.target.classList.contains('hermajesty-add')) {
      Caman('#canvas', img, function() {
        this.herMajesty().render();
      });
    }
  }
});

/* upload file */
uploadFile.addEventListener('change', e => {
  /* get the file */
  const file = document.getElementById('upload-file').files[0];

  /* init the file reader */
  const reader = new FileReader();
  if (file) {
    fileName = file.name;
    /* read the data as url */
    reader.readAsDataURL(file);
  }

  /* add image to canvas */
  reader.addEventListener(
    'load',
    () => {
      /* create image */
      img = new Image();
      /* set src */
      img.src = reader.result;
      /* add to canvas on load */
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        canvas.removeAttribute('data-caman-id');
      };
    },
    false
  );
});

/* revert listeners */
removeBtn.addEventListener('click', e => {
  Caman('#canvas', img, function() {
    this.revert();
  });
});

/* download event */
downloadBtn.addEventListener('click', e => {
  console.log(fileName);
  /* get the file extension for editing name */
  const fileExtension = fileName.slice(-4);

  console.log(fileExtension);

  /* init new filename variable */
  let newFileName;

  /* check that its an image */
  if (fileExtension === '.jpg' || fileExtension === '.png') {
    newFileName = fileName.substring(0, fileName.length - 4) + '-edited.jpeg';
    console.log(newFileName);
    download(canvas, newFileName);
  } else if (fileExtension === 'jpeg') {
    newFileName = fileName.substring(0, fileName.length - 5) + '-edited.jpeg';
    console.log(newFileName);
    download(canvas, newFileName);
  }
});

/* download function */
function download(canvas, filename) {
  console.log(filename);
  /* init event */
  let e;
  /* create a link */
  const link = document.createElement('a');

  /* set props  */

  link.href = canvas.toDataURL('image/jpeg', 0.8);
  link.download = filename;
  /* new mouse event */
  e = new MouseEvent('click');
  console.log(link.download);
  /* dispatch event */
  link.dispatchEvent(e);
}
