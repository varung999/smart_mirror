'use client'
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useRef } from "react";

export function DetectSpeech({ children }: PropsWithChildren) {
    const router = useRouter();
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const audioContextRef = useRef<AudioContext | null>(null);
    const silenceStartRef = useRef<number | null>(null);
    const silenceThreshold = 0.01;
    const silenceDuration = 4000;

    useEffect(() => {
        let stream: MediaStream;
        let analyser: AnalyserNode;
        let dataArray: Float32Array;

        const detectSilence = () => {
            analyser.getFloatTimeDomainData(dataArray);
            const maxVolume = Math.max(...dataArray.map(Math.abs));

            const now = Date.now();
            if (maxVolume < silenceThreshold) {
                if (!silenceStartRef.current) silenceStartRef.current = now;
                else if (now - silenceStartRef.current > silenceDuration) {
                    stopRecordingAndRestart();
                }
            } else {
                silenceStartRef.current = null;
            }

            requestAnimationFrame(detectSilence);
        };

        const startRecording = async () => {
            stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioContextRef.current = new AudioContext();
            const source = audioContextRef.current.createMediaStreamSource(stream);

            analyser = audioContextRef.current.createAnalyser();
            analyser.fftSize = 2048;
            dataArray = new Float32Array(analyser.fftSize);
            source.connect(analyser);

            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) audioChunksRef.current.push(e.data);
            };

            mediaRecorderRef.current.onstop = async () => {
                const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const formData = new FormData();
                const filename = new Date().toString() + '.wav'
                formData.append('file', blob, filename)

                const response = await fetch('http://localhost:3000/api/chat', { method: 'POST', body: formData })
                const data = await response.json()
                console.log(data)
                const { message } = data
                if (message === 'weather') router.push('/weather')
                if (message === 'todo') router.push('/todo')
                if (message === 'cta') router.push('/cta')
                if (message === 'news') router.push('/news')
                if (message === 'home') router.push('/')

                // Restart recording
                startRecording();
            };

            mediaRecorderRef.current.start();
            detectSilence();
        };

        const stopRecordingAndRestart = () => {
            mediaRecorderRef.current?.stop();
            silenceStartRef.current = null;
        };

        startRecording();

        return () => {
            mediaRecorderRef.current?.stop();
            stream?.getTracks().forEach(track => track.stop());
            audioContextRef.current?.close();
        };
    }, [router]);

    return children
}