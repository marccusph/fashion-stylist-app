'use client';

import React, { useState, useRef } from 'react';
import { Camera, Upload, Sparkles, ShoppingBag, X, Loader2 } from 'lucide-react';

export default function FashionStylist() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        setSuggestions(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeFashionItem = async () => {
    if (!image) return;

    setLoading(true);
    try {
      const base64Data = image.split(',')[1];
      
      // Call our API route instead of Anthropic directly
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageData: base64Data
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze image');
      }

      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error:', error);
      alert(`Failed to analyze image: ${error.message}\n\nMake sure you've set up your ANTHROPIC_API_KEY in Vercel environment variables.`);
    } finally {
      setLoading(false);
    }
  };

  const getStoreUrl = (store, searchTerm) => {
    const urls = {
      zara: `https://www.zara.com/search?searchTerm=${encodeURIComponent(searchTerm)}`,
      mango: `https://shop.mango.com/search?q=${encodeURIComponent(searchTerm)}`,
      parfois: `https://www.parfois.com/search/?q=${encodeURIComponent(searchTerm)}`
    };
    return urls[store] || '#';
  };

  const reset = () => {
    setImage(null);
    setSuggestions(null);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="text-purple-600" size={28} />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Style AI
              </h1>
            </div>
            {image && (
              <button onClick={reset} className="text-gray-600 hover:text-gray-800">
                <X size={24} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {!image ? (
          /* Upload Section */
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="text-purple-600" size={36} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Style Your Look
                </h2>
                <p className="text-gray-600">
                  Take a photo of any fashion item and get instant styling suggestions
                </p>
              </div>

              <div className="space-y-3">
                <input
                  type="file"
                  ref={cameraInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                />
                <button
                  onClick={() => cameraInputRef.current?.click()}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
                >
                  <Camera size={24} />
                  Take Photo
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-white border-2 border-purple-200 text-purple-600 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-purple-50 transition-all"
                >
                  <Upload size={24} />
                  Upload from Gallery
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-3">How it works:</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold">1</span>
                  <p>Take a photo of your fashion item (shoes, bag, jewelry, etc.)</p>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold">2</span>
                  <p>AI analyzes colors, style, and vibe</p>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold">3</span>
                  <p>Get outfit suggestions with direct shopping links</p>
                </div>
              </div>
            </div>
          </div>
        ) : !suggestions ? (
          /* Image Preview & Analyze */
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img src={image} alt="Fashion item" className="w-full max-h-96 object-contain bg-gray-50" />
            </div>
            <button
              onClick={analyzeFashionItem}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles size={24} />
                  Get Style Suggestions
                </>
              )}
            </button>
          </div>
        ) : (
          /* Results */
          <div className="space-y-4">
            {/* Item Description */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <img src={image} alt="Fashion item" className="w-full h-48 object-contain bg-gray-50 rounded-xl mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">Your Item:</h3>
              <p className="text-gray-600">{suggestions.itemDescription}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  {suggestions.styleCategory}
                </span>
                {suggestions.colorPalette.map((color, idx) => (
                  <span key={idx} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
                    {color}
                  </span>
                ))}
              </div>
            </div>

            {/* Outfit Suggestions */}
            {suggestions.outfitSuggestions.map((outfit, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{outfit.name}</h3>
                <p className="text-sm text-gray-600 mb-4 italic">{outfit.vibe}</p>

                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className="font-semibold text-purple-600 text-sm mb-1">Tops:</h4>
                    <p className="text-gray-700">{outfit.items.tops}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-600 text-sm mb-1">Bottoms:</h4>
                    <p className="text-gray-700">{outfit.items.bottoms}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-600 text-sm mb-1">Accessories:</h4>
                    <p className="text-gray-700">{outfit.items.accessories}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <ShoppingBag size={18} />
                    Shop Similar Items:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(outfit.searchTerms).map(([store, term]) => (
                      <a
                        key={store}
                        href={getStoreUrl(store, term)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
                      >
                        {store.charAt(0).toUpperCase() + store.slice(1)}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Styling Tips */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Styling Tips</h3>
              <ul className="space-y-2">
                {suggestions.tips.map((tip, idx) => (
                  <li key={idx} className="flex gap-2 text-gray-700">
                    <span className="text-purple-600">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={reset}
              className="w-full bg-white border-2 border-purple-200 text-purple-600 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-all"
            >
              Style Another Item
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
