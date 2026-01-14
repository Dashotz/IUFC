import React from 'react'

interface ImageUploaderProps {
    imageUrl: string
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
    uploading: boolean
    fileInputRef: React.RefObject<HTMLInputElement>
}

export default function ImageUploader({ imageUrl, onUpload, uploading, fileInputRef }: ImageUploaderProps) {
    return (
        <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Event Image</label>

            <div className="space-y-4">
                {/* File Input */}
                <div className={`border-2 border-dashed border-gray-700 rounded-lg p-6 text-center transition-all bg-black/20 ${uploading ? 'opacity-50 cursor-wait' : 'hover:border-blue-500 hover:bg-white/5'}`}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onUpload}
                        ref={fileInputRef}
                        disabled={uploading}
                        className="hidden"
                        id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                        {uploading ? (
                            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <svg className="w-8 h-8 text-gray-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        )}
                        <span className="text-sm text-gray-300 font-medium">
                            {uploading ? 'Processing & Uploading...' : 'Click to Upload Image'}
                        </span>
                        <span className="text-xs text-gray-500">Auto-converts to WebP</span>
                    </label>
                </div>

                {/* Preview or URL Display */}
                <div className="bg-black/40 border border-gray-700 rounded-lg p-3 flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/10 rounded overflow-hidden flex-shrink-0 relative">
                        {imageUrl && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        )}
                    </div>
                    {imageUrl && !imageUrl.startsWith('/images') ? (
                        <div className="flex-1 text-sm text-green-400 font-medium flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            Image Uploaded Successfully
                        </div>
                    ) : (
                        <div className="flex-1 text-sm text-gray-400 italic">
                            No specific image uploaded (using default)
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
