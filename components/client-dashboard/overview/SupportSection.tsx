"use client";

import { motion } from "framer-motion";
import { FiCalendar, FiMessageCircle, FiMail, FiPhone } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { fadeInUp, hoverScale } from "@/lib/utils/animations";

export const SupportSection = () => {
  return (
    //===== Support Section Card =====//
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      {...hoverScale}
    >
      <Card
        padding="base"
        className="flex flex-col gap-4 rounded-xl md:flex-row md:items-center md:justify-between"
      >
        <div className="flex items-center gap-4">
          <Avatar
            name="Sarah Mitchell"
            size="md"
            className="h-12 w-12 text-lg"
          />
          <div>
            <p className="font-medium text-foreground">
              Your Account Manager: Sarah Mitchell
            </p>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <FiMail className="h-3.5 w-3.5" />
                sarah@blackcrestadvisory.com
              </span>
              <span className="hidden sm:inline">·</span>
              <span className="flex items-center gap-1">
                <FiPhone className="h-3.5 w-3.5" />
                +44 20 1234 5678
              </span>
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="primary" size="sm">
            <FiCalendar className="mr-1" /> Schedule Call
          </Button>
          <Button variant="outline" size="sm">
            <FiMessageCircle className="mr-1" /> Send Message
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};
