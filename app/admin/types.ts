export interface AdminEvent {
    id: number
    title: string
    event_type: 'tournament' | 'training'
    location: string
    start_date: string
    start_time: string
    image_url: string
    created_at: string
    coach: string // Added coach field
    attendance_token?: string
    token_expires_at?: string // Token expiration timestamp
    kit_color?: string // Added kit_color field
}
