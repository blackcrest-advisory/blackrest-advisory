import { IMAGE } from "@/constant/imagesConfig";
import Image from "next/image";

const Logo = () => {
  return (
    <div>
      <Image src={IMAGE.logo} alt="Logo" width={28} height={28} />
    </div>
  );
};

export default Logo;
