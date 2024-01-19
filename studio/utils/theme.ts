import {buildLegacyTheme} from 'sanity'

export const tailwindSlate = {
  50: '#f8fafc',
  100: '#f1f5f9',
  200: '#e2e8f0',
  300: '#cbd5e1',
  400: '#94a3b8',
  500: '#64748b',
  600: '#475569',
  700: '#334155',
  800: '#1e293b',
  900: '#0f172a',
  950: '#020617',
}

export const tailwindCyan = {
  50: '#ecfeff',
  100: '#cffafe',
  200: '#a5f3fc',
  300: '#67e8f9',
  400: '#22d3ee',
  500: '#06b6d4',
  600: '#0891b2',
  700: '#0e7490',
  800: '#155e75',
  900: '#164e63',
  950: '#083344',
}

export const theme = buildLegacyTheme({
  '--black': tailwindCyan[950],
  '--white': '#fff',
  '--brand-primary': tailwindCyan[500],
  '--focus-color': tailwindCyan[500],
  '--component-text-color': tailwindCyan[900],
  // buttons
  '--default-button-color': tailwindCyan[600],
})
