import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { dan_amount, txn_hash } = body;

    // Validate required fields
    if (!dan_amount || !txn_hash) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing required fields: dan_amount and txn_hash are required",
        },
        { status: 400 }
      );
    }

    // Validate data types
    if (typeof dan_amount !== "number" || dan_amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "dan_amount must be a positive number",
        },
        { status: 400 }
      );
    }

    if (typeof txn_hash !== "string" || !txn_hash.startsWith("0x")) {
      return NextResponse.json(
        {
          success: false,
          error: "txn_hash must be a valid transaction hash",
        },
        { status: 400 }
      );
    }

    // Log the deposit data (you can replace this with your database logic)
    console.log("Deposit received:", {
      dan_amount,
      txn_hash,
      timestamp: new Date().toISOString(),
    });

    // Here you would typically:
    // 1. Save to database
    // 2. Update user balance
    // 3. Send confirmation email
    // 4. Update analytics
    // etc.

    // For now, we'll just return a success response
    return NextResponse.json({
      success: true,
      message: `Deposit of ${dan_amount} DAN recorded successfully`,
      data: {
        dan_amount,
        txn_hash,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Deposit API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
