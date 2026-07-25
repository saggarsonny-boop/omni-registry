export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const tier = url.searchParams.get("tier") || "biological";
  
  // Geolocation routing using Cloudflare headers
  const country = request.headers.get("CF-IPCountry") || "US";

  let currency = "USD";
  let symbol = "$";
  let priceId = "";
  let amount = 99;

  // Determine local currency mapping
  if (["DE", "FR", "IT", "NL", "ES", "FI", "BE", "AT", "IE"].includes(country)) {
    currency = "EUR";
    symbol = "€";
    priceId = tier === "api" ? "price_api_eur" : "price_biological_eur";
    amount = tier === "api" ? 179 : 89;
  } else if (country === "GB") {
    currency = "GBP";
    symbol = "£";
    priceId = tier === "api" ? "price_api_gbp" : "price_biological_gbp";
    amount = tier === "api" ? 159 : 79;
  } else if (country === "IN") {
    currency = "INR";
    symbol = "₹";
    priceId = tier === "api" ? "price_api_inr" : "price_biological_inr";
    amount = tier === "api" ? 999 : 499; // Calibrated low-friction tiers
  } else {
    currency = "USD";
    symbol = "$";
    priceId = tier === "api" ? "price_api_usd" : "price_biological_usd";
    amount = tier === "api" ? 199 : 99;
  }

  // Redirect to Stripe checkout flow with currency code parameters
  const stripeRedirectUrl = `https://checkout.stripe.com/pay/${priceId}?currency=${currency}&amount=${amount}&country=${country}`;

  return new Response(null, {
    status: 302,
    headers: {
      "Location": stripeRedirectUrl,
      "X-Selected-Currency": currency,
      "X-Selected-PriceId": priceId,
      "X-IP-Country": country,
      "Cache-Control": "no-store"
    }
  });
}
