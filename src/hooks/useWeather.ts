"use client";

import { useState, useEffect, useCallback } from 'react';

// 1. Tipe data diperkaya sesuai kodemu sebelumnya
export interface WeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  description: string;
  icon: string;
}

export function useWeather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dibuat dengan useCallback agar stabil dan bisa jadi dependency useEffect
  const fetchWeather = useCallback(async () => {
    // Tetap pakai environment variable biar aman!
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    if (!apiKey) {
      setError("API Key OpenWeatherMap belum diatur.");
      setLoading(false);
      return;
    }
    
    const lat = -7.2278; // Garut
    const lon = 107.9087;
    // 2. Memperbaiki typo di URL API
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=id`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        // 3. Pesan error yang lebih spesifik
        if (response.status === 401) {
          throw new Error("Kunci API tidak valid. Silakan periksa kembali.");
        }
        throw new Error('Gagal mengambil data cuaca dari server.');
      }
      const data = await response.json();
      
      setWeatherData({
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      });
      setError(null); // Clear error on successful fetch
    } catch (err: any) {
      if (err.name === 'TypeError') {
        setError("Jaringan tidak stabil. Periksa koneksi internet Anda.");
      } else {
        setError(err.message || "Terjadi kesalahan.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather(); // Panggil sekali saat komponen pertama kali mount

    // 4. Menambahkan auto-refresh setiap 1 jam
    const interval = setInterval(fetchWeather, 3600000); 

    // Jangan lupa clear interval saat komponen di-unmount
    return () => clearInterval(interval);
  }, [fetchWeather]);

  return { weatherData, loading, error };
}