import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pfjlbfgmcsyuldlxcvfz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmamxiZmdtY3N5dWxkbHhjdmZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3NDk0ODEsImV4cCI6MjA5ODMyNTQ4MX0.GZhbnO-DKAaPTjUzwsDrFRt8rdPLMPv16B2DkMRIHHI";

export const supabase = createClient(supabaseUrl, supabaseKey);
