/**
 * Utility to handle local image uploads (Avatar, Project Screenshots)
 * Converts local files to base64 Data URLs for instant preview and local storage
 */

export function validateImageFile(file) {
  if (!file) return { valid: false, error: 'Aucun fichier sélectionné.' };

  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Format d\'image non supporté (JPEG, PNG, WEBP, SVG acceptés).' };
  }

  // Max size 5MB
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return { valid: false, error: 'L\'image dépasse la taille maximale autorisée (5 Mo).' };
  }

  return { valid: true };
}

export function readImageAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const check = validateImageFile(file);
    if (!check.valid) {
      reject(new Error(check.error));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.onerror = () => {
      reject(new Error('Erreur lors de la lecture du fichier image.'));
    };
    reader.readAsDataURL(file);
  });
}
