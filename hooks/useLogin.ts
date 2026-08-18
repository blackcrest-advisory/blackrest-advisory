import { loginWithCredentials } from "@/lib/actions/auth/login.action";
import { loginInput } from "@/lib/validations/auth";
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
      const response = await loginWithCredentials(data);
      if (response.success) {
        const role = response.user.role;
        const dashboard =
          role === "CLIENT" ? "/client/dashboard" : "/admin/dashboard";
        router.push(dashboard);
        toast.success("Wellcome Back to Dashboard");
      } else {
        toast.error(response.error);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
