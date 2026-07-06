"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/buttons/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-lg"
      >
        {/* Big 404 */}
        <h1 className="text-8xl font-extrabold tracking-tight text-primary sm:text-9xl">
          404
        </h1>

        {/* Message */}
        <h2 className="mt-4 text-2xl font-semibold text-body sm:text-3xl">
          Page not found
        </h2>
        <p className="mt-2 text-base text-body/70 sm:text-lg">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It
          might have been moved or deleted.
        </p>

        {/* Action button */}
        <div className="mt-8">
          <Link href="/home">
            <Button variant="primary" size="lg">
              Go back home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
