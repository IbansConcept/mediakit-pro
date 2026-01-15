"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Loader2, Download, Video, Music, Scissors, Clock, Zap } from "lucide-react";
import { loadFFmpeg } from "@/lib/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { useI18n } from "@/lib/i18n-context";

interface VideoOptimizerProps {
  files: File[];
  onComplete: (processedFiles: any[]) => void;
}

export default function VideoOptimizer({ files, onComplete }: VideoOptimizerProps) {
  const { t } = useI18n();
  const [action, setAction] = useState("compress");
  const [format, setFormat] = useState("mp4");
  const [startTime, setStartTime] = useState("00:00:00");
  const [endTime, setEndTime] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFiles, setProcessedFiles] = useState<any[]>([]);

  const videoFiles = files.filter(f => f.type.startsWith("video/"));

  const processVideos = async () => {
    if (videoFiles.length === 0) return;
    
    setIsProcessing(true);
    const ffmpeg = await loadFFmpeg();
    const results: any[] = [];

    for (const file of videoFiles) {
      const inputName = file.name;
      const outputName = `${file.name.split(".")[0]}_opt.${action === "extract-audio" ? "mp3" : format}`;

      await ffmpeg.writeFile(inputName, await fetchFile(file));

      let ffmpegArgs = ["-i", inputName];

      if (startTime !== "00:00:00") {
        ffmpegArgs.push("-ss", startTime);
      }
      if (endTime) {
        ffmpegArgs.push("-to", endTime);
      }

      if (action === "compress") {
        // Use veryfast preset for speed as requested
        ffmpegArgs.push("-vcodec", "libx264", "-crf", "28", "-preset", "veryfast", "-threads", "0");
      } else if (action === "tiktok") {
        ffmpegArgs.push("-vf", "crop=ih*9/16:ih", "-preset", "veryfast", "-threads", "0");
      } else if (action === "extract-audio") {
        ffmpegArgs.push("-vn", "-acodec", "libmp3lame");
      }

      ffmpegArgs.push(outputName);

      await ffmpeg.exec(ffmpegArgs);

      const data = await ffmpeg.readFile(outputName);
      const mimeType = action === "extract-audio" ? "audio/mpeg" : `video/${format}`;
      const blob = new Blob([data as any], { type: mimeType });
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
            <Label>{t('action')}</Label>
            <Select value={action} onValueChange={setAction}>
              <SelectTrigger>
                <SelectValue placeholder={t('action')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compress">{t('compress')}</SelectItem>
                <SelectItem value="tiktok">{t('tiktok')}</SelectItem>
                <SelectItem value="extract-audio">{t('extract_audio')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {action !== "extract-audio" && (
            <div className="space-y-2">
              <Label>{t('format')}</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger>
                  <SelectValue placeholder={t('format')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mp4">MP4</SelectItem>
                  <SelectItem value="webm">WebM</SelectItem>
                  <SelectItem value="mov">MOV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4" /> {t('start_time')}
              </Label>
              <Input 
                value={startTime} 
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="00:00:00"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4" /> {t('end_time')}
              </Label>
              <Input 
                value={endTime} 
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="00:00:10"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-end">
          <Button 
            onClick={processVideos} 
            disabled={videoFiles.length === 0 || isProcessing}
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
                {t('optimize')} {videoFiles.length} {t('videos').toLowerCase()}
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
              <div key={i} className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 rounded-md">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{file.name}</span>
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <span>{(file.size / (1024 * 1024)).toFixed(1)} MB</span>
                    {file.size < file.originalSize && (
                      <span className="text-green-600 font-bold">
                        -{Math.round((1 - file.size / file.originalSize) * 100)}%
                      </span>
                    )}
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
