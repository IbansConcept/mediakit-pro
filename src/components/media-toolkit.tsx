"use client";

import { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Video as VideoIcon, Music as AudioIcon, Upload, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { loadFFmpeg } from "@/lib/ffmpeg";
import ImageOptimizer from "./image-optimizer";
import VideoOptimizer from "./video-optimizer";
import AudioOptimizer from "./audio-optimizer";
import { useI18n } from "@/lib/i18n-context";

export default function MediaToolkit() {
  const { t, language } = useI18n();
  const [files, setFiles] = useState<File[]>([]);
  const [activeTab, setActiveTab] = useState("image");
  const [isFFmpegLoading, setIsFFmpegLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const initFFmpeg = async () => {
      setIsFFmpegLoading(true);
      try {
        await loadFFmpeg();
      } catch (error) {
        console.error("Failed to load FFmpeg:", error);
      } finally {
        setIsFFmpegLoading(false);
      }
    };
    initFFmpeg();
  }, []);

  const detectAndSetTab = (newFiles: File[]) => {
    if (newFiles.length === 0) return;
    
    // On regarde le premier fichier pour décider de l'onglet
    const firstFile = newFiles[0];
    if (firstFile.type.startsWith("image/")) {
      setActiveTab("image");
    } else if (firstFile.type.startsWith("video/")) {
      setActiveTab("video");
    } else if (firstFile.type.startsWith("audio/")) {
      setActiveTab("audio");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
      detectAndSetTab(newFiles);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...newFiles]);
      detectAndSetTab(newFiles);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <Card>
        <CardHeader>
          <CardTitle>{t('drop_title')}</CardTitle>
          <CardDescription>
            {t('drop_desc')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            className={cn(
              "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
              "hover:border-primary/50 hover:bg-muted/50",
              files.length > 0 ? "border-primary/50 bg-muted/20" : "border-muted-foreground/25"
            )}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              multiple
            />
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-10 w-10 text-muted-foreground" />
              <p className="text-lg font-medium">{t('click_or_drag')}</p>
              <p className="text-sm text-muted-foreground">JPG, PNG, WebP, MP4, MOV, MP3, etc.</p>
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 border dark:border-slate-800 rounded-t-lg">
                <h3 className="font-semibold">{files.length} {t('files_selected')}</h3>
                <Button variant="ghost" size="sm" onClick={() => setFiles([])}>{t('clear_all')}</Button>
              </div>
              <div className="grid gap-2 max-h-[300px] overflow-y-auto pr-2">
                {files.map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-md border dark:border-slate-800">
                    <div className="flex items-center gap-3 overflow-hidden">
                      {file.type.startsWith("image/") ? <ImageIcon className="h-5 w-5 text-blue-500 shrink-0" /> : 
                       file.type.startsWith("video/") ? <VideoIcon className="h-5 w-5 text-emerald-500 shrink-0" /> : 
                       <AudioIcon className="h-5 w-5 text-cyan-500 shrink-0" />}
                      <span className="text-sm font-medium truncate">{file.name}</span>
                      <span className="text-xs text-muted-foreground">({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeFile(i)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-100 dark:bg-slate-900 p-1 border dark:border-slate-800">
          <TabsTrigger value="image" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">
            <ImageIcon className="h-4 w-4" /> {t('images')}
          </TabsTrigger>
          <TabsTrigger value="video" className="flex items-center gap-2 data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all">
            <VideoIcon className="h-4 w-4" /> {t('videos')}
          </TabsTrigger>
          <TabsTrigger value="audio" className="flex items-center gap-2 data-[state=active]:bg-cyan-600 data-[state=active]:text-white transition-all">
            <AudioIcon className="h-4 w-4" /> {t('audio')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="image">
          <Card className="border-none shadow-none">
            <CardHeader className="px-0">
              <CardTitle>{t('image_opt_title')}</CardTitle>
              <CardDescription>{t('image_opt_desc')}</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <ImageOptimizer files={files} onComplete={() => {}} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="video">
          <Card className="border-none shadow-none">
            <CardHeader className="px-0">
              <CardTitle>{t('video_opt_title')}</CardTitle>
              <CardDescription>{t('video_opt_desc')}</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <VideoOptimizer files={files} onComplete={() => {}} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audio">
          <Card className="border-none shadow-none">
            <CardHeader className="px-0">
              <CardTitle>{t('audio_opt_title')}</CardTitle>
              <CardDescription>{t('audio_opt_desc')}</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <AudioOptimizer files={files} onComplete={() => {}} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isFFmpegLoading && (
        <div className="fixed bottom-4 right-4 bg-background border p-4 rounded-lg shadow-lg flex items-center gap-3 z-50">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <p className="text-sm font-medium">{t('processing_engine')}</p>
        </div>
      )}
    </div>
  );
}
