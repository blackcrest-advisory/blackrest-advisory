import { loginUser } from "@/api-client/auth/login";
import { loginInput } from "@/lib/validations/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

//===== login hook =====//
export const useLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const login = async (data: loginInput) => {
    setLoading(true);
    try {
      const response = await loginUser(data);
      if (response.data.success) {
        const role = response.data.user.role;
        const dashboard =
          role === "CLIENT" ? "/client/dashboard" : "/admin/dashboard";
        router.push(dashboard);
        toast.success("Wellcome Back to Dashboard");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "Login failed");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
