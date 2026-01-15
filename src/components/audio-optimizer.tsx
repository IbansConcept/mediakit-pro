"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Download, Music, Zap } from "lucide-react";
import { loadFFmpeg } from "@/lib/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { useI18n } from "@/lib/i18n-context";

interface AudioOptimizerProps {
  files: File[];
  onComplete: (processedFiles: any[]) => void;
}

export default function AudioOptimizer({ files, onComplete }: AudioOptimizerProps) {
  const { t } = useI18n();
  const [format, setFormat] = useState("mp3");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFiles, setProcessedFiles] = useState<any[]>([]);

  const audioFiles = files.filter(f => f.type.startsWith("audio/") || f.type.startsWith("video/"));

  const processAudio = async () => {
    if (audioFiles.length === 0) return;
    
    setIsProcessing(true);
    const ffmpeg = await loadFFmpeg();
    const results: any[] = [];

    for (const file of audioFiles) {
      const inputName = file.name;
      const outputName = `${file.name.split(".")[0]}_opt.${format}`;

      await ffmpeg.writeFile(inputName, await fetchFile(file));

      // Normalization and conversion
      let ffmpegArgs = ["-i", inputName, "-af", "loudnorm", "-threads", "0"];
      
      if (format === "mp3") {
        ffmpegArgs.push("-acodec", "libmp3lame", "-ab", "192k");
      } else if (format === "wav") {
        // No extra args needed for WAV usually
      } else if (format === "aac") {
        ffmpegArgs.push("-acodec", "aac");
      }

      ffmpegArgs.push(outputName);

      await ffmpeg.exec(ffmpegArgs);

      const data = await ffmpeg.readFile(outputName);
      const mimeType = `audio/${format === "mp3" ? "mpeg" : format}`;
      const blob = new Blob([data], { type: mimeType });
      const url = URL.createObjectURL(blob);

      results.push({
        name: outputName,
        url: url,
        size: blob.size,
        originalSize: file.size,
      });

      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);
    }

    setProcessedFiles(results);
    onComplete(results);
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>{t('format')}</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger>
                <SelectValue placeholder={t('format')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mp3">MP3 (Standard)</SelectItem>
                <SelectItem value="wav">WAV ({t('fast_title')})</SelectItem>
                <SelectItem value="aac">AAC</SelectItem>
                <SelectItem value="ogg">OGG</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-xs text-muted-foreground italic">
            Note: {t('normalize')}
          </p>
        </div>

        <div className="flex flex-col justify-end">
          <Button 
            onClick={processAudio} 
            disabled={audioFiles.length === 0 || isProcessing}
            className="w-full h-12 gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                {t('processing')}
              </>
            ) : (
              <>
                <Zap className="h-5 w-5 fill-current" />
                {t('optimize')} {audioFiles.length} {t('audio').toLowerCase()}
              </>
            )}
          </Button>
        </div>
      </div>

      {processedFiles.length > 0 && (
        <div className="space-y-3 pt-4 border-t">
          <h4 className="font-semibold">{t('results')}</h4>
          <div className="grid gap-2">
            {processedFiles.map((file, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-100 dark:border-cyan-900 rounded-md">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{file.name}</span>
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <span>{(file.size / 1024).toFixed(1)} KB</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <a href={file.url} download={file.name}>
                    <Download className="h-4 w-4 mr-2" />
                    {t('download')}
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
