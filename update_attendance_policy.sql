-- Allow public to view attendance records
DROP POLICY IF EXISTS "Admins can view all attendance" ON public.attendance_records;

CREATE POLICY "Public can view all attendance" ON public.attendance_records
    FOR SELECT TO anon, authenticated USING (true);
