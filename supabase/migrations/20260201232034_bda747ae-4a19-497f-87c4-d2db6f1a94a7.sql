-- Create notifications table
CREATE TABLE public.notifications (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    type TEXT NOT NULL DEFAULT 'info',
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    severity TEXT DEFAULT 'normal',
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    read_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Enable Row Level Security
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own notifications" 
ON public.notifications 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" 
ON public.notifications 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all notifications" 
ON public.notifications 
FOR SELECT 
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can insert notifications" 
ON public.notifications 
FOR INSERT 
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can delete notifications" 
ON public.notifications 
FOR DELETE 
USING (is_admin(auth.uid()));

-- Create index for faster queries
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX idx_notifications_created_at ON public.notifications(created_at DESC);