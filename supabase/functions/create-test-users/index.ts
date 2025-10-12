import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TestUser {
  email: string;
  password: string;
  fullName: string;
  role?: 'admin' | 'user';
}

const testUsers: TestUser[] = [
  {
    email: 'admin@test.com',
    password: 'Admin123!',
    fullName: 'Admin User',
    role: 'admin'
  },
  {
    email: 'john@test.com',
    password: 'User123!',
    fullName: 'John Doe',
    role: 'user'
  },
  {
    email: 'jane@test.com',
    password: 'User123!',
    fullName: 'Jane Smith',
    role: 'user'
  },
  {
    email: 'mike@test.com',
    password: 'User123!',
    fullName: 'Mike Johnson',
    role: 'user'
  }
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    const createdUsers = [];

    for (const testUser of testUsers) {
      // Check if user already exists
      const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers();
      const userExists = existingUser?.users.some(u => u.email === testUser.email);

      if (userExists) {
        console.log(`User ${testUser.email} already exists, skipping...`);
        createdUsers.push({
          email: testUser.email,
          status: 'already_exists',
          message: 'User already exists in the system'
        });
        continue;
      }

      // Create user
      const { data: user, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: testUser.email,
        password: testUser.password,
        email_confirm: true,
        user_metadata: {
          full_name: testUser.fullName
        }
      });

      if (createError) {
        console.error(`Error creating user ${testUser.email}:`, createError);
        createdUsers.push({
          email: testUser.email,
          status: 'error',
          error: createError.message
        });
        continue;
      }

      // Assign role if specified
      if (testUser.role && user?.user) {
        const { error: roleError } = await supabaseAdmin
          .from('user_roles')
          .insert({
            user_id: user.user.id,
            role: testUser.role
          });

        if (roleError) {
          console.error(`Error assigning role to ${testUser.email}:`, roleError);
        }
      }

      createdUsers.push({
        email: testUser.email,
        password: testUser.password,
        fullName: testUser.fullName,
        role: testUser.role || 'user',
        status: 'created',
        id: user?.user?.id
      });

      console.log(`Created user: ${testUser.email}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Test users processing completed',
        users: createdUsers
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Error in create-test-users function:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});