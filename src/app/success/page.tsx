import {redirect} from "next/navigation";

import {stripe} from "@/utils/Stripe/stripe";
import Link from "next/link";

export default async function Success({searchParams}) {
        const { session_id } = await searchParams

    if (!session_id) {
        throw new Error('Please provide a valid session_id (`cs_test_...`)');
    }

    // console.log(searchParams)
    const {
      status,
      customer_details: {email: customerEmail}
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    if (status === 'open') {
        return redirect("/cart");
    }

    if (status === 'complete') {

        return (
            <section id="success" className="flex items-center justify-center flex-col">
                <h1 className="text-2xl text-cyan-700 p-3 bg-cyan-100 my-2">Your order has been placed!</h1>

                <img src="/success.svg" alt="success logo" className="w-1/4 h-1/4" />
                <Link href="/orders" className="underline mt-3">Go to your orders</Link>

                <p className="text-lg my-5">
                    We appreciate your business! A confirmation email will be sent to{' '}
                    {customerEmail}. If you have any questions, please email{' '}
                </p>
                <a href="mailto:orders@phoenixgamestore.com">orders@example.com.</a>
            </section>
        )
    }


}