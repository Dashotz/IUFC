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
}
