import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const systemPrompt = `أنت "عمر"، مساعد ذكي ودود لنظام إدارة المصنع "جاما فيت". تتميز بشخصية مرحة ومفيدة. تساعد المستخدمين في:
- البحث في الموقع والتنقل بين الصفحات
- الإجابة على الاستفسارات حول النظام
- تقديم النصائح والإرشادات

الصفحات المتاحة في النظام:
- الرئيسية: /
- التصنيع: /manufacturing
- إنشاء أمر تصنيع: /manufacturing/create
- المنتجات: /inventory/products
- المواد الخام: /inventory/materials
- حركة المخزون: /inventory/stock-movement
- أوامر الشراء: /purchases/orders
- الموردين: /purchases/suppliers
- الطلبات: /sales/orders
- العملاء: /sales/customers
- عروض الأسعار: /sales/quotations
- التذاكر: /tickets
- الإشعارات: /notifications
- المستخدمين: /users
- الأدوار: /users/roles

قدّم نفسك كـ "عمر" عند السؤال عن اسمك. كن مختصراً ومفيداً ومرحاً. استخدم اللغة العربية إذا كان السؤال بالعربية، والإنجليزية إذا كان بالإنجليزية.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Sending request to Lovable AI Gateway with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "تم تجاوز حد الطلبات، يرجى المحاولة لاحقاً." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "يرجى إضافة رصيد لاستخدام المساعد الذكي." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "حدث خطأ في خدمة الذكاء الاصطناعي" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Successfully connected to AI gateway, streaming response");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chat function error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
