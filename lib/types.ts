// Data type definitions for portfolio content

export interface ProfileData {
  anchor: {
    name: string
    role: string
    specializations: string[]
    metadata: {
      location: string
      timezone: string
      status: 'AVAILABLE' | 'UNAVAILABLE' | 'SELECTIVE'
    }
  }
  domains: Array<{
    index: number
    title: string
    description: string
    subPoints: string[]
  }>
  principles: Array<{
    statement: string
  }>
  capabilities: {
    motion: string[]
    development: string[]
    design: string[]
  }
}

export interface ProjectData {
  projects: Array<{
    id: string
    index: number
    status: 'LIVE' | 'DEPLOYED' | 'ARCHIVED'
    title: string
    role: string
    visual: {
      type: 'image' | 'video'
      src: string
      alt: string
      aspectRatio: '16:9' | '4:3' | '1:1'
    }
    techStack: string[]
    responsibilities: string[]
    brief: string
    link: {
      label: string
      href: string
      external: boolean
    }
    metadata?: {
      year: number
      client?: string
      duration?: string
    }
  }>
}

export interface ContactData {
  headline: string
  instruction: string
  protocols: {
    directMessage: {
      enabled: boolean
      label: string
      email: string
      endpoint?: string
      successMessage: string
      errorMessage: string
    }
    socialChannels: {
      enabled: boolean
      label: string
      channels: Array<{
        platform: string
        username: string
        url: string
      }>
    }
    scheduleCall: {
      enabled: boolean
      label: string
      description: string
      calendarUrl: string
      buttonLabel: string
    }
  }
  footer?: {
    text: string
    links?: Array<{
      label: string
      href: string
    }>
  }
}

// Focus state for project cards
export type ProjectFocusState = 'queued' | 'focused' | 'completed'
