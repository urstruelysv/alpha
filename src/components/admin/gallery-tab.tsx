import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Upload, Trash2 } from 'lucide-react';

type GalleryImage = {
  id: string;
  url: string;
  alt?: string;
};

export default function GalleryTab() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/admin/gallery', { cache: 'no-store' });
        if (!res.ok) {
          throw new Error('Failed to load gallery');
        }
        const data = (await res.json()) as GalleryImage[];
        setImages(data);
      } catch (err) {
        console.error(err);
        setError('Could not load gallery images.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setError(null);
    setUploading(true);

    try {
      const uploaded: GalleryImage[] = [];

      for (let i = 0; i < files.length; i += 1) {
        const formData = new FormData();
        formData.append('file', files[i]);

        const res = await fetch('/api/admin/gallery', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || 'Failed to upload image');
        }

        const created = (await res.json()) as GalleryImage;
        uploaded.push(created);
      }

      if (uploaded.length > 0) {
        setImages((prev) => [...prev, ...uploaded]);
      }

      // reset input
      event.target.value = '';
    } catch (err) {
      console.error(err);
      setError('Failed to upload image(s). Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setError(null);
    try {
      const res = await fetch(`/api/admin/gallery?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to delete image');
      }

      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete image.');
    }
  };

  return (
    <div>
      <h2 className="heading-md text-white mb-6">Manage Gallery</h2>

      <div className="bg-deep-purple/20 border border-bright-purple/30 rounded-lg p-6 space-y-4 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Upload className="w-6 h-6 text-bright-purple" />
          <div>
            <p className="text-white font-semibold">Upload images</p>
            <p className="text-white/60 text-xs">
              Files will be stored on the server and shown on the website gallery.
            </p>
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-bright-purple file:text-black hover:file:bg-bright-purple/90"
        />
        {uploading && (
          <p className="text-white/70 text-sm">Uploading image(s)... please wait.</p>
        )}
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </div>

      {loading ? (
        <p className="text-white/80">Loading gallery...</p>
      ) : images.length === 0 ? (
        <p className="text-white/60">No images added yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((item) => (
            <div
              key={item.id}
              className="relative group rounded-lg overflow-hidden bg-deep-purple/20 border border-bright-purple/20 aspect-square"
            >
              <Image
                src={item.url}
                alt={item.alt || 'Gallery image'}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
