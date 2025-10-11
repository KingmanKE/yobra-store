import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OrderData {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Verify user is authenticated
    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser();

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    const orderData: OrderData = await req.json();

    // Get admin WhatsApp number from settings
    const { data: settingsData, error: settingsError } = await supabaseClient
      .from('settings')
      .select('value')
      .eq('key', 'admin_whatsapp')
      .single();

    if (settingsError || !settingsData) {
      throw new Error('Admin WhatsApp number not configured');
    }

    const adminWhatsApp = settingsData.value;

    // Format invoice message
    const itemsList = orderData.items
      .map((item) => `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
      .join('\n');

    const message = `
🛍️ *NEW ORDER RECEIVED*

📋 Order #: ${orderData.orderNumber}

👤 *Customer Information:*
Name: ${orderData.customerName}
Email: ${orderData.customerEmail}
Phone: ${orderData.customerPhone}

📍 *Delivery Address:*
${orderData.deliveryAddress}

🛒 *Order Items:*
${itemsList}

💰 *Total Amount:* $${orderData.totalAmount.toFixed(2)}

_This order was placed through your online store._
    `.trim();

    // Create WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = adminWhatsApp.replace(/[^\d]/g, '');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    console.log('Invoice sent successfully', {
      orderNumber: orderData.orderNumber,
      customerEmail: orderData.customerEmail
    });

    return new Response(
      JSON.stringify({
        success: true,
        whatsappUrl,
        message: 'Invoice prepared successfully'
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Error in send-invoice function:', error);
    return new Response(
      JSON.stringify({
        error: error.message || 'Internal server error'
      }),
      {
        status: error.message === 'Unauthorized' ? 401 : 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});