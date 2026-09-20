import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const currency = searchParams.get("currency")?.toUpperCase();

    if (!currency) {
      return NextResponse.json(
        { error: "Currency is required" },
        { status: 400 }
      );
    }

    if (currency === "USD") {
      return NextResponse.json({
        currency: "USD",
        rate: 1,
      });
    }

    const response = await fetch(
      `https://open.er-api.com/v6/latest/USD`,
      {
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates");
    }

    const data = await response.json();
    const rate = data?.rates?.[currency];

    if (!rate) {
      return NextResponse.json(
        { error: "Currency not supported" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      currency,
      rate,
    });
  } catch (error) {
    console.error("Exchange rate error:", error);

    return NextResponse.json(
      { error: "Failed to fetch exchange rate" },
      { status: 500 }
    );
  }
}