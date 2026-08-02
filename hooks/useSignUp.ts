import { registerUser } from "@/api-client/auth/register";
import { signupInput } from "@/lib/validations/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const register = async (data: signupInput) => {
    setLoading(true);

    try {
      const responseData = await registerUser(data);

      if (responseData) {
        toast.success("Registration completed");
        router.push("/login");
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Unable to register user.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    loading,
  };
};
