import React, { useState, useEffect } from 'react';
import { Eye, Maximize2, Minimize2, Loader2, AlertCircle, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ARViewerProps {
  productName: string;
  modelUrl?: string;
  posterUrl?: string;
  className?: string;
}

// Declare model-viewer as a custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          poster?: string;
          alt?: string;
          'shadow-intensity'?: string;
          'camera-controls'?: boolean;
          'auto-rotate'?: boolean;
          'ar'?: boolean;
          'ar-modes'?: string;
          'ar-scale'?: string;
          'camera-orbit'?: string;
          'field-of-view'?: string;
          'min-camera-orbit'?: string;
          'max-camera-orbit'?: string;
          'interaction-prompt'?: string;
          'loading'?: string;
          style?: React.CSSProperties;
        },
        HTMLElement
      >;
    }
  }
}

const ARViewer: React.FC<ARViewerProps> = ({
  productName,
  modelUrl,
  posterUrl,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [modelViewerLoaded, setModelViewerLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isARSupported, setIsARSupported] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [modelLoaded, setModelLoaded] = useState(false);

  // Load Model Viewer script
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
    script.onload = () => {
      setModelViewerLoaded(true);
      // Check AR support
      if ('xr' in navigator) {
        navigator.xr?.isSessionSupported('immersive-ar').then((supported) => {
          setIsARSupported(supported);
        }).catch(() => {
          setIsARSupported(false);
        });
      }
    };
    script.onerror = () => {
      setError('Failed to load AR viewer');
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleModelLoad = () => {
    setIsLoading(false);
    setModelLoaded(true);
    setError(null);
  };

  const handleModelError = () => {
    setIsLoading(false);
    setModelLoaded(false);
    if (retryCount < 2) {
      setRetryCount(prev => prev + 1);
      setTimeout(() => {
        setIsLoading(true);
        setError(null);
      }, 1000);
    } else {
      setError('Failed to load 3D model. Please try again later.');
    }
  };

  const handleOpenModal = () => {
    if (!modelUrl) {
      setError('AR preview not available for this product yet.');
      return;
    }
    setIsOpen(true);
    setIsLoading(true);
    setModelLoaded(false);
    setError(null);
    setRetryCount(0);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const hasModel = Boolean(modelUrl);

  return (
    <TooltipProvider>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="lg" 
                className={`w-full ${className}`}
                disabled={!modelViewerLoaded}
                onClick={handleOpenModal}
              >
                <Eye className="h-5 w-5 mr-2" />
                View in Your Room
                {isARSupported && hasModel && (
                  <Badge variant="secondary" className="ml-2 bg-walmart-yellow text-walmart-yellow-foreground">
                    AR
                  </Badge>
                )}
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          {!hasModel && (
            <TooltipContent>
              <p>AR preview coming soon for this product</p>
            </TooltipContent>
          )}
        </Tooltip>
        
        <DialogContent 
          className={`${
            isFullscreen 
              ? 'max-w-full max-h-full w-screen h-screen m-0 rounded-none' 
              : 'max-w-4xl max-h-[90vh]'
          } p-0 overflow-hidden`}
        >
          <DialogHeader className="p-6 pb-2">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl font-bold">
                  AR Preview: {productName}
                </DialogTitle>
                <DialogDescription className="mt-1">
                  {hasModel ? 'Rotate, zoom, and place this item in your space' : 'AR preview not available yet'}
                </DialogDescription>
              </div>
              <div className="flex items-center space-x-2">
                {isARSupported && hasModel && (
                  <Badge className="bg-walmart-yellow text-walmart-yellow-foreground">
                    <Camera className="h-3 w-3 mr-1" />
                    AR Ready
                  </Badge>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleFullscreen}
                  disabled={!hasModel}
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="relative flex-1 bg-gradient-to-br from-gray-50 to-gray-100">
            {!hasModel ? (
              <div className="flex items-center justify-center h-96">
                <Alert className="m-6 max-w-md">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    AR preview not available for this product yet. We're working on adding 3D models for all our products!
                  </AlertDescription>
                </Alert>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-96">
                <Alert className="m-6 max-w-md">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {error}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2 w-full"
                      onClick={() => {
                        setError(null);
                        setIsLoading(true);
                        setRetryCount(0);
                      }}
                    >
                      Try Again
                    </Button>
                  </AlertDescription>
                </Alert>
              </div>
            ) : (
              <>
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
                      <p className="text-sm text-muted-foreground">
                        Loading 3D model...
                        {retryCount > 0 && ` (Attempt ${retryCount + 1})`}
                      </p>
                    </div>
                  </div>
                )}
                
                {modelViewerLoaded && (
                  <model-viewer
                    key={`${modelUrl}-${retryCount}`}
                    src={modelUrl}
                    poster={posterUrl}
                    alt={`3D model of ${productName}`}
                    shadow-intensity="1"
                    camera-controls={true}
                    auto-rotate={true}
                    ar={isARSupported}
                    ar-modes="webxr scene-viewer quick-look"
                    ar-scale="auto"
                    camera-orbit="0deg 75deg 105%"
                    field-of-view="30deg"
                    min-camera-orbit="auto auto auto"
                    max-camera-orbit="auto auto auto"
                    interaction-prompt="auto"
                    loading="eager"
                    style={{
                      width: '100%',
                      height: isFullscreen ? 'calc(100vh - 120px)' : '500px',
                      backgroundColor: 'transparent'
                    }}
                    onLoad={handleModelLoad}
                    onError={handleModelError}
                  />
                )}
              </>
            )}
          </div>

          {/* Controls and Info */}
          {hasModel && (
            <div className="p-6 pt-2 border-t bg-background">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Drag to rotate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Pinch to zoom</span>
                </div>
                {isARSupported && (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-walmart-yellow rounded-full"></div>
                    <span>Tap AR button to place in room</span>
                  </div>
                )}
              </div>
              
              {!isARSupported && modelLoaded && (
                <Alert className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    AR placement is not supported on this device. You can still view the 3D model above.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};

export default ARViewer;