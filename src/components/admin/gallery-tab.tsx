'use client';

import { Upload, Trash2 } from 'lucide-react';

export default function GalleryTab() {
  return (
    <div>
      <h2 className="heading-md text-white mb-6">Manage Gallery</h2>

      <div className="border-2 border-dashed border-bright-purple/30 rounded-lg p-12 text-center mb-8 hover:border-bright-purple/50 transition-colors cursor-pointer">
        <Upload className="w-12 h-12 text-bright-purple mx-auto mb-4" />
        <p className="text-white font-semibold mb-2">Drag and drop images here</p>
        <p className="text-white/60 text-sm">or click to select files</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="relative group rounded-lg overflow-hidden bg-deep-purple/20 border border-bright-purple/20 aspect-square">
            <img
              src={`/placeholder.svg?height=200&width=200`}
              alt={`Gallery item ${item}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button className="p-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors">
                <Trash2 className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
