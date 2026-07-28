const fs = require('fs');
let code = fs.readFileSync('src/components/SupplierModal.tsx', 'utf8');

code = code.replace(
  /const \[serviceImage, setServiceImage\] = useState\("https:\/\/images.unsplash.com\/photo-1517248135467-4c7edcad34c4\?q=80&w=600&auto=format&fit=crop"\);/,
  `const [serviceImages, setServiceImages] = useState<string[]>(["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop"]);`
);

code = code.replace(
  /image: serviceImage,/,
  `image: serviceImages[0] || "",\n      images: serviceImages,`
);

const uploadLogic = `
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).slice(0, 5 - serviceImages.length);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setServiceImages(prev => [...prev, ev.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = ''; // reset
  };
`;

code = code.replace(
  /const resetServiceForm = \(\) => \{/,
  uploadLogic + '\n  const resetServiceForm = () => {'
);

code = code.replace(
  /setServiceImage\("https:\/\/images.unsplash.com\/photo-1517248135467-4c7edcad34c4\?q=80&w=600&auto=format&fit=crop"\);/,
  `setServiceImages(["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop"]);`
);

code = code.replace(
  /setServiceImage\(service\.image\);/,
  `setServiceImages(service.images && service.images.length > 0 ? service.images : [service.image]);`
);

fs.writeFileSync('src/components/SupplierModal.tsx', code);
