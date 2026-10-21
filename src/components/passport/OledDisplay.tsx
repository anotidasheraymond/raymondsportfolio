'use client'

import { useEffect, useState, useRef } from 'react'

type Mode = 'servo' | 'telemetry' | 'diag'

export default function OledDisplay() {
  const [mode, setMode] = useState<Mode>('servo')
  const [angle, setAngle] = useState(45)
  const [frame, setFrame] = useState(0)
  const animRef = useRef<number>(0)
  const startRef = useRef<number>(0)

  useEffect(() => {
    let forward = true
    let currentAngle = 45
    let lastTime = performance.now()

    const loop = (now: number) => {
      const dt = (now - lastTime) / 1000
      lastTime = now

      // Smooth servo sweep: 15° to 165° at ~45 deg/sec
      if (forward) {
        currentAngle += 48 * dt
        if (currentAngle >= 165) {
          currentAngle = 165
          forward = false
        }
      } else {
        currentAngle -= 48 * dt
        if (currentAngle <= 15) {
          currentAngle = 15
          forward = true
        }
      }

      setAngle(Math.round(currentAngle))
      setFrame((f) => f + 1)
      animRef.current = requestAnimationFrame(loop)
    }

    animRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  const toggleMode = () => {
    setMode((m) => (m === 'servo' ? 'telemetry' : m === 'telemetry' ? 'diag' : 'servo'))
  }

  // Calculate servo needle endpoint on arc
  const rad = ((180 - angle) * Math.PI) / 180
  const needleX = 42 + Math.cos(rad) * 22
  const needleY = 38 - Math.sin(rad) * 22

  // PWM pulse width: standard 1.0ms (0 deg) to 2.0ms (180 deg)
  const pwmMs = (1.0 + (angle / 180) * 1.0).toFixed(2)

  return (
    <div
      className="pp-oled-module"
      onClick={toggleMode}
      role="button"
      tabIndex={0}
      aria-label={`ESP32 SSD1306 OLED display: currently in ${mode} mode. Click to cycle modes.`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggleMode()
        }
      }}
      title="Click to cycle OLED screen mode (Servo / Telemetry / Diagnostics)"
    >
      {/* PCB Header with gold solder pins */}
      <div className="pp-oled-header">
        <div className="pp-oled-pins">
          <span className="pp-oled-pin"><i />GND</span>
          <span className="pp-oled-pin"><i />VCC</span>
          <span className="pp-oled-pin"><i />SCL</span>
          <span className="pp-oled-pin"><i />SDA</span>
        </div>
        <span className="pp-oled-pcb-label">SSD1306 · I²C 0x3C</span>
      </div>

      {/* Screen Glass */}
      <div className="pp-oled-glass">
        <div className="pp-oled-screen">
          {/* Top Yellow Bar (authentic SSD1306 dual-color layout: rows 0-15 yellow, 16-63 cyan) */}
          <div className="pp-oled-yellow-bar">
            <span className="pp-oled-title">ESP32 · {mode.toUpperCase()}</span>
            <span className="pp-oled-heartbeat">
              <span className={`pp-oled-dot${frame % 30 < 15 ? ' is-on' : ''}`} />
              {mode === 'servo' ? `${angle}°` : mode === 'telemetry' ? '3.3V' : '115200'}
            </span>
          </div>

          {/* Cyan Lower Matrix (rows 16-63) */}
          <div className="pp-oled-cyan-body">
            {mode === 'servo' && (
              <div className="pp-oled-servo-view">
                <svg className="pp-oled-gauge" viewBox="0 0 84 46">
                  {/* Outer arc */}
                  <path d="M 16 38 A 26 26 0 0 1 68 38" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 3" opacity="0.6" />
                  {/* Gauge base */}
                  <circle cx="42" cy="38" r="3" fill="currentColor" />
                  {/* Gauge needle */}
                  <line x1="42" y1="38" x2={needleX} y2={needleY} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  {/* Ticks */}
                  <text x="12" y="42" fontSize="6" fill="currentColor" fontFamily="monospace">0°</text>
                  <text x="37" y="10" fontSize="6" fill="currentColor" fontFamily="monospace">90°</text>
                  <text x="64" y="42" fontSize="6" fill="currentColor" fontFamily="monospace">180°</text>
                </svg>

                <div className="pp-oled-telemetry">
                  <div className="pp-oled-row"><span>POS</span><b>{String(angle).padStart(3, '0')}°</b></div>
                  <div className="pp-oled-row"><span>PWM</span><b>{pwmMs}ms</b></div>
                  <div className="pp-oled-row"><span>FREQ</span><b>50Hz</b></div>
                  <div className="pp-oled-row"><span>GPIO</span><b>18</b></div>
                </div>
              </div>
            )}

            {mode === 'telemetry' && (
              <div className="pp-oled-spec-view">
                <div className="pp-oled-spec-line">MCU: ESP32-WROOM-32 (240MHz)</div>
                <div className="pp-oled-spec-line">BUS: I²C 400kHz · ADDR 0x3C</div>
                <div className="pp-oled-spec-line">OLED: 128×64 MONO (SSD1306)</div>
                <div className="pp-oled-spec-line">PWM: 16-BIT TIMER · PIN 18</div>
                <div className="pp-oled-spec-line">FRAME: 60 FPS · DMA BUF OK</div>
              </div>
            )}

            {mode === 'diag' && (
              <div className="pp-oled-diag-view">
                <div className="pp-oled-diag-line">{'[0.00]'} ESP-IDF / Arduino init</div>
                <div className="pp-oled-diag-line">{'[0.04]'} Wire.begin(21, 22) OK</div>
                <div className="pp-oled-diag-line">{'[0.08]'} SSD1306 display alloc</div>
                <div className="pp-oled-diag-line">{'[0.15]'} Servo attach GPIO 18</div>
                <div className="pp-oled-diag-line is-active">{'[LIVE]'} I²C ACK · Servo {angle}°</div>
              </div>
            )}
          </div>

          {/* CRT scanline raster overlay */}
          <div className="pp-oled-scanlines" aria-hidden="true" />
        </div>
      </div>

      {/* Interactive prompt footer */}
      <div className="pp-oled-footer">
        <span>MODE: {mode.toUpperCase()}</span>
        <span className="pp-oled-hint">TAP TO SWITCH</span>
      </div>
    </div>
  )
}
