export const cropImage = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const aspectRatio = 2 / 3;
        const canvas = document.createElement('canvas');
        
        let width = img.width;
        let height = img.height;

        if (width / height > aspectRatio) {
          width = height * aspectRatio;
        } else {
          height = width / aspectRatio;
        }

        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(
          img,
          (img.width - width) / 2,
          (img.height - height) / 2,
          width,
          height,
          0,
          0,
          width,
          height
        );

        canvas.toBlob((blob) => {
          resolve(blob);
        }, file.type);
      };

      img.onerror = () => {
        reject(new Error("Error loading image"));
      };
    });
  };