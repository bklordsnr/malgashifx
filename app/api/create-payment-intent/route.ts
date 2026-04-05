export const dynamic = "force-dynamic";

import Stripe from "stripe";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { CartPlanType } from "@/types";
import { getCurrentUser } from "@/actions/GetUser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

const calculateOrder = (items: CartPlanType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * 1;
    return acc + itemTotal;
  }, 0);
  const price = Math.floor(totalPrice);

  return price;
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { items, payment_intent_id } = body;
  const total = calculateOrder(items) * 100;

  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: "usd",
    status: "pending",
    ProfitStatus: "pending",
    paymentIntentId: payment_intent_id,
    products: items,
  };

  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );

    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        {
          amount: total,
        }
      );

      //update order
      const [existingOrder, updatedOrder] = await Promise.all([
        //existinforder
        prisma.order.findFirst({
          where: { paymentIntentId: payment_intent_id },
        }),

        //updatedorder
        prisma.order.update({
          where: { paymentIntentId: payment_intent_id },
          data: {
            amount: total,
            products: items,
          },
        }),
      ]);

      if (!existingOrder) {
        return NextResponse.error();
      }

      return NextResponse.json({ paymentIntent: updated_intent });
    }
  } else {
    //create intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    //create order
    orderData.paymentIntentId = paymentIntent.id;

    await prisma.order.create({
      data: orderData,
    });

    return NextResponse.json({ paymentIntent });
  }

  return NextResponse.error();
}
