import { API_SERVICES } from "@/lib/constant";

/**
 * Handles image upload with progress tracking and abort capability
 * @param file The file to upload
 * @param onProgress Optional callback for tracking upload progress
 * @param abortSignal Optional AbortSignal for cancelling the upload
 * @returns Promise resolving to the URL of the uploaded image
 */

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const handleImageUpload = async (
  file: File,
  onProgress?: (event: { progress: number }) => void,
  abortSignal?: AbortSignal
): Promise<string> => {
  if (!file) {
    throw new Error("No file provided");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `File size exceeds maximum allowed (${MAX_FILE_SIZE / (1024 * 1024)}MB)`
    );
  }

  // 1️⃣ Ask your backend for a signed upload URL
  const res = await fetch(
    `${API_SERVICES.image}/get-upload-url?filename=${encodeURIComponent(file.name)}&bucket=blog-image`,
    { signal: abortSignal }
  );

  if (!res.ok) {
    throw new Error("Failed to get upload URL from backend");
  }

  const { uploadUrl, filePath } = await res.json();

  // 2️⃣ Upload directly to Supabase using fetch with progress
  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        onProgress?.({ progress });
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    };

    xhr.onerror = () => reject(new Error("Upload failed"));
    xhr.onabort = () => reject(new Error("Upload cancelled"));

    xhr.open("PUT", uploadUrl);
    xhr.setRequestHeader("Content-Type", file.type); // important for Supabase
    xhr.send(file);

    if (abortSignal) {
      abortSignal.addEventListener("abort", () => xhr.abort());
    }
  });

  // 3️⃣ Return a signed view URL (optional)
  const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/blog-image/${filePath}`;
  return publicUrl;
};