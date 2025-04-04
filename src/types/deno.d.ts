
// This file is only for development TypeScript type checking
// It won't be used in production as edge functions run in Deno environment

declare namespace Deno {
  export interface Env {
    get(key: string): string | undefined;
  }
  
  export const env: Env;
}

declare module "https://deno.land/std@0.177.0/http/server.ts" {
  export function serve(handler: (req: Request) => Promise<Response>): void;
}

declare module "https://esm.sh/stripe@12.5.0" {
  import Stripe from 'stripe';
  export default Stripe;
}

declare module "https://esm.sh/@supabase/supabase-js@2.24.0" {
  export * from '@supabase/supabase-js';
}
