"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Loader2, Download, Zap, Image as ImageIcon } from "lucide-react";
import { loadFFmpeg } from "@/lib/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { useI18n } from "@/lib/i18n-context";

interface ImageOptimizerProps {
  files: File[];
  onComplete: (processedFiles: ProcessedFile[]) => void;
}

export interface ProcessedFile {
  name: string;
  url: string;
  size: number;
  originalSize: number;
  format: string;
}

export default function ImageOptimizer({ files, onComplete }: ImageOptimizerProps) {
  const { t } = useI18n();
  const [format, setFormat] = useState("webp");
  const [quality, setQuality] = useState(80);
  const [scale, setScale] = useState(100);
  const [keepMetadata, setKeepMetadata] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([]);

  const imageFiles = files.filter(f => f.type.startsWith("image/"));

  const processImages = async () => {
    if (imageFiles.length === 0) return;
    
    setIsProcessing(true);
    const ffmpeg = await loadFFmpeg();
    const results: ProcessedFile[] = [];

    for (const file of imageFiles) {
      const inputName = file.name;
      const outputName = `${file.name.split(".")[0]}.${format}`;

      await ffmpeg.writeFile(inputName, await fetchFile(file));

      let ffmpegArgs = ["-i", inputName];
      
      if (scale !== 100) {
        ffmpegArgs.push("-vf", `scale=iw*${scale/100}:-1`);
      }

      if (format === "webp") {
        ffmpegArgs.push("-q:v", quality.toString());
      } else if (format === "jpg" || format === "jpeg") {
        ffmpegArgs.push("-q:v", (31 - Math.floor(quality / 100 * 31)).toString());
      }

      if (!keepMetadata) {
        ffmpegArgs.push("-map_metadata", "-1");
      }

      // Optimization: use faster preset where applicable
      ffmpegArgs.push("-threads", "0"); // Use all available cores

      ffmpegArgs.push(outputName);

      await ffmpeg.exec(ffmpegArgs);

      const data = await ffmpeg.readFile(outputName);
      const blob = new Blob([data], { type: `image/${format}` });
      const url = URL.createObjectURL(blob);

      results.push({
        name: outputName,
        url: url,
        size: blob.size,
        originalSize: file.size,
        format: format,
      });

      // Cleanup
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
                <SelectItem value="webp">WebP ({t('recommended')})</SelectItem>
                <SelectItem value="png">PNG</SelectItem>
                <SelectItem value="jpg">JPG</SelectItem>
                <SelectItem value="avif">AVIF</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>{t('quality')} ({quality}%)</Label>
            </div>
            <Slider
              value={[quality]}
              onValueChange={(vals) => setQuality(vals[0])}
              min={1}
              max={100}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>{t('resize')} ({scale}%)</Label>
            </div>
            <Slider
              value={[scale]}
              onValueChange={(vals) => setScale(vals[0])}
              min={10}
              max={100}
              step={10}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t('metadata')}</Label>
              <p className="text-xs text-muted-foreground">EXIF, GPS, etc.</p>
            </div>
            <Switch checked={keepMetadata} onCheckedChange={setKeepMetadata} />
          </div>
        </div>

        <div className="flex flex-col justify-end">
          <Button 
            onClick={processImages} 
            disabled={imageFiles.length === 0 || isProcessing}
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
                {t('optimize')} {imageFiles.length} {t('images').toLowerCase()}
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
              <div key={i} className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900 rounded-md">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{file.name}</span>
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <span>{(file.size / 1024).toFixed(1)} KB</span>
                    <span className="text-green-600 font-bold">
                      -{Math.round((1 - file.size / file.originalSize) * 100)}%
                    </span>
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
