export function detectFeatures() {
  if (typeof window === 'undefined') return {} as Record<string, boolean>;
  return {
    webgl: !!window.WebGLRenderingContext,
    canvas: !!window.HTMLCanvasElement,
    audioContext: !!(window.AudioContext || (window as any).webkitAudioContext),
    mediaDevices: !!navigator.mediaDevices,
    geolocation: !!navigator.geolocation,
    localFontAccess: 'queryLocalFonts' in window,
    sensorsApi: 'AbsoluteOrientationSensor' in window || 'Accelerometer' in window,
    webRTC: !!window.RTCPeerConnection,
    permissionsApi: !!navigator.permissions
  };
}
