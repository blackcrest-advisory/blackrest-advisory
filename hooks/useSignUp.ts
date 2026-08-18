import { registerWithCredentials } from "@/lib/actions/auth/register.action";
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
      const responseData = await registerWithCredentials(data);

      if (responseData.success) {
        toast.success("Registration completed");
        router.push("/login");
      } else {
        toast.error(responseData.error);
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
